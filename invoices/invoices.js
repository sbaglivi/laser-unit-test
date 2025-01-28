let data = {}
let seqId = 0;
const updateKeys = new Set(["name", "amount", "date"])

function add(name, amount, date) {
    data[seqId] = {
        id: seqId,
        name,
        amount,
        date
    }
    seqId++;
}

function get(id = null) {
    if (id !== null && typeof id !== "number") {
        throw TypeError("id should be an integer value or null")
    }
    if (id < 0) {
        throw RangeError("id should be a non-negative number")
    }
    if (id === null)
        return Object.values(data);
    if (id in data) {
        return data[id]
    }
    return null
}

function put(id, update) {
    if (typeof id !== "number") {
        throw TypeError("id should be an integer value")
    }
    if (id < 0) {
        throw RangeError("id should be a non-negative number")
    }
    if (!(typeof update === 'object' && !Array.isArray(update) && update !== null)) {
        throw TypeError("update should be a not null, not empty object")
    }
    if (!(id in data)) {
        throw RangeError("no invoice with provided id")
    }
    const invoiceCopy = structuredClone(data[id])
    for (const k in update) {
        if (!updateKeys.has(k)) {
            throw Error(`received invalid update key: ${k}`)
        }
        invoiceCopy[k] = update[k]
    } 
    data[id] = invoiceCopy;
    return invoiceCopy;
}

function rm(id) {
    if (typeof id !== "number") {
        throw TypeError("id should be an integer value")
    }
    if (id < 0) {
        throw RangeError("id should be a non-negative number")
    }
    if (!(id in data)) {
        throw RangeError("no invoice with provided id")
    }
    delete data[id]
    return id
}

function empty() {
    data = {};
    seqId = 0;
}

function getSequentialId() {
    return seqId;
}

module.exports = {
    add,
    get,
    put,
    rm,
    empty,
    getSequentialId
}