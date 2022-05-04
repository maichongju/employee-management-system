const { extraDate, setDateBeginningOfDay, deepCopyJSON } = require("./utils");

const {
    FULL_TIME_MAX_HOUR,
    PART_TIME_MAX_HOUR,
    OFF_REQUEST_STATUS_APPROVE,
    OFF_REQUEST_STATUS_DENIED,
    OFF_REQUEST_STATUS_PENDING,
} = require("./setting");
const { PrismaClient, Prisma } = require("@prisma/client");
const { prismaExclude } = require("prisma-exclude");
const { DateTime } = require("luxon");
const { response } = require("express");
const { setTime } = require("./utils")
const prisma = new PrismaClient();
const exclude = prismaExclude(prisma);

/**
 * 
 * @param {*} store_department 
 * @param {*} store_hour 
 * @param {*} employees 
 * @param {*} weather 
 * @param {*} off_request 
 * @param {DateTime} start_date 
 * @param {DateTime} end_date 
 * @returns 
 */
const generateSchedule = async (store_id, store_department, store_hour, employees, weather, start_date, end_date) => {
    var result = {
        store_id: store_id,
        start_date: start_date.toJSDate(),
        end_date: end_date.toJSDate(),
    }

    evaluate_employee_by_department(employees, store_department);

    var available_employees = [];
    for (var i = 0; i < 7; i++) {
        available_employees.push({
            date: extraDate(start_date.plus({ days: i }), false),
            employees: await getAvailableEmployees(employees, start_date.plus({ days: i }))
        });
    }

    // Track the number of hours for employee
    const employee_hours = {};

    employees.forEach(employee => {
        employee_hours[employee.employee_id] = 0;
    });

    var schedule = [];

    store_department.forEach(department => {
        let department_ = {
            department_id: department.department_id,
            schedule: []
        }
        for (var i = 0; i < 7; i++) {
            department_.schedule.push(generateDepartmentScheduleSlot(start_date.plus({ days: i }), department.max_employee, department.min_employee, 2));
        }
        schedule.push(department_);

    });

    // Schedule the employee
    // Pick the best and poor
    let day_count = 0;
    let employee_temp = null;
    schedule.forEach(department => {
        day_count = 0;
        department.schedule.forEach(day => {
            let availability = available_employees[day_count].employees;
            availability = availability.filter(employee => employee_hours[employee.employee_id] < FULL_TIME_MAX_HOUR);
            day.shifts.forEach(shift => {
                // sort the employee by skill
                availability.sort((a, b) => employeeSkillCompare(a, b, department.department_id));
                // Get the best employee
                if (availability.length !== 0) {

                    // Situation for two employee
                    employee_temp = availability[0];
                    shift.employees.push(employee_temp.employee_id);
                    // Remove the employee from the available list. One shift each day for each employee
                    availability = availability.filter(item => item.employee_id !== employee_temp.employee_id);
                    // Update the employee hours
                    employee_hours[employee_temp.employee_id] += 8;
                    employee_temp = getBadEmployee(availability, department.department_id);
                    shift.employees.push(employee_temp.employee_id);
                    availability = availability.filter(item => item.employee_id !== employee_temp.employee_id);
                    employee_hours[employee_temp.employee_id] += 8;
                }
            });
            day_count++;
        })
    })


    await updateScheduleDataBase(store_id, schedule);

    result.schedule = schedule;

    return result
}

/**
 * Try to get the low rate employee
 * @param {[]} employees 
 */
const getBadEmployee = (employees, department_id) => {
    let bad_employee = null;
    if (employees.length === 0) {
        return null;
    }
    bad_employee = employees[0];
    employees.forEach(employee => {
        if (employee.department_skills[department_id] === undefined) {
            return bad_employee;
        } else {
            bad_employee = employee;
        }
    }
    );
    return bad_employee;
}

