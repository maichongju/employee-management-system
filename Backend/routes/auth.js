const respond = require("../utils/respond");
const express = require("express");
const Code = require("../utils/code");
const Session = require("supertokens-node/recipe/session");
const { getSession } = require("supertokens-node/recipe/session");
const { signIn, signUp } = require("supertokens-node/recipe/emailpassword");

var router = express.Router();
const { PrismaClient, Prisma } = require("@prisma/client");
const { prismaExclude } = require("prisma-exclude");

const prisma = new PrismaClient();

router.post('/signin', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, "Missing email or password"));
        return;
    }

    const result = await signIn(username, password);
    if (result.status !== "OK") {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_INVALID_CREDENTIAL, "Invalid email or password"));
        return;
    }
    const user = result.user;
    const userid = result.user.id;

    const employee = await prisma.employee.findFirst({
        where: {
            supertokens_user_id: userid
        },
        select: {
            employee_id: true,
            role_id: true,
            supertokens_user_id: true,
        }
    });
    const tokenData = {
        role: employee.role_id,
        employee_id: employee.employee_id,
    };
    await Session.createNewSession(res, userid, tokenData);
    user["employee_id"] = employee.employee_id;
    user["role"] = employee.role_id;
    res.json(respond.createRespond(user));

});

router.all('/signin', async (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(respond.createErrorRespond(Code.ERROR_HTTP_METHOD_NOT_ALLOW, "Method not allowed"));
});

router.post('/signup', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const employee_id = req.body.employeeID;
    if (!username || !password || !employee_id) {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, "Missing email or password or employee_id"));
        return;
    }
    let employeeValid = true;
    let employee;
    try {
        // Make sure employee exists
        employee = await prisma.employee.findFirst({
            where: {
                employee_id: Number(employee_id)
            },
            select: {
                employee_id: true,
                role_id: true,
                supertokens_user_id: true,
            }
        });
        if (!employee) {
            employeeValid = false;
        }
    } catch (e) {
        employeeValid = false;
    }
    if (employeeValid === false) {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, "Invalid employee id"));
        return;
    }

    // Check if supertokens existed for this employee
    if (employee.supertokens_user_id !== null) {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, "Employee already has a SuperTokens account"));
        return;
    }

    // Create a account to SuperTokens
    const result = await signUp(username, password);
    if (result.status !== "OK") {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_USER_EXISTED, "User already existed"));
        return;
    }
    const user = result.user;
    let updateSuccesses = true;
    // Associate the SuperTokens account with the employee
    try {
        let result = await prisma.employee.update({
            where: {
                employee_id: employee.employee_id
            },
            data: {
                supertokens_user_id: user.id
            }
        });
    } catch (e) {
        updateSuccesses = false;
        console.log(e);
    }
    if (updateSuccesses === false) {
        res.status(Code.HTTP_INTERNAL_SERVER_ERROR);
        res.json(respond.createErrorRespond(Code.ERROR_INTERNAL_ERROR, "Something Went Wrong"));
        return;
    }


    const tokenData = {
        role: employee.role_id,
        employee_id: employee.employee_id,
    };
    await Session.createNewSession(res, user.id, tokenData);
    user["employee_id"] = employee.employee_id;
    user["role"] = employee.role_id;
    res.json(respond.createRespond(user));
});

router.all('/signup', async (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(respond.createErrorRespond(Code.ERROR_HTTP_METHOD_NOT_ALLOW, "Method not allowed"));
});

router.get('/signout', async (req, res, next) => {
    let hasError = false;
    let session = await getSession(req, res)
        .catch(err => {
            console.log(err);
            hasError = true;
        });
    if (hasError) {
        clearFrontEndCookieLogin(res);
        // if there is no session. Don't need to do anything.
        res.status(Code.HTTP_UNAUTHORIZED);
        res.json(respond.createErrorRespond(Code.ERROR_INVALID_SESSION_TOKEN, "Invalid session token"));
        return;
    }
    await session.revokeSession()
        .catch(err => {

            console.log(err);
            hasError = true;
        });
    if (hasError) {
        clearFrontEndCookieLogin(res);
        // if there is no session. Don't need to do anything.
        res.status(Code.HTTP_UNAUTHORIZED);
        res.json(respond.createErrorRespond(Code.ERROR_INVALID_SESSION_TOKEN, "Invalid session token"));
        return;
    }
    clearFrontEndCookieLogin(res);
    res.json(respond.createRespond());
    res.end();
});

router.all('/signout', async (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(respond.createErrorRespond(Code.ERROR_HTTP_METHOD_NOT_ALLOW, "Method not allowed"));
});


const createSessionData = (employee) => {
    return {
        employee_id: employee.employee_id,
        role: employee.role_id,
    };
}


/**
 * This function will remove all session data from the client.
 * @param {*} res 
 */
const clearFrontEndCookieLogin = async (res) => {
    res.clearCookie("sAccessToken");
    res.clearCookie("sRefreshToken");
    res.clearCookie("sIdRefreshToken");
}
module.exports = router;