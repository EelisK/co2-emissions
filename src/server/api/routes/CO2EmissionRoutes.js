const { listEmissions, listEmissionsByCountry } = require("../controllers/CO2EmissionController");

module.exports = function (app) {
    app.route("/api/v1/emissions")
        .get(listEmissions);
    app.route("/api/v1/emissions/:country")
        .get(listEmissionsByCountry);
}