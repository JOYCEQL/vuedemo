module.exports = {

  // 在exports中添加，这里很关键，不配置不行
  transpileDependencies: ['element-ui', 'v-calendar'],

  chainWebpack (config) {
    // 在chainWebpack中添加下面的代码
    config.entry('main').add('babel-polyfill') // main是入口js文件
  },
  devServer: {
    // 设置代理
    proxy: {
      '/v1': {
        target: 'http://v.juhe.cn/sms/send',
        ws: true, // 是否启用websockets
        changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/v1': ''
        }
      }
    }
  }
}
