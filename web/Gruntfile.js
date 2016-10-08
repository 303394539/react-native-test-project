module.exports = function(grunt) {

  var pkg = grunt.file.readJSON("package.json");

  grunt.initConfig({
    pkg: pkg,
    meta: {
      file: 'main',
      banner: '/* <%= pkg.name %> - <%= grunt.template.today("yyyy/mm/dd") %>\n' + '   Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> */\n'
    },

    clean: {
      build: "build/",
      mark: "mark/"
    },

    babel: {
      options: pkg.babel,
      mark: {
        cwd: "src/",
        src: "**/*.js",
        dest: "mark/",
        expand: true
      }
    },

    uglify: {
      options: {
        compress: {
          global_defs: {
            DEBUG: false,
            DEVMODE: false,
          },
          dead_code: true,
          unused: true,
          loops: true,
          drop_console: true
        },
        mangle: false,
        sourceMap: true,
        preserveComments: false,
        report: "min",
        beautify: {
          "ascii_only": true
        },
        ASCIIOnly: true,
        banner: "<%= meta.banner %>"
      },
      build: {
        files: {
          "build/main.js": ["mark/js/baic.min.js", "mark/js/*.js", "!mark/main.js"]
        }
      }
    },

    stylus: {
      build: {
        cwd: "src/",
        src: ["**/*.styl", "!css/lib.styl", "!css/common.styl"],
        dest: "build/",
        ext: ".css",
        expand: true
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeOptionalTags: true,
      },
      build: {
        files: [{
          expand: true,
          cwd: "src/",
          src: "**/*.html",
          dest: "build/"
        }]
      }
    },

    compress: {
      options: {
        mode: "gzip",
        level: 9,
        pretty: true
      },
      build: {
        cwd: "build/",
        src: '**/*.{js,css,html}',
        dest: "build/",
        rename: function(dest, src) {
          return dest + src + '.gz';
        },
        expand: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('build', [
    'clean:build',
    'babel:mark',
    'uglify:build',
    'stylus:build',
    'htmlmin:build',
    'compress:build',
    'clean:mark'
  ]);
};