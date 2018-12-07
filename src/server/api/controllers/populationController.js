const xml2Json = require("../util/xml2Json"),
    fs = require("fs"),
    popPath = "src/server/assets/API_SP.POP.TOTL_DS2_en_xml_v2_10224853.xml";

const population = () =>
    xml2Json(fs.readFileSync(popPath).toString(), ["country", "Item", "Year", "Value"]);

function countryPopulation(req, res) {
    const country = req.params.country.toLowerCase();
    const content = population();
    content.data.record =
        content.data.record.filter(data => data.country.match(country) !== null);
    res.json(content).send();
}

module.exports = { countryPopulation };