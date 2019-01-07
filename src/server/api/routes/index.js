module.exports = function (app) {
    require("./CO2EmissionRoutes")(app);
    require("./CountryRoutes")(app);
}