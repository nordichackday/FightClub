
module.exports = {
  progress: false,
  entry: {
    "game": "./assets/src/js/game.js"
  },
  output: {
    path: "./assets/dist/",
    filename: "js/[name].js",
    publicPath: "/local-assets/dist/"
  },
  module: {
    loaders: [
    ]
  }
};