module.exports = function(grunt) {

    var packageJson = grunt.file.readJSON('package.json');

    grunt.initConfig({
        clean: {
            all: 'build',
            output: 'build/output',
            tmp: 'build/tmp',
            cache: 'build/cache'
        },
        copy: {
            js: {
                expand: true,
                dest: 'build/output/js',
                cwd: 'src/js',
                src: ['**/*.js']
            },
            sass: {
                expand: true,
                dest: 'build/tmp/sass',
                cwd: 'src/sass',
                src: ['**/*.scss']
            },
            components: {
                expand: true,
                dest: 'build/output/components',
                cwd: 'bower_components',
                src: ['**']
            },
            partials: {
                expand: true,
                dest: 'build/output/partials',
                cwd: 'src/partials',
                src: ['**/*.html']
            },
            images: {
                expand: true,
                dest: 'build/output/images',
                cwd: 'src/images/scaled',
                src: ['**']
            },
            packageJson: {
                expand: true,
                dest: 'build/output',
                cwd: '.',
                src: ['package.json']
            },
            fonts: {
                expand: true,
                dest: 'build/output/fonts',
                cwd: 'src/fonts',
                src: ['**']
            },
            index: {
                expand: true,
                dest: 'build/output',
                cwd: 'src',
                src: ['index.html']
            },
            backend: {
                expand: true,
                dest: 'build/output/node_modules/wireless-personal-audio-mixer-backend',
                cwd: 'node_modules/wireless-personal-audio-mixer-backend',
                src: ['**']
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'build/tmp/sass',
                    cssDir: 'build/output/css'
                }
            }
        },
        watch: {
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['copy:js'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['copy:sass', 'compass:dev'],
                options: {
                    livereload: true
                }
            },
            partials: {
                files: ['src/partials/**/*.html'],
                tasks: ['copy:partials'],
                options: {
                    livereload: true
                }
            },
            images: {
                files: ['src/images/**/*'],
                tasks: ['copy:images'],
                options: {
                    livereload: true
                }
            },
            packageJson: {
                files: ['package.json'],
                tasks: ['copy:packageJson'],
                options: {
                    livereload: true
                }
            },
            index: {
                files: ['src/index.html'],
                tasks: ['copy:index'],
                options: {
                    livereload: true
                }
            }
        },
        nodewebkit: {
            options: {
                platforms : ['osx64'],
                buildDir : './build/release',
                cacheDir : './build/cache'
            },
            src: ['build/output/**']
        },
        exec: {
            nw: 'node_modules/.bin/nw build/output',
            outputInstall: {
                cmd: 'npm install --production',
                cwd: './build/output'
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            nw: ['watch', 'exec:nw']
        },
        env: {
            dev: {
                NODE_ENV: 'development'
            }
        }
    });

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');

    grunt.registerTask('debug', ['env:dev', 'copy', 'compass', 'concurrent:nw']);
    grunt.registerTask('default', ['copy', 'compass', 'exec:outputInstall', 'nodewebkit']);

    grunt.registerTask('rebuildNativeModules', 'Rebuilds all of the native modules using nw-gyp', function() {
        var files = grunt.file.expand('./node_modules/**/binding.gyp');
        files.forEach(function(file) {
            grunt.config.set('exec.rebuild', {
                cmd: 'nw-gyp rebuild --target=' + packageJson.nwVersion,
                cwd: file.substring(0, file.lastIndexOf('/'))
            });
            console.log(grunt.config.get('exec.rebuild'));
            grunt.task.run('exec:rebuild');
        });

    });

};
