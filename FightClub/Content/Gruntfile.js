var webpack = require("webpack");

module.exports = function(grunt) {
  grunt.initConfig({

    "less": {
      development: {
        files: {
          "assets/dist/css/game.css": ["assets/src/css/normalize.css", "assets/src/less/*"]
        }
      },
      production: {
        options: {
          compress: true
        },
        files: {
          "assets/dist/css/game.css": ["assets/src/css/normalize.css", "assets/src/less/*"]
        }
      }
    },

    "webpack": {
      options: require("./webpack.config.js"),
      development: {
      },
      production: {
        plugins: [
          new webpack.optimize.UglifyJsPlugin()
        ]
      }
    },

    "watch": {
      less: {
        files: ['assets/src/less/**/*'],
        tasks: ['less']
      },
      js: {
        files: ['assets/src/js/**/*'],
        tasks: ['webpack:development']
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask("dev", "Development build", function() {
    grunt.task.run("less:development", "webpack:development", "watch");
  });

  grunt.registerTask("prod", "Production build", function() {
    grunt.task.run("less:production", "webpack:production");
  });

};
