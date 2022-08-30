const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js$/,
      }),
    ],
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "js/[name].[contenthash:8].js",
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[name].[contenthash:8].css" }),
  ],
};

module.exports = merge(commonConfig, {
  ...config,
});
