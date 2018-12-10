const { countryPopulation } = require("../controllers/populationController");

module.exports = function (app) {
    app.route("/api/v1/population/:country")
        .get(countryPopulation);
}