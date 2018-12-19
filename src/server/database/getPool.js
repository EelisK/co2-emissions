const { Pool } = require("pg");

module.exports = function () {
    const dbUrl = process.env.DATABASE_URL;
    return new Pool({
        connectionString: dbUrl
    });
}