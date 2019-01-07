const trimQuery = require("../../util/trimQuery");
const getPool = require("../../database/getPool");

function processRows(rows) {
    return {
        // Remove extra whitespaces from the end
        data: rows.map(x => x.country.trim())
    }
}

function getCountries(req, res) {
    req.params.name = "";
    return getCountriesWithName(req, res);
}

function getCountriesWithName(req, res) {
    const name = trimQuery(req.params.name);
    const pool = getPool();
    return pool
        /**
         * Query the database and sort the rows as follows:
         * 1) Position based on wether or not the string STARTS with the given name
         * 2) Country name
         */
        .query(`
            SELECT DISTINCT country,
                CASE
                    WHEN country LIKE $2 THEN 1
                    ELSE 2
                END AS position
            FROM emissions 
            WHERE country LIKE $1 AND emissions IS NOT NULL AND year IS NOT NULL
            ORDER BY position ASC, country ASC;`, [`%${name}%`, `${name}%`])
        .then(x => res.json(processRows(x.rows)))
        .catch(x => res.status(500))
        .then(() => res.send())
        .then(() => pool.end());
}


module.exports = { getCountriesWithName, getCountries };