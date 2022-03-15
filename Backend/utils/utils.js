const { DateTime } = require("luxon");

/**
 * Extra date from string.
 * @param {string} datetime datetime string
 * @param {boolean} isUTC true if datetime is UTC, otherwise local time
 * @returns YYYY-MM-DD
 */
function extraDate(datetime, isUTC = true) {
    const date = DateTime.fromISO(datetime);
    if (date.isValid) {
        if (isUTC) {
            return date.toFormat("yyyy-MM-dd");
        }
        return datetime.split("T")[0];
    }
    return null;
}

/**
 * Extra time from string. 
 * @param {string} datetime datetime string 
 * @param {boolean} isUTC true if datetime is UTC, otherwise local time
 * @returns HH:MM:SS
 */
function extraTime(datetime, isUTC = true) {
    const date = DateTime.fromISO(datetime);
    if (date.isValid) {
        if (isUTC) {
            return date.toFormat("HH:mm:ss");
        }
        return datetime.split("T")[1].split(".")[0];
    }
    return null;
}

module.exports = {
    extraDate,
    extraTime,
}