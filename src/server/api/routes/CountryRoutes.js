const { getCountries, getCountriesWithName } = require("../controllers/CountryController");

module.exports = function (app) {
    app.route("/api/v1/countries/:name")
        .get(getCountriesWithName);
    app.route("/api/v1/countries")
        .get(getCountries);
}