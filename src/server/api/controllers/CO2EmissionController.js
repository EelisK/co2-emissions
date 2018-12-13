const escapeQueryString = require("../../util/escapeQueryString");
const escapeXML = require("../../util/escapeXML");
const getClient = require("../../database/getClient");

function listEmissions(req, res) {
    const clientPromise = getClient();
    return clientPromise
        .then(client => {
            return client.query(`SELECT * FROM emissions;`);
        })
        .then(x => res.json(x.rows))
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
        .then(x => res.json(x.rows).send())
        .catch(e => res.status(500).send())
        .then(() => clientPromise)
        .then(x => x.end());
}

module.exports = { listEmissions, listEmissionsByCountry };