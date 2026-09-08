const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../preview-public');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
http.createServer((request,response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400); return response.end('Invalid URL'); }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const relative = path.relative(root,file);
  if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(part=>part.startsWith('.'))) { response.writeHead(403); return response.end('Forbidden'); }
  const headers = {'X-Robots-Tag':'noindex, nofollow, noarchive','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Type':types[path.extname(file)] || 'application/octet-stream'};
  fs.readFile(file,(error,data) => {
    if (error) { response.writeHead(404,{...headers,'Content-Type':'text/html; charset=utf-8'});return response.end(fs.readFileSync(path.join(root,'404.html'),'utf8').replace('<head>','<head><base href="/">')); }
    response.writeHead(200,headers);response.end(data);
  });
}).listen(8081,'127.0.0.1',()=>console.log('Prévia do cliente: http://127.0.0.1:8081'));
