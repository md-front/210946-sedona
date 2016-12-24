module.exports = function(grunt) {
  
  require("load-grunt-tasks")(grunt);
  
  grunt.initConfig({
    sass: {
      style: {
        files: {
          "build/css/style.css": "sass/style.scss"
        }
      }
    },
    postcss: {
      style: {
        options: {
          processors: [
            require("autoprefixer")({browsers:
              [
                "last 1 version",
                "last 2 Chrome versions",
                "last 2 Firefox versions",
                "last 2 Opera versions",
                "last 2 Edge versions"
              ]}),
            require("css-mqpacker")({
              sort: true
            })
          ]
        },
        src: "build/css/*.css"
      }
    },
    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html"]
      },
      style: {
        files: ["sass/**/*.{scss,sass}"],
        tasks: ["sass", "postcss", "csso"]
      }
    },
    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },
    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/*.{png,jpg,gif}"]
        }]
      }
    },
    svgstore: {
      options: {
        svg: {
          style: "display: none"
        }
      },
      symbols: {
        files: {
          "build/img/symbols.svg": ["img/icons/*.svg"]
        }
      }
    },
    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["build/img/*.svg"]
        }]
      }
    },
    csscomb: {
      dist: {
        options: {
          config: 'csscomb.json'
        },
        files: {
          "css/style.css": ['css/style.css']
        }
      }
    },
    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "fonts/**",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      },
      html: {
        files: [{
          expand: true,
          src: ["*.html"],
          dest: "build"
        }]
      }
    },
    clean: {
      build: ["build"]
    },
    browserSync: {
      server: {
        bsFiles: {
          src: ["build/*.html", "build/css/*.css"]
        },
        options: {
          server: "build",
          watchTask: true
        }
      }
    }
  });
  
  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("symbols", ["svgmin", "svgstore"]);
  
  grunt.registerTask("build", [
    "csscomb",
    "clean",
    "copy",
    "sass",
    "postcss",
    "csso",
    "symbols",
    "imagemin"
  ]);
};


