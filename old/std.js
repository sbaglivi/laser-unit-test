function calculateStandardDeviation(numbers) {
    if (numbers.length === 0) {
        throw new Error("Array must be not empty")
    }

    const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
    const variance = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / numbers.length;
    return Math.sqrt(variance)
}

module.exports = calculateStandardDeviation;