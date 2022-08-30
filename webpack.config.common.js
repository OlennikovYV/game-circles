const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    app: ["./src/js/index.js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: "body",
      minify: { removeComments: true, collapseWhitespace: false },
      template: "./src/index.html",
      title: "Circles game",
    }),
  ],
};

module.exports = config;
