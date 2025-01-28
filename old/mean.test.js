const mean = require("./mean")

test("mean with value that's not an array to throw type error", () => {
    expect(() => mean(5)).toThrow(TypeError)
})

test("mean with empty array to throw range error", () => {
    expect(() => mean([])).toThrow(RangeError)
})

test("mean of 1 value (3) to equal the value itself", () => {
    expect(mean([3])).toEqual(3);
})

test("mean of [1,3] to be 2", () => {
    expect(mean([1,3])).toEqual(2)
})

test("mean of negative numbers [-1,-3] to be -2", () => {
    expect(mean([-1,-3])).toEqual(-2)
})

test("mean of floating point numbers", () => {
    expect(mean([5.0, 0.0])).toEqual(2.5)
})

test("mean of mixed integer and floating numbers", () => {
    expect(mean([1.0, 7])).toEqual(4)
})

test("mean of arrays to throw", () => {
    expect(() => mean([[]])).toThrow(TypeError)
})

test("mean of strings to throw", () => {
    expect(() => mean(["a", "b"])).toThrow(TypeError)
})