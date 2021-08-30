const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@fonts': path.resolve(__dirname, './src/assets/fonts'),
        '@scss': path.resolve(__dirname, './src/assets/scss'),
        '@icons': path.resolve(__dirname, './src/assets/images/icon'),
        '@images': path.resolve(__dirname, './src/assets/images/image'),
        '@components': path.resolve(__dirname, './src/components'),
        '@views': path.resolve(__dirname, './src/views'),
      },
    },
  },
}
