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
    Object.keys(grouped)
        .forEach(countryName => {
            grouped[countryName] =
                grouped[countryName].map(({ country, ...relevantData }) => relevantData);
        });
    return grouped;
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