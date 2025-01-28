function median(nums) {
    if (!Array.isArray(nums)) {
        throw TypeError("expected nums to be an array")
    }

    if (!nums.length) {
        throw RangeError("expected nums to have length > 0")
    }

    nums.sort()
    i = Math.floor(nums.length / 2)
    if (nums.length % 2) {
        return (nums[i - 1] + nums[i]) / 2;
    }
    return nums[i]
}

module.exports = mean