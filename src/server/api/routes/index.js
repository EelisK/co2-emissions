module.exports = function (app) {
    require("./CO2EmissionRoutes")(app);
    require("./populationRoutes")(app);
}