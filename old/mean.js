function mean(nums) {
    if (!Array.isArray(nums)) {
        throw TypeError("expected nums to be an array")
    }

    if (!nums.length) {
        throw RangeError("expected nums to have length > 0")
    }

    let total = 0;
    for (let n of nums) {
        if (typeof n != "number") {
            throw TypeError("expected nums to only contain numbers")
        }
        total += n;
    }

    return total / nums.length;
}

module.exports = mean