'use strict';

var livereload = require('connect-livereload'),
    path = require('path');

var appServer = function () {
    return require('./server/server');
};

module.exports = function (grunt) {

	// show elapsed time at the end
  require('time-grunt')(grunt);

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var yeomanConfig = {
      app: 'client',
      dist: 'public'
  };

  grunt.initConfig({
      yeoman: yeomanConfig,
      connect: {
          options: {
            port: 3000,
            hostname: '0.0.0.0'
          },
          livereload: {
            options: {
              middleware: function (connect) {
                return [
                  appServer(),
                  livereload({port: 35729}),
                  connect.static(path.resolve('.tmp')),
                  connect.static(path.resolve(yeomanConfig.app))
                ];
              }
            }
          },
          test: {
            options: {
              middleware: function (connect) {
                return [
                  appServer(),
                  connect.static(path.resolve('.tmp')),
                  connect.static(path.resolve(yeomanConfig.app))
                ];
              }
            }
          }
      },
      watch: {
        options: {
          livereload: 35729
        },
        index: {
          files: [
            '<%= yeoman.app %>/*.html'
          ],
          tasks: ['targethtml']
        },
        react: {
          files: ['<%= yeoman.app %>/scripts/**/*.{jsx,js}'],
          tasks: ['browserify:dev']
        },
        less: {
          files: [
            '<%= yeoman.app %>/scripts/**/*.less',
            '<%= yeoman.app %>/lib/**/*.less'
          ],
          tasks: ['less:serve', 'autoprefixer:dev']
        },
        images: {
          files: [
            '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      },
      clean: {
        dist: ['.tmp', '<%= yeoman.dist %>/*'],
        serve: '.tmp'
      },
      targethtml: {
        dist: {
          files: {
            '.tmp/index.html': '<%= yeoman.app %>/index.html'
          }
        }
      },
      browserify: {
        options: {
          transform: ['babelify']
        },
        dist: {
          files: {
            '.tmp/scripts/app.js': 'client/scripts/app.js'
          },
          options: {
            browserifyOptions: {
              extensions: '.jsx'
            }
          }
        },
        dev: {
          files: {
            '.tmp/scripts/app.js': 'client/scripts/app.js',
          },
          options: {
            browserifyOptions: {
              debug: true,
              extensions: '.jsx'
            }
          }
        }
      },
      compass: {
        options: {
          sassDir: '<%= yeoman.app %>/scripts/components',
          cssDir: '.tmp/styles',
          specify: '<%= yeoman.app %>/scripts/components/layout.scss',
          imagesDir: '<%= yeoman.app %>/images',
          javascriptsDir: '<%= yeoman.app %>/scripts',
          fontsDir: '<%= yeoman.app %>/fonts',
          relativeAssets: true
        },
        dist: {},
        serve: {
          options: {
            debugInfo: true
          }
        }
      },
      less: {
        serve: {
          options: {
            sourceMap: true,
            sourceMapURL: 'styles/layout.css.map'
          },
          files: {
            '.tmp/styles/layout.css': '<%= yeoman.app %>/scripts/components/layout.less'
          }
        },
        dist: {
          files: {
            '.tmp/styles/layout.css': '<%= yeoman.app %>/scripts/components/layout.less'
          }
        }
      },
      useminPrepare: {
        src: '.tmp/index.html',
        options: {
            dest: '<%= yeoman.dist %>'
        }
      },
      imagemin: {
        dist: {
          files: [{
            expand: true,
            cwd: '<%= yeoman.app %>/images',
            src: '{,*/}*.{png,jpg,jpeg}',
            dest: '<%= yeoman.dist %>/images'
          }]
        }
      },
      htmlmin: {
        dist: {
          options: {
            //removeCommentsFromCDATA: true,
            // https://github.com/yeoman/grunt-usemin/issues/44
            //collapseWhitespace: true,
            collapseBooleanAttributes: true,
            //removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            //useShortDoctype: true,
            removeEmptyAttributes: true,
            //removeOptionalTags: true
          },
          files: [{
            expand: true,
            cwd: '.tmp',
            src: '*.html',
            dest: '<%= yeoman.dist %>'
          }]
        }
      },
      filerev: {
        dist: {
          files: [{
            src: [
              '<%= yeoman.dist %>/scripts/**/*.js',
              '<%= yeoman.dist %>/styles/**/*.css',
              '<%= yeoman.dist %>/vendor/**/*.js'
            ]
          }]
        }
      },
      autoprefixer: {
        options: {
          browsers: [
            'last 5 versions',
            'ie 9',
            'safari 6',
            'opera 15',
            'ios_saf 6.1',
            'chrome 39',
            'firefox 4'
          ]
        },
        dev: {
          expand: true,
          src: '.tmp/styles/*.css'
        },
        dist: {
          expand: true,
          src: '.tmp/concat/styles/*.css'
        }
      },
      copy: {
        dist: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.{ico,txt}',
              'images/{,*/}*.{webp,gif}'
            ]
          }]
        }
      },
      usemin: {
        html: ['<%= yeoman.dist %>/{,*/}*.html'],
        css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
        options: {
          dirs: ['<%= yeoman.dist %>']
        }
      },
      babel: {
        options: {
          sourceMap: true
        },
        test: {
          files: [{
            expand: true,
            dot: true,
            cwd: '<%= yeoman.app %>',
            dest: '.tmp',
            src: [
              'scripts/**/*.{js,jsx}',
            ]
          }]
        }
      },
      jshint: {
        options: {
            jshintrc: '.jshintrc',
            reporter: require('jshint-stylish')
        },
        server: [
          'Gruntfile.js',
          'server/{,*/}*.js'
        ],
        client: {
          src: [
            '.tmp/scripts/**/*.{jsx,js}',
          ],
          options: {
            jshintrc: 'client/.jshintrc'
          }
        }
      }
  });

  grunt.registerTask('serve', [
    'clean:serve',
    'targethtml',
    'browserify:dev',
    'less:serve',
    'autoprefixer:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:serve',
    'babel:test',
  	'jshint'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'targethtml',
    'browserify:dist',
    'less:dist',
    'useminPrepare',
    'concat',
    'autoprefixer:dist',
    'imagemin',
    'htmlmin',
    'cssmin',
    'uglify',
    'copy',
    'filerev',
    'usemin'
  ]);
};
