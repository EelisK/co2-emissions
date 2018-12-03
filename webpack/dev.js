const path = require("path");
const merge = require("webpack-merge");
const common = require("./common");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        port: 3000
    }
});