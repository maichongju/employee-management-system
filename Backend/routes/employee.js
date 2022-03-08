
var express = require('express');
var router = express.Router();

const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient()

async function getAllEmployee(){
    const employee = await prisma.employee.findMany();
    console.log(employee);
    return employee;
}

/* GET Employee page. */
router.get('/', async (req, res, next) => {
    const employee = await getAllEmployee();
    res.json(employee);
});

module.exports = router;
