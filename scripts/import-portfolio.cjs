const fs=require('node:fs');const path=require('node:path');const sharp=require(require.resolve('sharp',{paths:[path.dirname(require.resolve('next/package.json'))]}));
const source=process.argv[2];
if(!source)throw new Error("Provide the original portfolio file path as the first argument.");
const crops={
 'valley':{left:4,top:7310,width:1906,height:700},
 'cloud-palace':{left:4,top:8036,width:1906,height:630},
 'coast':{left:4,top:6605,width:1906,height:685},
 'wuyin':{left:0,top:2752,width:1914,height:510},
 'relic':{left:965,top:6087,width:944,height:496},
 'journey':{left:965,top:5654,width:944,height:414},
 'guyuan':{left:16,top:4125,width:335,height:443},
 'liurumian':{left:10,top:4609,width:340,height:447},
 'guyuan-sheet':{left:3,top:4116,width:949,height:456},
 'liurumian-sheet':{left:3,top:4604,width:949,height:457},
 'character-lineup':{left:0,top:3408,width:954,height:681},
 'character-study':{left:964,top:3940,width:945,height:630},
 'red-warrior-sheet':{left:5,top:5567,width:948,height:501},
 'guardian-sheet':{left:4,top:6094,width:948,height:487},
 'guardian':{left:25,top:6140,width:485,height:325},
 'lantern':{left:55,top:5920,width:160,height:143},
 'lantern-study':{left:45,top:5920,width:370,height:143},
 'props':{left:966,top:5087,width:942,height:559},
};
(async()=>{fs.mkdirSync('public/art/portfolio',{recursive:true});for(const [name,rect] of Object.entries(crops)){await sharp(source).extract(rect).webp({quality:94}).toFile(`public/art/portfolio/${name}.webp`)}fs.writeFileSync('assets/portfolio-crops.json',JSON.stringify({source,width:1914,height:8672,method:'Lossless source selection, WebP export; no generation, redraw or recoloring.',crops},null,2));console.log(`${Object.keys(crops).length} source crops exported`);})();

