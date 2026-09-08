const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const generated = require('../data/generated-images.json');
const root = path.resolve(__dirname,'..');
process.chdir(root);
for(const dir of ['brand','products','recipes','institutional','backgrounds']) fs.mkdirSync(`assets/${dir}`,{recursive:true});
// Polygon masks only discard background pixels. Original package printing is not repainted.
const crops = [
 ['feijao-da-mamae-fradinho','pdf-page-3.jpg',[[67,218],[321,210],[307,279],[327,590],[65,600],[77,519],[72,280]]],
 ['feijao-da-mamae-carioca','pdf-page-3.jpg',[[360,210],[609,210],[599,282],[613,591],[348,600],[363,524],[365,277]]],
 ['feijao-da-mamae-preto','pdf-page-3.jpg',[[649,209],[879,219],[868,285],[881,590],[635,590],[649,516],[653,280]]],
 ['feijao-da-mamae-jalo','pdf-page-3.jpg',[[56,679],[280,677],[271,735],[283,988],[54,991],[63,923],[63,739]]],
 ['feijao-da-mamae-vermelho','pdf-page-3.jpg',[[294,680],[505,679],[498,742],[503,987],[292,988],[305,923],[301,742]]],
 ['feijao-da-mamae-rajado-claro','pdf-page-3.jpg',[[518,682],[728,688],[723,743],[730,989],[513,989],[523,924],[524,743]]],
 ['feijao-da-mamae-rajado','pdf-page-3.jpg',[[742,680],[937,680],[929,750],[941,985],[735,990],[747,925],[749,746]]],
 ['feijao-du-chef-preto','pdf-page-4.jpg',[[285,133],[489,137],[481,197],[489,450],[285,453],[295,389],[291,195]]],
 ['feijao-perola-preto','pdf-page-4.jpg',[[724,477],[938,477],[925,519],[940,712],[726,738],[727,689],[736,530]]],
 ['feijao-maravilha','pdf-page-4.jpg',[[555,862],[790,864],[781,927],[786,1138],[550,1142],[562,1075],[561,925]]],
 ['farinha-branca','pdf-page-5.jpg',[[585,94],[773,94],[760,147],[777,372],[569,375],[580,320],[587,146]]],
 ['sal-refinado','pdf-page-5.jpg',[[580,490],[770,492],[761,545],[769,744],[577,748],[586,689],[585,546]]],
 ['sal-grill','pdf-page-5.jpg',[[164,842],[353,840],[342,895],[349,1085],[165,1093],[174,1025],[170,894]]],
 ['polvilho','pdf-page-5.jpg',[[575,858],[771,858],[761,916],[767,1094],[572,1095],[582,1035],[583,911]]]
];
async function saveProduct(id,buf){await sharp(buf).resize(540,630,{fit:'contain',background:'#ffffff00'}).extend({top:35,bottom:35,left:30,right:30,background:'#ffffff00'}).webp({quality:90,alphaQuality:100}).toFile(`assets/products/${id}.webp`);}
async function polygonCrop(id,file,points){const left=Math.min(...points.map(p=>p[0])),top=Math.min(...points.map(p=>p[1]));const width=Math.max(...points.map(p=>p[0]))-left+1,height=Math.max(...points.map(p=>p[1]))-top+1;const polygon=points.map(([x,y])=>`${x-left},${y-top}`).join(' ');const mask=Buffer.from(`<svg width="${width}" height="${height}"><polygon points="${polygon}" fill="white"/></svg>`);const buf=await sharp(file).extract({left,top,width,height}).ensureAlpha().composite([{input:mask,blend:'dest-in'}]).png().toBuffer();await saveProduct(id,buf);}
async function removeFlatBackground(file,id){
 const {data,info}=await sharp(file).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const w=info.width,h=info.height,seen=new Uint8Array(w*h),queue=new Int32Array(w*h);let head=0,tail=0;
 const bg=[data[0],data[1],data[2]];
 const accept=i=>Math.max(...bg.map((v,c)=>Math.abs(data[i*4+c]-v)))<38;
 const push=i=>{if(!seen[i]&&accept(i)){seen[i]=1;queue[tail++]=i;}};
 for(let x=0;x<w;x++){push(x);push((h-1)*w+x);}for(let y=0;y<h;y++){push(y*w);push(y*w+w-1);}
 while(head<tail){const i=queue[head++],x=i%w,y=Math.floor(i/w);data[i*4+3]=0;if(x)push(i-1);if(x<w-1)push(i+1);if(y)push(i-w);if(y<h-1)push(i+w);}
 const buf=await sharp(data,{raw:info}).trim({threshold:15}).png().toBuffer();await saveProduct(id,buf);
}
(async()=>{
 for(const args of crops) await polygonCrop(...args);
 for(const id of ['arroz-da-mamae','arroz-da-mamae-5kg','acucar-cristal-da-mamae','acucar-cristal-da-mamae-2kg','feijao-perola','feijao-xodo','feijao-du-chef','pipoca']) await removeFlatBackground(`produtos/${id}.jpg`,id);
 await polygonCrop('farinha-amarela','pdf-page-5.jpg',[[158,95],[359,95],[348,151],[365,374],[156,375],[170,315],[168,149]]);
 const logo=await sharp('pdf-page-2.jpg').extract({left:276,top:84,width:440,height:370}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 for(let i=0;i<logo.data.length;i+=4){if(!(logo.data[i+1]>logo.data[i]*1.2&&logo.data[i+1]>logo.data[i+2]*1.15))logo.data[i+3]=0;}
 await sharp(logo.data,{raw:logo.info}).webp({lossless:true}).toFile('assets/brand/pr-logo.webp');
 await sharp('empacotamos-sua-marca.png').extract({left:85,top:164,width:490,height:590}).resize(560,620,{fit:'contain',background:'#eeeee5'}).webp({quality:86}).toFile('assets/institutional/empacotadora.webp');
 for(const [key,file] of Object.entries(generated)){
  const name=key==='hero'?'mesa-brasileira':key,dir=key==='hero'?'backgrounds':key==='campo'?'institutional':'recipes';
  for(const width of [640,960,1440])await sharp(file).resize(width,Math.round(width*2/3),{fit:'cover'}).webp({quality:82}).toFile(`assets/${dir}/${name}-${width}.webp`);
 }
 fs.writeFileSync('assets/brand/favicon.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#15392e"/><text x="32" y="41" text-anchor="middle" font-family="Georgia,serif" font-size="27" fill="#f8f6ef">P&amp;R</text></svg>');
 console.log('Prepared 23 original-package images, logo, equipment and responsive editorial photos.');
})();
