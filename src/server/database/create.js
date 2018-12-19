/**
 * Initializes the database with models that
 * are described in the models folder
 */
module.exports = function () {
    const models = require("./models");
    const pool = require("./getPool")();
    return Promise.all(models.map(({ tableName, columns }) => {
        if (!columns) {
            console.error("Models must have tableName defined");
            return Promise.resolve();
        }
        return pool.query(
            `CREATE TABLE IF NOT EXISTS ${tableName} (
                        ${Object
                .keys(columns)
                .map(field => `${field} ${columns[field]}`)
                .join(",\n")}
                    );`);
    }))
        .then(() => pool.end())
        .then(() => console.log("db init successful"))
        .catch(() => console.error("db init failed"));
}