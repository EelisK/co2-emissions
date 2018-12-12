module.exports = function () {
    const pg = require("pg");
    const dbUrl = process.env.DATABASE_URL;
    const connection = new pg.Client({ connectionString: dbUrl });
    return connection.connect().then(() => connection);
}