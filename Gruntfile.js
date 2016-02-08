/* jshint camelcase: false */
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-version-check');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      main: {
        src: ['Gruntfile.js','index.js','lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js'],
      }
    },
    mochaTest: {
      options: {
      },
      any: {
          src: ['test/**/*.js']
      }
    },
    clean: {
      modules: ['node_modules'],
      build:   ['npm-debug.log'],
      editor:  ['./**/*~', './**/*.swp'],
      dist:    [
        '<%= clean.editor %>',
        '<%= clean.modules %>',
        '<%= clean.build %>',
      ],
    },
    versioncheck: {
      options: {
        skip: ['semver', 'npm', 'lodash'],
        hideUpToDate: false
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['eslint', 'mochaTest'],
        options: {
          spawn: false,
          interval: 500,
        },
      },
    },
  });

  grunt.registerTask('lint',    ['eslint']);
  grunt.registerTask('test',    ['mochaTest']);
  grunt.registerTask('version', ['versioncheck']);
  grunt.registerTask('default', ['eslint','mochaTest']);
};
