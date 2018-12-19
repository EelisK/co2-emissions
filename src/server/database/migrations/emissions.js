/**
 * Migrate the database with the assets
 */
module.exports = function () {
    const xml2Json = require("../../util/xml2Json");
    const co2Path = "src/server/assets/API_EN.ATM.CO2E.KT_DS2_en_xml_v2_10227343.xml";
    const popPath = "src/server/assets/API_SP.POP.TOTL_DS2_en_xml_v2_10224853.xml";
    const fs = require("fs");
    const co2Comtent = xml2Json(fs.readFileSync(co2Path).toString(), ["country", "item", "year", "value"]).root.data.record;
    const popComtent = xml2Json(fs.readFileSync(popPath).toString(), ["country", "item", "year", "value"]).root.data.record;
    const allContent = {};
    co2Comtent.forEach(x => {
        // Multiply emissions by 1e3 because it makes more sence to store it with kg as unit instead of 1e-3*kg
        (allContent[x.country] = allContent[x.country] || {})[x.year] = { emissions: x.value === null ? null : 1e3 * x.value };
    });
    popComtent.forEach(x => {
        if (allContent[x.country] && allContent[x.country][x.year])
            allContent[x.country][x.year] = { ...allContent[x.country][x.year], population: x.value };
    });
    // Delete data that is marked as "not classified"
    delete allContent["not classified"];
    const pool = require("../getPool")();
    return Promise.all(
        Object
            .keys(allContent)
            .map(country =>
                Promise.all(Object
                    .keys(allContent[country])
                    .map(year => pool.query(`INSERT INTO emissions VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING;`,
                        [country, year, allContent[country][year].population, allContent[country][year].emissions])))
            ))
        .then(() => pool.end());
}