const {Pool} = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "1234",//Cambiar
    host: "localhost",
    port: 5432,
    database: "user_info"
})

module.exports = pool;