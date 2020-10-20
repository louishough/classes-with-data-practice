const {Database} = require('sqlite3')
const location = process.env.NODE_ENV === 'test' ? ':memory:' : './db.sqlite'
const db = new Database(location)

class Restaurant {
    static findAll = () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM restaurants;", async function (err, rows) {
                if (err) return reject (err)
                const restaurants = await Promise.all(rows.map(row => new Restaurant(row)))
                resolve(restaurants)
            })
        })
    }

    constructor(data) {
        const restaurant = this
        restaurant.id = data.id
        restaurant.name = data.name
        restaurant.image = data.image

        if(data.id) {
            return Promise.resolve(restaurant)
        } else {
            return new Promise((resolve, reject) => {
                db.run("INSERT INTO restaurants(name, image) VALUES (?,?);",
                [restaurant.name, restaurant.image], function(err) {
                    restaurant.id = this.lastID
                    resolve(restaurant)
                })
            })
        }
    }
}

module.exports = { Restaurant, db}