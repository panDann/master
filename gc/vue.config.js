module.exports = {



    devServer: {
        open: process.platform === 'darwin',
        host: '127.0.0.1',
        port: 9090,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
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