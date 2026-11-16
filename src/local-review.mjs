import {parseReview} from '../room-server/worker/ai.mjs';
export function parseLocalReview(response,message){
 const content=response?.content;
 const text=(typeof response?.channels?.final==='string'?response.channels.final:typeof content==='string'?content:(Array.isArray(content)?content:[]).filter(x=>typeof x?.text==='string'&&x.channel!=='analysis').map(x=>x.text).join('')).replace(/<think>[\s\S]*?<\/think>/g,'').trim();
 const first=text.indexOf('{'),last=text.lastIndexOf('}');
 const parsed=parseReview(first>=0&&last>first?text.slice(first,last+1):text);
 parsed.clues=parsed.clues.filter(c=>c.quote&&message.toLowerCase().includes(c.quote.toLowerCase()));
 return {...parsed,model:'gemma-4-E2B-it · on device'};
}
