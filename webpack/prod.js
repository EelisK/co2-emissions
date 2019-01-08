const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./common");

module.exports = merge(common, {
    mode: "production",
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                parallel: true,
                cache: true,
                uglifyOptions: {
                    mangle: true,
                    keep_fnames: false,
                    keep_classnames: false,
                    compress: true
                },
                extractComments: true
            })
        ]
    },
    output: {
        filename: "bundle.[hash].js"
    }
});