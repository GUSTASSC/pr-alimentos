const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8'};
const port = Number(process.env.PORT || 8080);
http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); return res.end('Bad request'); }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const relative = path.relative(root,file);
  if (relative.startsWith('..') || path.isAbsolute(relative) || relative.split(path.sep).some(part=>part.startsWith('.') || part === 'node_modules')) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file,(error,data) => {
    const headers = {'Content-Type':mime[path.extname(file)] || 'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'};
    if(error){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});return res.end(fs.existsSync(path.join(root,'404.html'))?fs.readFileSync(path.join(root,'404.html')):'Página não encontrada');}
    res.writeHead(200,headers);res.end(data);
  });
}).listen(port,'127.0.0.1',()=>console.log(`P&R disponível em http://localhost:${port}`));
