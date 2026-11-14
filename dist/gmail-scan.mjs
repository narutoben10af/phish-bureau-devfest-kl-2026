import {analyze} from './detector.mjs?v=20261114-8';
import {plainEmail,headerValue} from './gmail.mjs?v=20261114-8';
const weights={secrets:3,remote:3,secrecy:3,pressure:2,reward:2,payment:1,link:1};
export function inspectEmail(message){
 const body=plainEmail(message.payload),fullText='Subject: '+headerValue(message,'Subject')+'\n\n'+(body||message.snippet||''),text=fullText.slice(0,24000);
 const findings=analyze(text).findings,score=findings.reduce((sum,f)=>sum+(weights[f.id]||0),0);
 return {flagged:score>=3,score,findings,previewOnly:!body,limited:!body||fullText.length>24000,text:text.slice(0,2000)};
}
// Pages are bounded; only the current message body is held by the scanner.
// The caller retains at most 500 flagged summaries, never a full mailbox copy.
export async function scanMailbox(reader,{query='',includeSpamTrash=false,signal,onProgress=()=>{},onFinding=()=>{}}={}){
 const stats={checked:0,flagged:0,limited:0,estimated:0,complete:false};let pageToken='';const seenPages=new Set();
 const check=()=>{if(signal?.aborted)throw new DOMException('Scan stopped.','AbortError');};
 do{check();const page=await reader.get('messages',{maxResults:'50',q:query,includeSpamTrash:String(includeSpamTrash),fields:'messages(id),nextPageToken,resultSizeEstimate',...(pageToken?{pageToken}:{})},signal);check();stats.estimated=Math.max(stats.estimated,stats.checked+(Number(page.resultSizeEstimate)||0));
 for(const item of page.messages||[]){check();const id=item.id;if(!/^[a-zA-Z0-9_-]{1,128}$/.test(id))throw Error('Gmail returned an invalid message ID.');
 const meta=await reader.get('messages/'+encodeURIComponent(id),{format:'metadata',metadataHeaders:['From','Subject','Date'],fields:'id,snippet,sizeEstimate,payload(headers)'},signal);check();
 let message=meta;let limited=Number(meta.sizeEstimate)>262144;if(!limited){message=await reader.read(id,meta.sizeEstimate,signal);check();}
 const result=inspectEmail(message);if(limited||result.limited)stats.limited++;stats.checked++;
 if(result.flagged){stats.flagged++;await onFinding({id,subject:headerValue(message,'Subject')||'(No subject)',from:headerValue(message,'From'),date:headerValue(message,'Date'),...result,limited:limited||result.limited});}onProgress({...stats});
 }
 pageToken=page.nextPageToken||'';if(pageToken){if(seenPages.has(pageToken))throw Error('Gmail repeated a page. Restart the scan to continue.');seenPages.add(pageToken);}
 }while(pageToken);
 stats.complete=true;onProgress({...stats});return stats;
}
