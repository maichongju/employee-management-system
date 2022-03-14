var respond = require("../utils/respond");
var express = require("express");
var Code = require("../utils/code");
var router = express.Router();

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
                respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, "Invalid store_id, ID must be a number")
            );
            return;
        }
        const store = await prisma.store.findUnique({
            where: {
                store_id: Number(id),
            },
        });
        req.store = store;
        next();
    } catch (e) {
        next(e);
    }

});

router.get("/:store_id", (req, res, next) => {
    res.status(Code.HTTP_OK);
    res.json(respond.createRespond(req.store));
});

/** Get all the employee from the given store */
router.get("/:store_id/employee", async (req, res, next) => {
    try {
        const employees = await prisma.employee.findMany({
            where: {
                store_id: req.store.store_id,
            },
            select: {
                employee_id: true,
                last_name: true,
                first_name: true,
                manager: {
                    select: {
                        employee_id: true,
                        last_name: true,
                        first_name: true,
                    }
                },
                department: true
            },

        });
        res.status(Code.HTTP_OK);
        res.json(respond.createRespond(employees));
    } catch (e) {
        next(e);
    }

});

router.all("/", (req, res, next) => {
    respond.createErrorNotAllowRequestMethod(req, res, next);
});


module.exports = router;