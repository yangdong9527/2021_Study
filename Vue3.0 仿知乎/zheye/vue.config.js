module.exports = {
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'nosource-source-map' : 'eval-cheap-module-source-map'
  }
}
