/**
 * Initializes the database with models that
 * are described in the models folder
 */
module.exports = function () {
    const models = require("./models");
    const clientPromise = require("./getClient")();
    return clientPromise
        .then(client =>
            Promise.all(models.map(({ tableName, columns }) => {
                if (!columns) {
                    console.error("Models must have tableName defined");
                    return Promise.resolve();
                }
                return client.query(
                    `CREATE TABLE IF NOT EXISTS ${tableName} (
                        ${Object
                        .keys(columns)
                        .map(field => `${field} ${columns[field]}`)
                        .join(",\n")}
                    );`);
            }))
        )
        .then(() => clientPromise)
        .then(x => x.end())
        .then(() => console.log("db init successful"))
        .catch(x => console.error("db init failed"));
}