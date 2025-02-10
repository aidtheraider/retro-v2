const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Define the target URL you want to unblock
const targetUrl = 'http://example.com';

// Create an HTTP server to handle incoming requests
const server = http.createServer((req, res) => {
  // Modify the request URL to the target URL
  req.url = targetUrl + req.url;

  // Proxy the request to the target URL
  proxy.web(req, res, { target: targetUrl }, (err) => {
    console.error('Proxy error:', err);
    res.writeHead(502);
    res.end('Bad Gateway');
  });
});

// Start the server on port 8080
server.listen(8080, () => {
  console.log('Unblocker server is running on http://localhost:8080');
});