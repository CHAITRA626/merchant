module.exports = {
  assetsDir: 'static-assets',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '^/api': {
        target: 'https://valuedash.scalevision.net/',
        ws: true,
        changeOrigin: true
      }
    }
  },
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'ECommerce Vue Project'
    }
  },
  productionSourceMap: false,
  transpileDependencies: [
    'vuetify'
  ]
}
