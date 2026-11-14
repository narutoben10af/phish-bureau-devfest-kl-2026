import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const bank=readFileSync('shared/cases.mjs','utf8').replaceAll('export ','');
const server=readFileSync('worker/index.js','utf8').replace(/^import .*?;\n/,'');
mkdirSync('dist/server',{recursive:true});
writeFileSync('dist/server/index.js',bank+'\n'+server);
