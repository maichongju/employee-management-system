const { DateTime } = require("luxon");
const Session = require("supertokens-node/recipe/session");
const respond = require("./respond");

/**
 * Extra date from string.
 * @param {string} datetime ISO datetime string or Date object
 * @param {boolean} isUTC true if datetime is UTC, otherwise will take the time as it is
 * @returns {string | null} Date format as YYYY-MM-DD, null if invalid
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
 * @returns {string | null} return time in string as HH:MM:SS, null if invalid
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
 * Check if authentication is disable. Only for development purpose.
 * @returns {boolean} true if authentication is required, otherwise false
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

// TODO update function setTime to return a new Date object
/**
 * 
 * @param {Date} date date object to be modify
 * @param {int} hour hour to be set
 * @param {int} min minute to be set
 * @param {int} sec second to be set
 * @returns {Date} a new Date object contain the new time
 */
const setTime = (date, hour, min = 0, sec = 0) => {
    const newDate = new Date(date);
    newDate.setUTCHours(hour);
    newDate.setUTCMinutes(min);
    newDate.setUTCSeconds(sec);
    return newDate;
}

/**
 * Set the given date value to the beginning of the day. (00:00:00)
 * @param {Date} date 
 * @returns {Date} a new Date object contain the new time
 */
const setDateBeginningOfDay = (date) => {
    return setTime(date, 0, 0, 0);
}

/**
 * Set the given data object to the end of the day. (23:59:59)
 * @param {Date} date 
 * @returns {Date} a new Date object contain the new time
 */
const setDateEndOfDay = (date) => {
    return setTime(date, 23, 59, 59);
}

/**
 * Deep Copy of a JSON object.
 * @param {JSON} obj 
 * @returns deep copy of the object
 */
const deepCopyJSON = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

module.exports = {
    extraDate,
    extraTime,
    verifySession,
    isSkipAuth,
    getSessionInfo,
    setTime,
    setDateBeginningOfDay,
    setDateEndOfDay,
    deepCopyJSON
}