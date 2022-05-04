/*
 * This page is for router '/eval'. It manage all the evaluation process for the employee
 * 
*/
var respond = require("../utils/respond");
var express = require("express");
const Code = require("../utils/code");
const utils = require("../utils/utils");
const supertokens = require("../utils/supertokens");

var router = express.Router();

const { PrismaClient, Prisma } = require("@prisma/client");
const { prismaExclude } = require("prisma-exclude");
const { HTTP_BAD_REQUEST } = require("../utils/code");
const prisma = new PrismaClient();
const exclude = prismaExclude(prisma);

const EVALUATIONLEVEL = 4;

router.param("store_id", async (req, res, next, id) => {
    try {
        const store = await prisma.store.findUnique({
            where: {
                store_id: Number(id)
            }
        })
        if (store === null) {
            res.status(HTTP_BAD_REQUEST);
            res.json(respond.createErrorRespond(Code.ERROR_TARGET_NOT_FOUND, "Store not found"));
            return;
        }
        req.store_id = Number(id);
        next();
    } catch (e) {
        next(e);
    }

});


router.param("employee_id", async (req, res, next, id) => {
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                employee_id: Number(id)
            },
            select: {
                store: true
            }
        });
        if (employee === null) {
            res.status(HTTP_BAD_REQUEST);
            res.json(respond.createErrorRespond(Code.ERROR_TARGET_NOT_FOUND, "Employee not found"));
            return;
        }
        req.employee_id = Number(id);
        req.store_id = employee.store.store_id;
        next();
    } catch (e) {
        next(e);
    }

});


router.get('/store/:store_id', async (req, res, next) => {
    try {
        let sessionInfo = await supertokens.getSessionInfo(req, res);
        if (sessionInfo === null) {
            // Invalid session
            return;
        }
        const evaluation = await evalByStore(req.store_id);
        res.json(respond.createRespond(evaluation));

    } catch (e) {
        next(e);
    }

});

router.get('/employee/:employee_id', async (req, res, next) => {
    const evaluation = await evalEmployee(req.employee_id);
    res.json(respond.createRespond(evaluation));
});
router.all('/employee/:employee_id', (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(respond.createErrorNotAllowRequestMethod(req, res, next));
});
router.all('/store/:store_id', (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(respond.createErrorNotAllowRequestMethod(req, res, next));
});

/**
 * Evaluate the performance of the employee in the store
 * @param {number} store_id 
 * @returns 
 */
const evalByStore = async (store_id) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const salesData = await processSales(store_id, new Date(2022, 2, 25), new Date(2022, 2, 27));
    const employeeID = await getEmployeeFromStore(store_id);
    const reportFormManager = await processEmployeeEvalFromManager(employeeID);
    const evaluation = getEmployeeEvaluation(salesData, reportFormManager, employeeID);
    await updateEmployeeSkillData(evaluation);
    return evaluation;
}

/**
 * Get an employee evaluation
 * @param {number} employee_id employee id
 * @param {number} store_id store that employee is working  
 * @returns 
 */
const evalEmployee = async (employee_id, store_id) => {
    const salesData = await processSales(store_id, new Date(2022, 2, 25), new Date(2022, 2, 27));
    const employeeID = [employee_id];
    const reportFormManager = await processEmployeeEvalFromManager(employeeID);
    const evaluation = getEmployeeEvaluation(salesData, reportFormManager, employeeID);
    await updateEmployeeSkillData(evaluation);
    return evaluation[0];
}

/**
 * Combine the performance data from salesData and reportFromManager for each employee.
 * Employee skill level will be calculated from the average of the performance of each employee
 * If the employee has no performance data from either one, the other one will be used
 * If none of the data available, skill for that employee will not be display
 * @param {{}} salesData 
 * @param {{}} reportFromManager 
 * @param {[number]} employeeID Employee ID from the store
 */
