export class LocalGemma{
 constructor(workerFactory=()=>new Worker(new URL('./vendor/gemma-worker.js',import.meta.url))){this.workerFactory=workerFactory;this.worker=null;this.ready=false;this.seq=0;this.pending=new Map();}
 ensureWorker(){if(this.worker)return;this.worker=this.workerFactory();this.worker.onmessage=({data})=>{const job=this.pending.get(data.id);if(!job)return;if(data.type==='progress'){job.progress?.(data);return;}this.pending.delete(data.id);job.cleanup();if(data.type==='error')job.reject(Error(data.error));else job.resolve(data.result);};this.worker.onerror=()=>this.terminate('Gemma runtime stopped. Reload the model to retry.');}
 request(type,message,{signal,onProgress}={}){if(signal?.aborted)return Promise.reject(new DOMException('Stopped.','AbortError'));this.ensureWorker();const id=++this.seq;return new Promise((resolve,reject)=>{const abort=()=>{this.worker?.postMessage({type:'cancel'});this.terminate('Gemma stopped. Prepare it again to continue.');};const cleanup=()=>signal?.removeEventListener('abort',abort);this.pending.set(id,{resolve,reject,cleanup,progress:onProgress});signal?.addEventListener('abort',abort,{once:true});this.worker.postMessage({id,type,message});});}
 async load(options){await this.request('load',undefined,options);this.ready=true;}
 async review(message,signal){if(!this.ready)throw Error('Prepare Gemma on this device first.');return this.request('review',message,{signal});}
 terminate(reason='Gemma unloaded.'){this.worker?.terminate();this.worker=null;this.ready=false;for(const job of this.pending.values()){job.cleanup();job.reject(Error(reason));}this.pending.clear();}
 async clear(){this.terminate();await this.request('clear');this.terminate();}
}
