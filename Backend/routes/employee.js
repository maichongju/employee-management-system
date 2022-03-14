var respond = require("../utils/respond");
var express = require("express");
var Code = require("../utils/code");
var router = express.Router();

const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/:id", async (req, res, next) => {
  try{
    const id = Number(req.params.id);
  console.log(id);
  if (isNaN(id)) {
    res.status(Code.HTTP_BAD_REQUEST);
    res.json(
      respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, "Invalid ID, ID must be a number")
    );
    return;
  }
  const employee = await prisma.employee.findUnique({
    where: {
      employee_id: id,
    },
    include: {
      department: true,
      store: true,
      job: true,
      manager: true,
    },
  });
  res.json(respond.createRespond(employee));
  }catch (e){
    next (e);
  }
  
});

/* Denied other request type */
router.all("/:id", (req, res, next) => {
  respond.createErrorNotAllowRequestMethod(req, res, next);
});

/* GET Employee page. */
router.get("/", async (req, res, next) => {
  try {
    var param = req.query;

    if (param.employee_id) {
      res.status(Code.HTTP_BAD_REQUEST);
      res.json(respond.createErrorRespond(Code.ERROR_ARGUMENT_NOT_SUPPORT, "employee_id parameter is not supported"));
      return;
    }

    if (param.hire_date) {
      res.status(Code.HTTP_BAD_REQUEST);
      res.json(respond.createErrorRespond(Code.ERROR_ARGUMENT_NOT_SUPPORT, "hire_date parameter is not supported"));
      return;
    }

    if (param.job_id) {
      param.job_id = Number(param.job_id);
    }

    if (param.store_id) {
      param.store_id = Number(param.store_id);
    }

    if (param.department_id) {
      param.department_id = Number(param.department_id);
    }

    if (param.manager_id) {
      if (param.manager_id === "null") {
        param.manager_id = null;
      } else {
        param.manager_id = Number(param.manager_id);
      }
    }
    const result = await prisma.employee.findMany({
      where: {
        ...param,
      },
      include: {
        department: true,
        store: true,
        job: true,
        manager: true,
      },
    });
    res.json(respond.createRespond(result));
  } catch (e) {
    if (e instanceof Prisma.PrismaClientValidationError) {
      res.status(Code.HTTP_BAD_REQUEST);
      res.json(respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, null, e));
    }else {
      next(e);
    }
  }
});

router.all("/", (req, res, next) => {
  respond.createErrorNotAllowRequestMethod(req, res, next);
});

module.exports = router;
