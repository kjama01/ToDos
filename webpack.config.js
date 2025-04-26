const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/ToDos/", 
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/images", to: "images" }],
    }),
  ],
};
