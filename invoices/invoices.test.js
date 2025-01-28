const invoices = require("./invoices")

describe("add invoice", () => {
    const name = "John Doe"
    const date = new Date();
    const amount = 31.5;

    beforeAll(() => {
        invoices.add(name, amount, date)
    })
    afterAll(() => {
        invoices.empty()
    })
    test("should add an invoice to the list", () => {
        expect(invoices.get().length).toEqual(1);
    })
    test("should have the proper name", () => {
        expect(invoices.get()[0]["name"]).toEqual(name);
    })
    test("should have the proper date", () => {
        expect(invoices.get()[0]["date"]).toEqual(date);
    })
    test("should have the proper amount", () => {
        expect(invoices.get()[0]["amount"]).toEqual(amount);
    })
    test("should have id 0", () => {
        expect(invoices.get()[0]["id"]).toEqual(0);
    })
})

describe("get invoices", () => {
    afterEach(() => {
        invoices.empty()
    })

    test("should return a list of invoices if no id is provided", () => {
        expect(Array.isArray(invoices.get())).toBeTruthy()
    })

    test("should throw a type error if called with a non numerical id", () => {
        expect(() => invoices.get("test")).toThrow(TypeError)
    })

    test("should throw a range error if called with a negative id", () => {
        expect(() => invoices.get(-1)).toThrow(RangeError)
    })

    test("should return null if the id does not exist", () => {
        expect(invoices.get(1)).toStrictEqual(null)
    })

    test("should return the correct invoice if the id exists", () => {
        invoices.add("John Doe", 31.5, new Date())
        expect(invoices.get(0)["id"]).toEqual(0)
    })
})

describe("update invoice", () => {
    const name = "John Doe"
    const date = new Date();
    const amount = 31.5;

    beforeEach(() => {
        invoices.add(name, amount, date)
    })
    afterEach(() =>
        invoices.empty()
    )


    test("should throw a type error if called with a non numerical id", () => {
        expect(() => invoices.put("test", {})).toThrow(TypeError)
    })

    test("should throw a range error if called with a negative id", () => {
        expect(() => invoices.put(-1, {})).toThrow(RangeError)
    })

    test("should throw a range error if called with an id that does not exist", () => {
        expect(() => invoices.put(5, {})).toThrow(RangeError)
    })

    test("should throw an error if called with data != object or null", () => {
        expect(() => invoices.put(0, null)).toThrow(/update should be a/)
    })

    test("should update an invoice if provided all keys", () => {
        const newName = "Jane Doe"
        const newAmount = 44.1
        const newDate = new Date('1995-12-17T03:24:00')
        const id = 0
        const updateData = {
            name: newName, 
            amount: newAmount, 
            date: newDate
        }
        expect(invoices.put(id, updateData)).toEqual({id, ...updateData})
    })

    test("should update an invoice if provided some keys", () => {
        const newName = "Jane Doe"
        const updateData = {
            name: newName, 
        }
        expect(invoices.put(0, updateData)["name"]).toEqual(newName)
    })

    test("should throw an error if given an invalid key", () => {
        const updateData = {
            name: "Test", 
            expiration: new Date(),
        }
        expect(() => invoices.put(0, updateData)).toThrow(/expiration/)
    })
})

describe("rm invoice", () => {
    const name = "John Doe"
    const date = new Date();
    const amount = 31.5;

    beforeEach(() => {
        invoices.add(name, amount, date)
    })
    afterEach(() =>
        invoices.empty()
    )

    test("should delete an invoice and return its id if provided correct id", () => {
        const id = 0
        expect(invoices.rm(id)).toEqual(id)
        expect(invoices.get().length).toEqual(0)
    })

    test("should raise a type error if id has invalid type", () => {
        expect(() => invoices.rm("test")).toThrow(TypeError)
    })

    test("should raise a range error if id is negative or is non existent", () => {
        expect(() => invoices.rm(-1)).toThrow(RangeError)
        expect(() => invoices.rm(12)).toThrow(RangeError)
    })
})

describe("empty invoices", () => {
    const name = "John Doe"
    const date = new Date();
    const amount = 31.5;

    beforeEach(() => {
        invoices.add(name, amount, date)
    })

    afterEach(() =>
        invoices.empty()
    )

    test("should delete all invoices and reset sequential id to 0", () => {
        expect(invoices.get().length).toEqual(1);
        expect(invoices.getSequentialId()).toEqual(1)
        invoices.empty()
        expect(invoices.get().length).toEqual(0);
        expect(invoices.getSequentialId()).toEqual(0)
    })
})

describe("get sequential id", () => {
    afterEach(() =>
        invoices.empty()
    )

    test("should start at 0", () => {
        expect(invoices.getSequentialId()).toEqual(0)
    })

    test("should incremente when I add an invoice", () => {
        expect(invoices.getSequentialId()).toEqual(0)
        const name = "John Doe"
        const date = new Date();
        const amount = 31.5;
        invoices.add(name, amount, date)
        expect(invoices.getSequentialId()).toEqual(1)
    })

    test("should not decrement when I delete an invoice", () => {
        const name = "John Doe"
        const date = new Date();
        const amount = 31.5;
        invoices.add(name, amount, date)
        invoices.rm(0)
        expect(invoices.getSequentialId()).toEqual(1)
    })
})