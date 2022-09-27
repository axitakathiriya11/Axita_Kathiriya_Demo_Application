const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Axita@2511", 
    host: "localhost",
    port: "5432",
    database: "me_demo_app"
})

module.exports = pool;