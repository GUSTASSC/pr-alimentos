const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const forVercel = process.argv.includes('--vercel');
const destination = path.join(root, forVercel ? 'vercel-site' : 'preview-public');
fs.mkdirSync(destination, { recursive: true });
const copy = relative => {
  const target = path.join(destination, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(path.join(root, relative), target);
};
for (const file of ['index.html','produtos.html','receitas.html','produto.html','privacidade.html','404.html','styles.css','script.js','legacy-product.js']) copy(file);
for (const folder of ['produtos', 'receitas']) {
  for (const file of fs.readdirSync(path.join(root, folder))) if (file.endsWith('.html')) copy(`${folder}/${file}`);
}
fs.cpSync(path.join(root, 'assets'), path.join(destination, 'assets'), { recursive: true });
if (forVercel) {
  copy('robots.txt');
  if (fs.existsSync(path.join(root,'sitemap.xml'))) copy('sitemap.xml');
  fs.writeFileSync(path.join(destination,'vercel.json'), JSON.stringify({
    '$schema':'https://openapi.vercel.sh/vercel.json',
    framework:null,buildCommand:null,installCommand:null,outputDirectory:'.',
    headers:[{source:'/(.*)',headers:[{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'}]}]
  },null,2));
} else fs.writeFileSync(path.join(destination, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log(`Site preparado em ${path.basename(destination)}, sem arquivos internos ou materiais originais.`);
