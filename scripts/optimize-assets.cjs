const fs = require('node:fs');
const path = require('node:path');
const sharp = require(require.resolve('sharp', {paths:[path.dirname(require.resolve('next/package.json'))]}));
(async()=>{for(const file of ['landscape','map','characters']){await sharp(`assets/deprecated/${file}.png`).webp({quality:88}).toFile(`assets/deprecated/${file}.webp`);console.log(file,fs.statSync(`assets/deprecated/${file}.webp`).size)}})();
