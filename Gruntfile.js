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
        compass: {
          files: ['<%= yeoman.app %>/scripts/**/*.{scss,sass}'],
          tasks: ['compass:serve', 'autoprefixer:dev']
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
          transform: [['reactify', {"es6": true}]]
        },
        dist: {
          files: {
            '.tmp/scripts/app.js': 'client/scripts/app.js',
          },
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
      autoprefixer: {
        dev: {
          expand: true,
          src: '.tmp/styles/*.css'
        },
        dist: {
          expand: true,
          src: '<%= yeoman.dist %>/styles/*.css'
        }
      },
      jshint: {
          options: {
              jshintrc: '.jshintrc',
              reporter: require('jshint-stylish')
          },
          all: [
            'client/**/*.{jsx,js}',
            '!client/vendor/**',
            'Gruntfile.js',
            'server/{,*/}*.js'
          ]
      }
  });

  grunt.registerTask('serve', [
    'clean:serve',
    'targethtml',
    'browserify:dev',
    'compass:serve',
    'autoprefixer:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('test', [
  	'jshint'
  ]);

  grunt.registerTask('build', [
  ]);
};
