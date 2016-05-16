// karma.conf.js
// manual at http://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],


    browsers: [
//        'Chrome',
//        'Opera',
//        'IE',
          'PhantomJS'
    ],

    singleRun: false,

    autoWatch: true,

    files: [
      '*.js'
    ]
  })
}