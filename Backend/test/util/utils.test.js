const utils = require("../../utils/utils");


extraDataCase = [
    ["2022-03-14T04:47:56.591Z", "2022-03-14"],
    ["invalid date", null],
];

extraTimeCase = [
    ["2022-03-14T04:47:56.591Z", "00:47:56"],
    ["invalid date", null],
]

describe("extra date (Tested with UTF-4) Could fail if different timezone", () => {
    it.each(extraDataCase)("%s -> %s", (datetime, expected) => {
        expect(utils.extraDate(datetime)).toBe(expected);
    });
})

describe("extra time (Tested with UTF-4) Could fail if different timezone", () => {
    it.each(extraTimeCase)("%s -> %s", (datetime, expected) => {
        expect(utils.extraTime(datetime)).toBe(expected);
    });
})