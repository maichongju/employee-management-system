var respond = require("../utils/respond");
var express = require("express");
const utils = require("../utils/utils");
const Code = require("../utils/code");
var router = express.Router();
const schedule = require("../utils/schedule");
const { DateTime } = require("luxon");

const { PrismaClient, Prisma } = require("@prisma/client");
const { prismaExclude } = require("prisma-exclude");
const prisma = new PrismaClient();
const exclude = prismaExclude(prisma);

const STATUS_DENIED = 3;
const STATUS_APPROVE = 2;
const STATUS_PENDING = 1;

router.param("store_id", async (req, res, next, id) => {
    try {
        const store_id = Number(id);
        if (isNaN(store_id)) {
            res.status(Code.HTTP_BAD_REQUEST);
            res.json(
                respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, "Invalid store_id, ID must be a number")
            );
            return;
        }
        const store = await prisma.store.findUnique({
            where: {
                store_id: Number(id),
            },
            include: {
                store_hour: {
                    select: exclude("store_hour", ["store_id", "city_id"])
                },
                city: {
                    select: {
                        weather: true
                    }
                },
                employee: true,
                store_departments: true
            }

        });

        if (store !== null) {
            store.store_hour = store.store_hour.map(item => ({
                ...item,
                open_time: utils.extraTime(item.open_time, false),
                close_time: utils.extraTime(item.close_time, false),
                public_open_time: utils.extraTime(item.public_open_time, false),
                public_close_time: utils.extraTime(item.public_close_time, false),
            }
            ));
        }
        req.store = store;
        next();
    } catch (e) {
        next(e);
    }

});

router.get("/store/:store_id", async (req, res, next) => {
    if (req.store === null) {
        res.status(Code.HTTP_NOT_FOUND);
        res.json(respond.createErrorRespond(Code.ERROR_NOT_FOUND, "Store not found"));
        return;
    }

    if (!req.query.start) {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_MISSING_REQUIRE_ARGUMENT, "Missing start date parameter"));
        return;
    }

    if (!req.query.end) {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_MISSING_REQUIRE_ARGUMENT, "Missing end date parameter"));
        return;
    }

    // Make sure start data and end date is valid
    const start_date = DateTime.fromFormat(req.query.start, "yyyyMMdd", { zone: "utc" });
    const end_date = DateTime.fromFormat(req.query.end, "yyyyMMdd", { zone: "utc" });
    if (start_date.isValid === false) {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, "Invalid start date"));
        return;
    }
    if (end_date.isValid === false) {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, "Invalid end date"));
        return;
    }

    const off_request = await getEmployeeOffRequest(
        req.store.employee,
        start_date.toJSDate(),
        end_date.toJSDate());

    const result = schedule.generateSchedule(
        req.store.store_departments,
        req.store.store_hour,
        req.store.employee,
        req.store.city.weather,
        off_request,
        start_date);

    res.json(respond.createRespond(result));

});

router.get("/store/:store_id", (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(
        createErrorRespond(Code.ERROR_HTTP_METHOD_NOT_ALLOW, "http method not allowed", null, Code.HTTP_METHOD_NOT_ALLOWED)
    );
});

/**
 * Database helper function to get all the employee off request
 * @param {*} employees list of employee id
 * @returns 
 */
const getEmployeeOffRequest = async (employees, start_date, end_date) => {
    const employee_off_request = await prisma.time_off_request.findMany({
        where: {
            employee_id: {
                in: employees.map(item => item.employee_id)
            },
            off_date: {
                gte: start_date,
                lte:end_date
            },
            status_id: STATUS_APPROVE

        }
    });

    return employee_off_request;
}

module.exports = router;