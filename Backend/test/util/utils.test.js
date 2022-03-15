const utils = require("../../utils/utils");


extraDateCase = [
    ["2022-03-14T00:47:56.591Z",false, "2022-03-14"],
    ["2022-03-14T02:47:56.591Z",true, "2022-03-13"],
    ["invalid date",true, null],
    ["invalid date",false, null],
];

extraTimeCase = [
    ["2022-03-14T04:47:56.591Z", true,"00:47:56"],
    ["2022-03-14T04:47:56.591Z", false,"04:47:56"],
    ["invalid date", true,null],
    ["invalid date", false,null],

]

describe("extra date (Tested with UTF-4) Could fail if different timezone", () => {
    it.each(extraDateCase)("%s,%s -> %s", (datetime, isUTC, expected) => {
        expect(utils.extraDate(datetime,isUTC)).toBe(expected);
    });
})

describe("extra time (Tested with UTF-4) Could fail if different timezone", () => {
    it.each(extraTimeCase)("%s -> %s", (datetime,isUTC, expected) => {
        expect(utils.extraTime(datetime,isUTC)).toBe(expected);
    });
})