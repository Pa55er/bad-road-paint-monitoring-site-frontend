const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');

// 포트 번호
const PORT = 5000;

// 서버 작동 확인
app.listen(PORT, ()=>{
    console.log(`Server on : http://localhost:${PORT}/signin`);
});

// 서버 접속시 정적 파일 전달
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('/signin', (req,res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// rest api 요청시 proxy 문제
app.use('/backend/*', createProxyMiddleware({
    target: 'http://backend:8080',
    changeOrigin: true,
    pathRewrite: {
        '^/backend': ''
    }
}));