const getEmployeeEvaluation = (salesData, reportFromManager, employeeID) => {
    const evaluation = [];
    for (const id of employeeID) {
        let individualEvaluation = {
            employee_id: id,
            skills: []
        };
        let salesSkill = salesData[id];
        let managerSkill = reportFromManager[id];
        let tempSkill;
        if (salesSkill === undefined && managerSkill === undefined) {
            // No data available
            evaluation.push(individualEvaluation);
            continue;
        } else if (salesSkill === undefined) {
            tempSkill = managerSkill;
        } else if (managerSkill === undefined) {
            tempSkill = salesSkill;
        } else {
            tempSkill = JSON.parse(JSON.stringify(salesSkill));
            for (const skillID in managerSkill) {
                if (tempSkill[skillID] === undefined) {
                    tempSkill[skillID] = managerSkill[skillID];
                } else {
                    tempSkill[skillID] = (tempSkill[skillID] + managerSkill[skillID]) / 2;
                }
            }
        }
        for (const skillID in tempSkill) {
            individualEvaluation.skills.push({
                skill_id: Number(skillID),
                level: tempSkill[skillID]
            })
        }
        evaluation.push(individualEvaluation);
    }
    return evaluation;
}

/**
 * Process sales record and return the process result. This will process the sales
 * data and return the process result in array of json object
 * @param {prisma.sales_record} sales 
 */
const processSales = async (store_id, start_date, end_date = undefined) => {

    if (end_date === undefined) {
        end_date = new Date(start_date.getTime());
    }

    // Start date always will start at midnight
    start_date = utils.setTime(start_date, 0, 0, 0);
    // End date always will end at midnight
    end_date = utils.setTime(end_date, 23, 59, 59);

    const sales = await getSales(store_id, start_date, end_date);
    const departments = await getDepartments(store_id, start_date, end_date);
    const salesTarget = await getSalesTarget(store_id, departments);
    const departmentSkill = await getSalesDepartmentSkill(departments);
    const evaluation = {};
    for (const record of sales) {
        const useCount = salesTarget[record.department_id].quantity === 0 ? false : true;

        let finalPercentage;
        if (useCount) {
            finalPercentage = record.count / salesTarget[record.department_id].quantity;
        } else {
            finalPercentage = record.total / salesTarget[record.department_id].value;
        }

        if (finalPercentage > 1) {
            finalPercentage = 1;
        }
        // Calculate score for each skill
        if (evaluation[record.sales_id] === undefined) {
            evaluation[record.sales_id] = {};
        }

        let skill = departmentSkill[record.department_id].skills;
        for (const skillID of skill) {
            if (evaluation[record.sales_id][skillID] === undefined) {
                evaluation[record.sales_id][skillID] = {
                    score: 0,
                    count: 0
                };
            }
            evaluation[record.sales_id][skillID].score += finalPercentage * EVALUATIONLEVEL;
            evaluation[record.sales_id][skillID].count += 1;
        }
    }

    for (const employeeID in evaluation) {
        let eval = evaluation[employeeID];
        for (const skillID in eval) {
            eval[skillID] = eval[skillID].score / eval[skillID].count;
        }
    }

    return evaluation;
}

/**
 * 
 * @param {int} store_id Store id for the target sales
 * @param {Date} start_date starting date for the record to retrieve
 * @param {Date} end_date ending date for record to retrieve
 * @returns Array of json object that contain different
 */
const getSales = async (store_id, start_date, end_date) => {
    const data = await prisma.sales_record.groupBy({
        by: ['date', 'sales_id', 'department_id'],
        where: {
            store_id: store_id,
            date: {
                gte: start_date,
                lte: end_date
            }
        },
        _sum: {
            total: true
        },
        _count: {
            sales_id: true
        },
        orderBy: {
            date: 'asc'
        }
    })

    for (const record of data) {
        record.total = Number(record._sum.total);
        record.count = record._count.sales_id;
        record._sum = undefined;
        record._count = undefined;
    }
    return data;
}

/**
 * 
 * @param {number} store_id store id
 * @param {[number]} departments department id array
 * @returns {Promise< {
 *   department_id: {quantity: number, value: number}}>}
 */
