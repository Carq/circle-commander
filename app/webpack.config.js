const path = require("path");

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";
const devtool =
  process.env.NODE_ENV === "production" ? undefined : "source-map";

module.exports = {
  mode,
  entry: path.join(__dirname, "renderer", "index.js"),
  output: {
    filename: "renderer.js",
    path: path.resolve(__dirname, "build"),
    hashFunction: "sha256",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, "renderer"),
          path.resolve(__dirname, "main", "events.js"),
        ],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  target: "electron-renderer",
  devtool,
  node: false,
};
