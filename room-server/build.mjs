import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const bank=readFileSync('shared/cases.mjs','utf8').replaceAll('export ','');
const ai=readFileSync('worker/ai.mjs','utf8').replaceAll('export ','');
const server=readFileSync('worker/index.js','utf8').replace(/^import .*?;\n/gm,'');
mkdirSync('dist/server',{recursive:true});
writeFileSync('dist/server/index.js',bank+'\n'+ai+'\n'+server);
