module.exports = function () {
    const pg = require("pg");
    const dbUrl = process.env.DATABASE_URL;
    return new pg.Pool({ connectionString: dbUrl });
}