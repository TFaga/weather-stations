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
        dist: 'dist'
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
                            connect.static(path.resolve(yeomanConfig.app))
                        ];
                    }
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'server/{,*/}*.js'
            ]
        }
    })

    grunt.registerTask('serve', [
		'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('test', [
    	'jshint'
    ]);

    grunt.registerTask('build', [
    ]);
};