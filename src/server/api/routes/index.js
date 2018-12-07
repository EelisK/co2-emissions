const { listEmissions, listEmissionsByCountry } = require("../controllers/CO2EmissionController");
const { countryPopulation } = require("../controllers/populationController");

module.exports = function (app) {
    app.get("/api/v1/emissions", listEmissions);
    app.get("/api/v1/emissions/:country", listEmissionsByCountry);
    app.get("/api/v1/population/:country", countryPopulation);
}