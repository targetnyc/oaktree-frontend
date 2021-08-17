module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          sourcemap: false,
          compress: false,
          yuicompress: false,
          style: 'expanded',
        },
        files: {
          'css/style.css' : 'sass/style.scss',
          'css/twitter.css' : 'sass/twitter.scss',
        }
      },
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },
    svg_sprite          : {
        basic         : {
            // Target basics
            expand        : true,
            cwd         : 'sprites',
            src         : ['**/*.svg'],
            dest        : '.',
 
            // Target options
            options       : {
                mode      : {
                    inline: true,
                    css     : {
                        dest: 'sass',
                        render  : {
                            scss : true
                        }
                    }
                }
            }
        }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, flatten: true, src: ['sass/svg/*'], dest: 'css/svg/', filter: 'isFile'},
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.registerTask('default',['watch', 'sass']);
}