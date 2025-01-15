const { override, addWebpackPlugin } = require('customize-cra');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

module.exports = override(
  addWebpackPlugin(
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 85
        }
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: true,
      strict: true
    })
  )
); 