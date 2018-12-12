const xml2Json = require("../../util/xml2Json"),
    fs = require("fs"),
    co2Path = "src/server/assets/API_EN.ATM.CO2E.KT_DS2_en_xml_v2_10227343.xml";

const co2Content = () =>
    xml2Json(fs.readFileSync(co2Path).toString(), ["country", "Item", "Year", "Value"]);

function listEmissions(req, res) {
    res.json(co2Content()).send();
}

function listEmissionsByCountry(req, res) {
    const country = req.params.country.toLowerCase();;
    const retVal = co2Content();
    retVal.data.record =
        retVal.data.record.filter(data => data.country.match(country) !== null);
    res.json(retVal).send();
}

module.exports = { listEmissions, listEmissionsByCountry };