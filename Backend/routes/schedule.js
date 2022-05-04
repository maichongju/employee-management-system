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

router.param("store_id", async (req, res, next, id) => {
    try {
        const store_id = Number(id);
        if (isNaN(store_id)) {
            res.status(Code.HTTP_BAD_REQUEST);
            res.json(
                respond.createErrorRespond(
                    Code.ERROR_INVALID_ARGUMENT,
                    "Invalid store_id, ID must be a number"
                )
            );
            return;
        }
        const store = await prisma.store.findUnique({
            where: {
                store_id: Number(id),
            },
            include: {
                store_hour: {
                    select: exclude("store_hour", ["store_id", "city_id"]),
                },
                city: {
                    select: {
                        weather: true,
                    },
                },
                employee: {
                    include: {
                        employee_skill: true,
                    },
                },
                store_departments: {
                    include: {
                        departments: {
                            include: {
                                department_skill: true,
                            },
                        },
                    },
                },
            },
        });

        if (store !== null) {
            store.store_hour = store.store_hour.map((item) => ({
                ...item,
                open_time: utils.extraTime(item.open_time, false),
                close_time: utils.extraTime(item.close_time, false),
                public_open_time: utils.extraTime(item.public_open_time, false),
                public_close_time: utils.extraTime(item.public_close_time, false),
            }));
        }
        req.store = store;
        next();
    } catch (e) {
        next(e);
    }
});

router.get("/store/:store_id", async (req, res, next) => {
    try {
        if (req.store === null) {
            res.status(Code.HTTP_NOT_FOUND);
            res.json(
                respond.createErrorRespond(Code.ERROR_NOT_FOUND, "Store not found")
            );
            return;
        }

        if (!req.query.start) {
            res.status(Code.HTTP_BAD_REQUEST);
            res.json(
                respond.createErrorRespond(
                    Code.ERROR_MISSING_REQUIRE_ARGUMENT,
                    "Missing start date parameter"
                )
            );
            return;
        }

        if (!req.query.end) {
            res.status(Code.HTTP_BAD_REQUEST);
            res.json(
                respond.createErrorRespond(
                    Code.ERROR_MISSING_REQUIRE_ARGUMENT,
                    "Missing end date parameter"
                )
            );
            return;
        }

        // Make sure start data and end date is valid
        const start_date = DateTime.fromFormat(req.query.start, "yyyyMMdd", {
            zone: "utc",
        });
        const end_date = DateTime.fromFormat(req.query.end, "yyyyMMdd", {
            zone: "utc",
        });
        if (start_date.isValid === false) {
            res.status(Code.HTTP_BAD_REQUEST);
            res.json(
                respond.createErrorRespond(
                    Code.ERROR_INVALID_ARGUMENT,
                    "Invalid start date"
                )
            );
            return;
        }
        if (end_date.isValid === false) {
            res.status(Code.HTTP_BAD_REQUEST);
            res.json(
                respond.createErrorRespond(
                    Code.ERROR_INVALID_ARGUMENT,
                    "Invalid end date"
                )
            );
            return;
        }

        const result = await schedule.generateSchedule(
            req.store.store_id,
            req.store.store_departments,
            req.store.store_hour,
            req.store.employee,
            req.store.city.weather,
            start_date,
            end_date
        );

        const store_schedule = await prisma.schedule.findMany({
            where: {
                store_id: req.store.store_id,
                date: {
                    gte: start_date.toJSDate(),
                    lte: end_date.toJSDate(),
                },
            },
            orderBy: [
                {
                    date: "asc",
                },
                {
                    department_id: "asc",
                },
                {
                    employee_id: "asc",
                }
            ],
        });
        res.json(respond.createRespond(store_schedule));
    } catch (e) {
        next(e);
    }
});

router.get("/store/:store_id", (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(
        createErrorRespond(
            Code.ERROR_HTTP_METHOD_NOT_ALLOW,
            "http method not allowed",
            null,
            Code.HTTP_METHOD_NOT_ALLOWED
        )
    );
});

router.get("/employee/:id", async (req, res, next) => {
    try {
        if (req.id === null) {
            res.status(Code.HTTP_NOT_FOUND);
            res.json(
                respond.createErrorRespond(Code.ERROR_NOT_FOUND, "Employee not found")
            );
            return;
        }

        if (!req.query.start) {
            res.status(Code.HTTP_BAD_REQUEST);
            res.json(
                respond.createErrorRespond(
                    Code.ERROR_MISSING_REQUIRE_ARGUMENT,
                    "Missing start date parameter"
                )
            );
            return;
        }

        if (!req.query.end) {
            res.status(Code.HTTP_BAD_REQUEST);
            res.json(
                respond.createErrorRespond(
                    Code.ERROR_MISSING_REQUIRE_ARGUMENT,
                    "Missing end date parameter"
                )
            );
            return;
        }

        const start_date = DateTime.fromFormat(req.query.start, "yyyyMMdd", {
            zone: "utc",
        });
        const end_date = DateTime.fromFormat(req.query.end, "yyyyMMdd", {
            zone: "utc",
        });
        if (start_date.isValid === false) {
            res.status(Code.HTTP_BAD_REQUEST);
            res.json(
                respond.createErrorRespond(
                    Code.ERROR_INVALID_ARGUMENT,
                    "Invalid start date"
                )
            );
            return;
        }
        if (end_date.isValid === false) {
            res.status(Code.HTTP_BAD_REQUEST);
            res.json(
                respond.createErrorRespond(
                    Code.ERROR_INVALID_ARGUMENT,
                    "Invalid end date"
                )
            );
            return;
        }

        const employee = await prisma.employee.findUnique({
            where: {
                employee_id: Number(req.params.id),
            },
            include: {
                schedule: {
                    where: {
                        date: {
                            gte: start_date.toJSDate(),
                            lte: end_date.toJSDate(),
                        },
                    },
                },
            },
            orderBy: [
                {
                    date: "asc",
                },
                {
                    start_date: "asc",
                }
            ]
        });

        if (employee === null) {
            res.status(Code.HTTP_NOT_FOUND);
            res.json(
                respond.createErrorRespond(
                    Code.ERROR_INVALID_ARGUMENT,
                    "Employee not found"
                )
            );
            return;
        }
        res.json(respond.createRespond(employee));
    } catch (e) {
        next(e);
    }
});

router.all("/store/:store_id", async (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(
        createErrorRespond(
            Code.ERROR_HTTP_METHOD_NOT_ALLOW,
            "http method not allowed",
            null,
            Code.HTTP_METHOD_NOT_ALLOWED
        )
    );
});

router.all("/employee/:id", async (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(
        createErrorRespond(
            Code.ERROR_HTTP_METHOD_NOT_ALLOW,
            "http method not allowed",
            null,
            Code.HTTP_METHOD_NOT_ALLOWED
        )
    );
});

module.exports = router;
