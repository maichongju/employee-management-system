const Session = require("supertokens-node/recipe/session");
const {isSkipAuth} = require("./utils");
const respond = require("./respond");

/**
 * Verify if the given session token valid. 
 * Can use Environment variable to disable session 
 * verification in development environment.
 * @param {*} req 
 * @param {*} res 
 * @returns Session Information
 */
const verifySession = async (req, res) => {

    let sessionInfo = {};
    let session = await Session.getSession(req, res, { sessionRequired: true })
        .catch(err => {
            sessionInfo.isValid = false;
        });
    if (session) {
        sessionInfo.isValid = true;
        sessionInfo.userID = session.getUserId();
        sessionInfo.sessionHandle = session.getHandle();
        sessionInfo.accessTokenPayload = session.getAccessTokenPayload();
        sessionInfo.sessionData = await session.getSessionData();
    }
    return sessionInfo;
}

/**
 * Get the session information from the request. If the 
 * session is not valid, it will return null and respond
 * with ERROR_INVALID_SESSION.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getSessionInfo = async (req, res) => {
    var sessionInfo = null;
    if (!isSkipAuth()) {
        sessionInfo = await verifySession(req, res);
        if (!sessionInfo.isValid) {
            respond.createErrorInvalidSession(req, res);
            return null;
        }
    } else {
        sessionInfo = {};
    }
    return sessionInfo;
}


module.exports = {
    verifySession,
    getSessionInfo
}