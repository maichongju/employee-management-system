const { DateTime } = require("luxon");
const Session = require("supertokens-node/recipe/session");

/**
 * Extra date from string.
 * @param {string} datetime ISO datetime string or Date object
 * @param {boolean} isUTC true if datetime is UTC, otherwise will take the time as it is
 * @returns YYYY-MM-DD
 */
const extraDate = (datetime, isUTC = true) => {
    var date;
    if (datetime instanceof Date) {
        date = DateTime.fromJSDate(datetime);
    } else {
        date = DateTime.fromISO(datetime);
    }
    if (date.isValid) {

        if (isUTC) {
            return date.toFormat("yyyy-MM-dd");
        }
        return date.toUTC().toFormat("yyyy-MM-dd");

    }
    return null;
}

/**
 * Extra time from string. 
 * @param {string} datetime datetime string 
 * @returns HH:MM:SS
 */
const extraTime = (datetime, isUTC = true) => {

    var date;
    if (datetime instanceof Date) {
        date = DateTime.fromJSDate(datetime);
    } else {
        date = DateTime.fromISO(datetime);
    }
    if (date.isValid) {

        if (isUTC) {
            return date.toFormat("HH:mm:ss");
        }
        return date.toUTC().toFormat("HH:mm:ss");

    }
    return null;

}

/**
 * Check if authentication is disable.
 * @returns true if authentication is required, otherwise false
 */
const isSkipAuth = () => {
    if (process.env.NODE_ENV === "development" &&
        process.env.DISABLE_SESSION_VERIFICATION === "true") {
        return true;
    }
    return false;
}


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
        sessionInfo.userID = session.userID;
        sessionInfo.sessionHandle = session.sessionHandle;
        sessionInfo.sessionData = session.sessionData;
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
    if (!utils.isSkipAuth()) {
        sessionInfo = await utils.verifySession(req, res);
        if (!sessionInfo.isValid) {
            respond.createErrorInvalidSession(req, res, next);
            return sessionInfo;
        }
    } else {
        sessionInfo = {};
    }
    return sessionInfo;
}

module.exports = {
    extraDate,
    extraTime,
    verifySession,
    isSkipAuth,
    getSessionInfo
}