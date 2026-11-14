import {build} from 'esbuild';
import {mkdir,cp,writeFile} from 'node:fs/promises';
await mkdir('dist/vendor/litert-wasm',{recursive:true});
await build({entryPoints:['src/gemma-worker.mjs'],outfile:'dist/vendor/gemma-worker.js',bundle:true,format:'iife',platform:'browser',target:'chrome130',minify:true,legalComments:'eof'});
await cp('node_modules/@litert-lm/core/wasm','dist/vendor/litert-wasm',{recursive:true});
await writeFile('dist/vendor/NOTICE.txt','LiteRT-LM 0.19.0 and wasm-utils 2.6.0, Google / The ODML Authors. Apache-2.0. Source: https://github.com/google-ai-edge/LiteRT-LM and https://github.com/google-ai-edge/LiteRT. Runtime license: https://www.apache.org/licenses/LICENSE-2.0\nGemma 4 E2B weights are downloaded separately from the LiteRT community model repository under Apache-2.0.\n');

await cp('third-party-notices/Apache-2.0.txt','dist/vendor/LICENSE.txt');
