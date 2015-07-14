module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
           'public/stylesheets/main.css': 'assets/scss/main.scss'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['sass']);
}
