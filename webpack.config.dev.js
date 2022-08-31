const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");

const config = {
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    client: {
      logging: "info",
      progress: false,
    },
    hot: true,
    open: true,
    port: 8080,
  },
  devtool: "eval-cheap-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].dev.js",
  },
};

module.exports = merge(commonConfig, {
  ...config,
});