const updateScheduleDataBase = async (store_id, schedule) => {
    schedule.forEach(department => {
        department.schedule.forEach(async (day) => {
            day.shifts.forEach(async (shift) => {
                let start_time = shift.shift === 0 ? setTime(day.date, 7) : setTime(day.date, 15);
                let end_time = shift.shift === 0 ? setTime(day.date, 15) : setTime(day.date, 23);
                let luxon_start = DateTime.fromJSDate(start_time);
                let luxon_end = DateTime.fromJSDate(end_time);
                let luxon_total_time = luxon_end.diff(luxon_start, ["hours", "minutes", "seconds"]).toObject();
                let total_time = new Date(Date.UTC(0, 0, 0, luxon_total_time.hours, luxon_total_time.minutes, luxon_total_time.seconds));
                shift.employees.forEach(async (employee_id) => {
                    await prisma.schedule.upsert({
                        where: {
                            employee_id_department_id_store_id_date: {
                                employee_id: employee_id,
                                department_id: department.department_id,
                                store_id: store_id,
                                date: day.date
                            }

                        },
                        create: {
                            employee_id: employee_id,
                            department_id: department.department_id,
                            store_id: store_id,
                            date: day.date,
                            start_time: start_time,
                            end_time: end_time,
                            total_time: total_time
                        },
                        update: {
                            start_time: start_time,
                            end_time: end_time,
                            total_time: total_time
                        }
                    })
                });
            });
        });
    });
}

/**
 * 
 * @param {{
 *  department_skills : {
 *      department_id: score,
 *   }
 * }} a 
 * @param {{
*  department_skills : {
    *      department_id: score,
    *   }
    * }} b 
 * @param {number} department_id 
 * @returns {number} 0 equals, 1 a > b, -1 a < b
 */
const employeeSkillCompare = (a, b, department_id) => {
    const a_score = a.department_skills[department_id];
    const b_score = b.department_skills[department_id];

    if (a_score === b_score) {
        return 0;
    }
    else if (a_score === undefined) {
        return 1;
    }
    else if (b_score === undefined) {
        return -1;
    } else {
        return a_score > b_score ? -1 : 1;
    }
}


/**
 * Return the availability of the employee in the given date
 * @param {*} employees 
 * @param {DateTime} date 
 */
const getAvailableEmployees = async (employees, date) => {
    const d = date.toJSDate();
    setDateBeginningOfDay(d);
    const off_request = await prisma.time_off_request.findMany({
        where: {
            employee_id: {
                in: employees.map(item => item.employee_id)
            },
            off_date: d,
            status_id: OFF_REQUEST_STATUS_APPROVE
        }
    });

    const off_request_employee = off_request.map(item => item.employee_id);


    const available = []
    employees.forEach(item => {
        if (!off_request_employee.includes(item.employee_id)) {
            available.push(deepCopyJSON(item));
        }
    });
    return available;
}


/**
 * Add an additional field to employee object named "department_skills" contain 
 * the evaluation point of the employee in the given department. Added format:
 * "department_skills": {
 *    "department_id": score,
 * }
 * @param {*} employees 
 * @param {*} departments 
 */
const evaluate_employee_by_department = (employees, departments) => {
    employees.forEach(employee => {
        const skills = {};
        const employee_raw_skill = employee.employee_skill;
        departments.forEach(department => {
            let department_id = department.department_id;
            let total = 0, count = 0;
            department.departments.department_skill.forEach(skill => {
                const eskill = employee_raw_skill.find(item => item.skill_id === skill.skill_id);
                if (eskill) {
                    total += eskill.raw_value;
                    count++;
                }
            });
            if (count > 0) {
                skills[department_id] = total / count;
            }
        });

        employee.department_skills = skills;
    });
}

/**
 * Generate a empty schedule slot for the given department
 * @param {DateTime} date 
 * @param {*} max_employee 
 * @param {*} total_shift 
 * @returns 
 */
const generateDepartmentScheduleSlot = (date, max_employee, min_employee, total_shift) => {
    var schedule = {
        date: date.toJSDate(),
        shifts: []
    }
    for (var i = 0; i < total_shift; i++) {
        schedule.shifts.push({
            shift: i,
            // max: max_employee,
            // min: min_employee,
            // score: {
            //     total: 0,
            //     score: 0
            // }, // Score of the shift
            employees: []
        });
    }
    return schedule;

}

module.exports = { generateSchedule };