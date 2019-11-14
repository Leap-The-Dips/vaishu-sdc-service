const webpackConfig = require('./webpack.common.js');
const aws = require('./aws-keys.json');

module.exports = function (grunt) {
  grunt.initConfig({
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig),
    },
    aws_s3: {
      options: {
        accessKeyId: aws.AWSAccessKeyId, // Use the variables
        secretAccessKey: aws.AWSSecretKey, // You can also use env variables
        region: 'us-east-2',
        bucket: 'fec-product-images',
        // uploadConcurrency: 5, // 5 simultaneous uploads
        // downloadConcurrency: 5 // 5 simultaneous downloads
      },
      bundle: {
        files: [
          {
            expand: true,
            cwd: 'public',
            src: 'app.js',
            dest: 'fec_bundle/',
            action: 'upload',
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-aws-s3');
};
