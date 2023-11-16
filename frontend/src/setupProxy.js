const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        createProxyMiddleware('/backend', {
            target: 'http://localhost:18080',
            changeOrigin: true,
            pathRewrite: {
                '^/backend': ''
            }
        })
    );
};