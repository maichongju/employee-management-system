const { DateTime } = require("luxon");

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
    }else {
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
    }else {
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

module.exports = {
    extraDate,
    extraTime,
}