const {chromium}=require('@playwright/test');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:8080');await page.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));await document.fonts.ready;});
 fs.mkdirSync('tmp/review',{recursive:true});
 await page.screenshot({path:'tmp/review/home-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'tmp/review/home-mobile.png',fullPage:true});
 console.log(JSON.stringify({title:await page.title(),errors,overflow:await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth})),images:await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src))}));
 await browser.close();
})();
