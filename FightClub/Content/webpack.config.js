
module.exports = {
  progress: false,
  entry: {
    "user": "./assets/src/js/user.js",
    "prepare": "./assets/src/js/prepare.js",
    "replay": "./assets/src/js/replay.js"
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