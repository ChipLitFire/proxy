const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy configuration
app.use(
  '/proxy', // The path where we'll serve the proxied content
  createProxyMiddleware({
    target: 'https://CHUGWEB.github.io', // The website we want to proxy
    changeOrigin: true, // Needed for virtual hosted sites
    pathRewrite: {
      '^/proxy': '', // Remove /proxy from the request path before forwarding
    },
    onProxyReq: (proxyReq, req, res) => {
      // Optional: modify request headers if needed
      console.log('Proxying:', req.url);
    },
  })
);

// Serve static frontend (our HTML page)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
