const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/auth/login',
        createProxyMiddleware({
            target: 'http://143.248.197.207:3000/auth/login',
            changeOrigin: true
        })
    )
}