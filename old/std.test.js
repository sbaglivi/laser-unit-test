const std = require("./std");

test('empty array throws error', () => {
    expect(() => std([])).toThrow("Array must be not empty")
})

test("array with only 1 value has variance 0", () => {
    expect(std([1])).toBe(0)
})

test("array with all equal values to have variance 0", () => {
    expect(std([10, 10, 10, 10])).toBe(0)
})

test("[1,2] to have variance 0.5", () => {
    expect(std([1,2])).toBeCloseTo(0.5)
})
