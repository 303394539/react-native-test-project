module.exports = function(grunt) {

  var pkg = grunt.file.readJSON("package.json");

  var uglifyOptions = {
    compress: {
      global_defs: {
        DEBUG: false,
        DEVMODE: false,
      },
      dead_code: true,
      unused: true,
      loops: true,
      // drop_console: true
    },
    mangle: false,
    // sourceMap: true,
    preserveComments: false,
    report: "min",
    beautify: {
      "ascii_only": true
    },
    ASCIIOnly: true,
    banner: "<%= meta.banner %>"
  };

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
      options: uglifyOptions,
      build: {
        files: {
          "build/main.js": ["mark/js/baic.min.js", "mark/js/init.js", "mark/js/*.js", "!mark/main.js"]
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
        minifyCSS: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeOptionalTags: true,
        decodeEntities: true,
        useShortDoctype: true
      },
      build: {
        expand: true,
        cwd: "src/",
        src: "**/*.html",
        dest: "mark/"
      }
    },

    htmlparse: {
      build: {
        expand: true,
        cwd: "mark/",
        src: "**/*.html",
        dest: "build/"
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
        rename: (dest, src) => {
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

  grunt.registerMultiTask('htmlparse', 'parse html files', function() {
    var fs = require('fs');
    var uglifyJS = require('uglify-js');
    var minify = function(code) {
      return uglifyJS.minify(code, {
        fromString: true,
        mangle: true,
        preserveComments: false,
        compress: uglifyOptions.compress
      }).code
    }
    var babel = require("babel-core");
    var transform = function(code){
      return babel.transform(code, pkg.babel).code
    }

    this.files.forEach(file => {
      var src = file.src[0];
      var content = fs.readFileSync(src, "utf8");
      content = content.replace(/<script>([\s\S]*?)<\/script>/ig, function(all, js) {
        var code;
        try {
          code = minify(transform(js));
        } catch (e) {
          grunt.fail.fatal(`${e.message} in file ${file.dest} [${e.line}:${e.col}]`);
        }
        return '<script>' + code + '</script>';
      });
      content += `<script>${
        minify(transform(fs.readFileSync(src.replace(/\.html/i, ".js"), "utf8")))
      }</script>`;
      fs.writeFileSync(file.dest, content);
    })
  });

  grunt.registerTask('build', [
    'clean:build',
    'babel:mark',
    'uglify:build',
    'stylus:build',
    'htmlmin:build',
    'htmlparse:build',
    'compress:build',
    'clean:mark'
  ]);
};