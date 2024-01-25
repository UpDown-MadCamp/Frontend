const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // '/api'로 시작하는 경로를 타겟 URL에서 제거합니다.
            }
        })
    );
};