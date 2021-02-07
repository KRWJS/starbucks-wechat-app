module.exports = function(grunt) {

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'public/css/main.min.css': 'assets/stylesheets/main.scss'
                }
            }
        },

        uglify: {
            options: {
                banner: '',
                compress: true,
                sourceMap: true
            },
            main: {
                files: {
                    'public/js/main.min.js': [
                        'assets/scripts/vendor/jquery-3.1.1.min.js',
                        'assets/scripts/vendor/jquery.fullPage.min.js',
                        'assets/scripts/vendor/hammer.min.js',
                        'assets/scripts/main.js'
                    ]
                }

            }
        },

        watch: {
            sass: {
                files: ['assets/stylesheets/**/*.scss'],
                tasks: ['sass']
            },
            uglify_main: {
                files: ['assets/scripts/**/*.js'],
                tasks: ['uglify:main']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    // Tasks to be executed
    grunt.registerTask('default', ['watch']);
};