const getSalesTarget = async (store_id, departments) => {
    const data = await prisma.sales_department_target.findMany({
        where: {
            store_id: store_id,
            department_id: {
                in: departments
            }
        }
    });
    const salesTarget = {};
    for (const target of data) {
        salesTarget[target.department_id] = {
            quantity: target.target_quantity,
            value: target.target_value
        };
    }
    return salesTarget;
}




/**
 * Calculate the employee evaluation average
 * @param {Array} id list of id need to be retrieved 
 */
const processEmployeeEvalFromManager = async (id) => {
    const employees = await prisma.employee.findMany({
        where: {
            employee_id: {
                in: id
            }
        },
        select: {
            employee_id: true,
            evaluation_from_manager: {
                select: {
                    skills: {
                        select: {
                            skill_id: true,
                            level: true
                        }
                    }
                }
            }
        }
    })
    const evals = {};

    for (const employee of employees) {
        if (evals[employee.employee_id] === undefined) {
            evals[employee.employee_id] = {};
        }
        for (const record of employee.evaluation_from_manager) {
            for (const skills of record.skills) {
                if (evals[employee.employee_id][skills.skill_id] === undefined) {
                    evals[employee.employee_id][skills.skill_id] = {
                        score: 0,
                        count: 0
                    };
                }
                evals[employee.employee_id][skills.skill_id].score += skills.level;
                evals[employee.employee_id][skills.skill_id].count += 1;
            }
        }
    }

    // Calculate average
    for (const employee in evals) {
        for (const skill in evals[employee]) {
            evals[employee][skill] = evals[employee][skill].score / evals[employee][skill].count;
        }
    }

    return evals;
}


/**
 * 
 * @param {store id} store_id 
 * @param {Date} start_date 
 * @param {Date} end_date 
 * @returns {Promise<number[]>} all the department id in the record
 */
const getDepartments = async (store_id, start_date, end_date) => {
    const data = await prisma.sales_record.groupBy({
        by: ['department_id'],
        where: {
            store_id: store_id,
            date: {
                gte: start_date,
                lte: end_date
            }
        }
    })
    let departments = [];
    for (const department of data) {
        departments.push(department.department_id);
    }
    return departments;
}

/**
 * Get the list of skill for the given department
 * @param {number[]} departments list of department id
 * @returns {Promise<{department_id : { skills: [skill_id: number]}}>} 
 */
const getSalesDepartmentSkill = async (departments) => {
    const data = await prisma.sales_department_skill.findMany({
        where: {
            department_id: {
                in: departments
            }
        }
    });
    let weights = {};
    for (const department of data) {
        if (weights[department.department_id] === undefined) {
            weights[department.department_id] = { skills: [] };
        }
        weights[department.department_id].skills.push(department.skill_id);

    }
    return weights;
}

/**
 * get employee list from a store
 * @param {int} store_id store id
 * @returns {Promise<number[]>}return list of employee id 
 */
const getEmployeeFromStore = async (store_id) => {
    const employees = await prisma.employee.findMany({
        where: {
            store_id: store_id
        },
        select: {
            employee_id: true,
        }
    })
    let employeeID = [];
    for (const employee of employees) {
        employeeID.push(employee.employee_id);
    }
    return employeeID;
}

/**
 * 
 * @param {{
 *  employee_id: number,
 *  skills: {
 *    skill_id: number,
 *    level: number
 * } & []                 
 * } & []} evaluation 
 */
const updateEmployeeSkillData = async (evaluation) => {
    for (const employee of evaluation) {
        let employee_id = employee.employee_id;
        for (const skill of employee.skills) {
            let skill_id = skill.skill_id;
            let level = Math.round(skill.level);
            await prisma.employee_skill.upsert({
                where: {
                    employee_id_skill_id: {
                        employee_id: employee_id,
                        skill_id: skill_id
                    }
                },
                create: {
                    employee_id: employee_id,
                    skill_id: skill_id,
                    level: level,
                    raw_value: skill.level
                },
                update: {
                    level: level,
                    raw_value: skill.level
                }
            })
        }
    }
}

// Mock the eval endpoint
const evalMock = async () => {

}

module.exports = router;