const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (your custom HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Proxy all requests starting with /proxy to CHUGWEB.github.io
app.use(
  '/proxy',
  createProxyMiddleware({
    target: 'https://CHUGWEB.github.io',
    changeOrigin: true,
    pathRewrite: { '^/proxy': '' },
  })
);

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
