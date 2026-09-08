const { chromium } = require('@playwright/test');
const fs = require('node:fs');
const origin = require('../data/company.json').siteUrl;
(async () => {
  const browser = await chromium.launch({ channel:'chrome',headless:true });
  try {
    const context = await browser.newContext({viewport:{width:390,height:844}});
    const page = await context.newPage();
    const results = [];
    const errors = [];
    page.on('pageerror',e=>errors.push(e.message));
    for (const route of ['/', '/produtos.html', '/produtos/feijao-da-mamae-carioca.html', '/receitas/feijao-tropeiro.html']) {
      const response = await page.goto(origin+route,{waitUntil:'networkidle',timeout:60000});
      await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
      const result = await page.evaluate(()=>({title:document.title,canonical:document.querySelector('link[rel=canonical]')?.href,brokenImages:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),overflow:document.documentElement.scrollWidth>innerWidth}));
      results.push({route,status:response.status(),...result});
    }
    const report = {origin,unauthenticated:true,pages:results,errors};
    fs.writeFileSync('docs/vercel-check.json',JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
    if(errors.length || results.some(r=>r.status!==200||!r.title.includes('P&R')||!r.canonical||r.brokenImages.length||r.overflow))process.exitCode=1;
  } finally { await browser.close(); }
})().catch(e=>{console.error(e.message);process.exitCode=1;});
