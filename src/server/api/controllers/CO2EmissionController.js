const escapeQueryString = require("../../util/escapeQueryString");
const escapeXML = require("../../util/escapeXML");
const getClient = require("../../database/getClient");
const groupBy = require("../../util/groupBy");

/**
 * Group the data by country. This can save a lot of bandwidth in large queries
 * @param {*} data An array of emission entries
 */
function groupEmissionData(data) {
    const grouped = groupBy(data, x => x.country.trim());
    const arr = Object.keys(grouped)
        .map(countryName => {
            const countryData = grouped[countryName]
                .map(({ country, ...relevantData }) => relevantData)
                // Turn population into Number type since it is stored as BIGINT in the database
                // and therefore will be interpreted as string in JavaScript (don't worry it will not overflow)
                // NOTE: Number(null) === 0 and we don't want to return a number if the actual value is null
                .map(({ population, ...rest }) => Object.assign({}, rest, { population: Number(population) || population }));
            return {
                name: countryName,
                data: countryData
            };
        });
    return {
        countries: arr
    };
}

function listEmissions(req, res) {
    const clientPromise = getClient();
    return clientPromise
        .then(client => {
            return client.query(`SELECT * FROM emissions;`);
        })
        .then(x => res.json(groupEmissionData(x.rows)))
        .then(() => clientPromise)
        .then(x => x.end());
}

function listEmissionsByCountry(req, res) {
    // First escape the string to XML format and then to a query friendly format
    const country = escapeQueryString(escapeXML(req.params.country.toLowerCase()));
    const clientPromise = getClient();
    return clientPromise
        .then(client =>
            client.query(`SELECT * FROM emissions WHERE country like '%${country}%';`))
        .then(x => res.json(groupEmissionData(x.rows)).send())
        .catch(() => res.status(500).send())
        .then(() => clientPromise)
        .then(x => x.end());
}

module.exports = { listEmissions, listEmissionsByCountry };