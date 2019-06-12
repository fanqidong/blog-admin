module.exports = {
    productionSourceMap: false,
    // configureWebpack: {
    //   externals: {
    //     "leancloud-storage": "AV",
    //     'vue': 'Vue',
    //     'vue-router': 'VueRouter',
    //     'vuex': 'Vuex'
    //   }
    // },
    devServer: {
      proxy: {
        '/api': {
          target: 'https://api.baidu.com/json/tongji/v1/ReportService/getSiteList',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
      // publicPath: '/abner'
    }
  }