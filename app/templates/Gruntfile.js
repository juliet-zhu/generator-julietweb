// Generated on <%%= (new Date).toISOString().split('T')[0] %> using <%%= pkg.name %> <%%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        dev: 'dev',
        pub: 'pub'

    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            // js: {
            //     files: ['<%%= config.app %>/scripts/{,*/}*.js'],
            //     tasks: ['jshint'],
            //     options: {
            //         livereload: true
            //     }
            // },
            // jstest: {
            //     files: ['test/spec/{,*/}*.js'],
            //     tasks: ['test:watch']
            // },
            gruntfile: {
                files: ['Gruntfile.js']
            },<% if (includeStylus) { %>
            styles: {
                files: ['<%%= config.app %>/styles/{,*/}*.styl'],
                tasks: ['stylus']
            },<% } %>
            livereload:{
                options:{
                    livereload:true
                },
                files:['<%%= config.app %>/**','!<%%= config.app %>/bower_components/**']
            },<% if (includeJade) { %>
            jade:{
                files:'<%%= config.app %>/**/*.jade',
                tasks:['jade']
            },<% } %>
            copy:{
                files:['<%%= config.app %>/**','!**/*.jade','!**/*.styl','!<%%= config.app %>/bower_components/**'],
                tasks:['copy']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                //hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    base:'dev',
                    middleware: function(connect, options, middlewares) {
                            middlewares.unshift(require('connect-livereload')());
                            return middlewares;
                    }
                    
                }
            },
            test: {
                options: {
                    open: false,
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            pub: {
                options: {
                    base: '<%%= config.pub %>',
                    livereload: false
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dev: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= config.dev %>/*',
                        '!<%%= config.dev %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js'
            ]
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%%= config.pub %>'
            },
            html: '<%%= config.app %>/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%%= config.pub %>', '<%%= config.pub %>/images']
            },
            html: ['<%%= config.pub %>/{,*/}*.html'],
            css: ['<%%= config.pub %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%%= config.pub %>/images'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%%= config.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%%= config.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%%= config.dist %>/scripts/scripts.js': [
        //                 '<%%= config.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            dev: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.app %>',
                    dest: '<%%= config.dev %>',
                    src: [
                        '**',
                        '!templates',
                        '!**/*.jade',
                        '!**/*.styl',
                        '!bower_components/**'
                    ]
                }]
            }
        },<% if (includeModernizr) { %>

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your source
        modernizr: {
            dist: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: '<%%= config.dist %>/scripts/vendor/modernizr.js',
                files: {
                    src: [
                        '<%%= config.dist %>/scripts/{,*/}*.js',
                        '<%%= config.dist %>/styles/{,*/}*.css',
                        '!<%%= config.dist %>/scripts/vendor/*'
                    ]
                },
                uglify: true
            }
        },<% }  if (includeStylus) { %>

        stylus:{
            options:{
                compress:false
            },
            dev:{
                files:[{
                  expand:true,
                  cwd:'<%%= config.app %>/styles',
                  src:['**/*.styl','!vars.styl','!mixins.styl'],
                  dest:'<%%= config.dev %>/styles',
                  ext:'.css'
                }]
            }
        },<% } if (includeJade) { %>

        jade:{
          dev:{
            options:{
              pretty:true
            },
            files:[{
              expand: true,
              cwd:'app',
              src:['**/*.jade','!templates/*.jade'],
              dest:'dev',
              ext:'.html'
            }]
          }
        },<% } %>

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        // bowerInstall: {
        //    
        // },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= config.dist %>/scripts/{,*/}*.js',
                        '<%%= config.dist %>/styles/{,*/}*.css',
                        '<%%= config.dist %>/images/{,*/}*.*',
                        '<%%= config.dist %>/styles/fonts/{,*/}*.*',
                        '<%%= config.dist %>/*.{ico,png}'
                    ]
                }
            }
        },


        uglify:{
          options:{
            mangle:false
          },
          pub:{
            files:{
            'pub/js/components/components.min.js':['pub/js/components/components.js']
            } 
          }   
        }
    });


    grunt.registerTask('serve', function (target) {
        if (target === 'pub') {
            return grunt.task.run(['pub', 'connect:pub:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function (target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server'
            ]);
        }
    });

    grunt.registerTask('dev', [
        'clean:dev',
        'copy:dev',
         'stylus',
         'jade'
    ]);

    grunt.registerTask('default', ['dev']);

};
