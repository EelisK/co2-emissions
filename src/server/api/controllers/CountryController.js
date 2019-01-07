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
        .query(`
            SELECT DISTINCT country 
            FROM emissions 
            WHERE country LIKE $1 AND emissions IS NOT NULL AND year IS NOT NULL
            ORDER BY country;`, [`%${name}%`])
        .then(x => res.json(processRows(x.rows)))
        .catch(x => res.status(500))
        .then(() => res.send())
        .then(() => pool.end());
}


module.exports = { getCountriesWithName, getCountries };