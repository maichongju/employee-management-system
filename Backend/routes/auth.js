const respond = require("../utils/respond");
const express = require("express");
const Code = require("../utils/code");
const app = require("../app");
const Session = require("supertokens-node/recipe/session");
const { getSession } = require("supertokens-node/recipe/session");
const { signIn, signUp } = require("supertokens-node/recipe/emailpassword");

var router = express.Router();

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
    await Session.createNewSession(res, userid);

    res.json(respond.createRespond(user));

});

router.all('/signin', async (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(respond.createErrorRespond(Code.ERROR_HTTP_METHOD_NOT_ALLOW, "Method not allowed"));
});

router.post('/signup', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_INVALID_ARGUMENT, "Missing email or password"));
        return;
    }
    const result = await signUp(username, password);
    if (result.status !== "OK") {
        res.status(Code.HTTP_BAD_REQUEST);
        res.json(respond.createErrorRespond(Code.ERROR_USER_EXISTED, "User already existed"));
        return;
    }
    const user = result.user;
    await Session.createNewSession(res, user.userid);
    res.json(respond.createRespond(user));
});

router.all('/signup', async (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(respond.createErrorRespond(Code.ERROR_HTTP_METHOD_NOT_ALLOW, "Method not allowed"));
});

router.post('/signout', async (req, res, next) => {
    let hasError = false;
    let session = await getSession(req, res)
        .catch(err => {
            clearFrontEndCookieLogin(res);
            // if there is no session. Don't need to do anything.
            res.status(Code.HTTP_UNAUTHORIZED);
            res.json(respond.createErrorRespond(Code.ERROR_INVALID_SESSION_TOKEN, "Invalid session token"));
            hasError = true;
        });
    if (hasError) {
        return;
    }
    session.revokeSession()
        .catch(err => {
            clearFrontEndCookieLogin(res);
            // if error throw here, it means the session is already revoked or expired.
            res.status(Code.HTTP_UNAUTHORIZED);
            res.json(respond.createErrorRespond(Code.ERROR_INVALID_SESSION_TOKEN, "Invalid session token"));
            hasError = true;
        });
    if (hasError) {
        return;
    }
    clearFrontEndCookieLogin(res);
    res.json(respond.createRespond());
});

router.all('/signout', async (req, res, next) => {
    res.status(Code.HTTP_METHOD_NOT_ALLOWED);
    res.json(respond.createErrorRespond(Code.ERROR_HTTP_METHOD_NOT_ALLOW, "Method not allowed"));
});

/**
 * This function will remove all session data from the client.
 * @param {*} res 
 */
const clearFrontEndCookieLogin = (res) => {
    res.clearCookie("sAccessToken");
    res.clearCookie("sRefreshToken");
    res.clearCookie("sIdRefreshToken");
}
module.exports = router;