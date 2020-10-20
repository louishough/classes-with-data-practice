const { TestScheduler } = require("jest")
const {Restaurant, db} = require("./index")

beforeAll(done => {
    db.exec(`
    CREATE TABLE restaurants(id INTEGER PRIMARY KEY, name TEXT);
    CREATE TABLE menus(id INTEGER PRIMARY KEY, title TEXT, restaurant_id INTEGER;
    CREATE TABLE items(id INTEGER PRIMARY KEY, name TEXT, price FLOAT);
    `, done)
})

describe("Restaurant", () => {
    test("new restaurant is added to db", (await) => {
        const restaurant = new Restaurant({ name: "name", image: "url" })
        expect(restaurant.id).toBe(1)
    })
})