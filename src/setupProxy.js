const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/auth/login',
        createProxyMiddleware({
            target: 'http://192.248.197.207:5000/auth/login',
            changeOrigin: true
            
        })
    )
}