const webpack = require('webpack')
module.exports = {

    transpileDependencies: [],
    // output:["@babel/polyfill","/dist"],
    configureWebpack:{
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
         ],
        devServer: {
            open: process.platform === 'darwin',
            host: '127.0.0.1',
            port: 9090,
            https: false,
            hotOnly: false,
            proxy: {
                '/api': {
                    target: 'http://3.19.32.76:9000',
                    changeOrigin: true,
                    ws: true,
                    hotOnly:true
                    // pathRewrite: {
                    //   '^/api': ''
                    // }
                },
              
            }, // 设置代理
            before: app => {}
        }
    }
    }
