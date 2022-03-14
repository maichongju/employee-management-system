const { DateTime } = require("luxon");

/**
 * Extra date from string.
 * @param {string} ISO datetime 
 * @returns YYYY-MM-DD
 */
function extraDate(datetime) {
    const date = DateTime.fromISO(datetime);
    if (date.isValid) {
        return date.toFormat("yyyy-MM-dd");
    }
    return null;
}

/**
 * Extra time from string. 
 * @param {string} ISO datetime 
 * @returns HH:MM:SS
 */
function extraTime(datetime) {
    const date = DateTime.fromISO(datetime);
    if (date.isValid) {
        return date.toFormat("HH:mm:ss");
    }
    return null;
}

module.exports = {
    extraDate,
    extraTime,
}