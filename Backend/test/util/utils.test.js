const utils = require("../../utils/utils");


extraDateCase = [
    ["2022-03-14T00:47:56.591Z",true, "2022-03-13"],
    ["2022-03-14T00:47:56.591Z", false,"2022-03-14"],
    [new Date("2022-03-14T00:47:56.591Z"),true, "2022-03-13"],
    [new Date("2022-03-14T00:47:56.591Z"), false,"2022-03-14"],
    [new Date("Invalid date"),true, null],
    [new Date("Invalid date"),false, null],
    ["invalid date",false, null],
    ["invalid date",true, null],
];

extraTimeCase = [
    ["2022-03-14T00:47:56.591Z",true, "20:47:56"],
    ["2022-03-14T00:47:56.591Z", false,"00:47:56"],
    [new Date("2022-03-14T00:47:56.591Z"),true, "20:47:56"],
    [new Date("2022-03-14T00:47:56.591Z"), false,"00:47:56"],
    [new Date("Invalid date"),true, null],
    [new Date("Invalid date"),false, null],
    ["invalid date",false, null],
    ["invalid date",true, null],

]

describe("extra date (Tested with UTF-4) Could fail if different timezone", () => {
    it.each(extraDateCase)("%s, %s -> %s", (datetime,isUTC, expected) => {
        
        expect(utils.extraDate(datetime,isUTC)).toBe(expected);
    });
})

describe("extra time (Tested with UTF-4) Could fail if different timezone", () => {
    it.each(extraTimeCase)("%s, %s -> %s", (datetime,isUTC, expected) => {
        expect(utils.extraTime(datetime,isUTC)).toBe(expected);
    });
})

setTimeCase = [
    [0,0,0],
    [23,59,59],
    [0,59,59],
    [0,0,59],
    [23,59,0],
    [23,0,0]
]

describe("Test setTime()", () => {
    it.each(setTimeCase)("%s, %s, %s", (hour,minute,second) => {
        let date = new Date();
        let date2 = utils.setTime(date,hour,minute,second);
        expect(date2.getUTCHours()).toBe(hour);
        expect(date2.getUTCMinutes()).toBe(minute);
        expect(date2.getUTCSeconds()).toBe(second);
        expect(date === date2).toBe(false);
    });
})