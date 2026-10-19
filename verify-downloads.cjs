const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync(__dirname+'/downloads.js','utf8');
const saved=new Map();
function fixture(storage=saved){
 const events={},anchors=[],questions=[];let answer=true;
 const context={URL,Set,JSON,location:{href:'https://example.org/guide/index.html'},sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},window:{confirm:q=>{questions.push(q);return answer;}},MutationObserver:class{observe(){}},document:{body:{},querySelectorAll:()=>anchors,createElement:()=>({}),addEventListener:(name,fn)=>events[name]=fn}};
 vm.runInNewContext(script,context);
 function click(href,download=false,type='click',button=0){const a={href,dataset:{},hasAttribute:n=>n==='download'&&download};let prevented=false;events[type]({target:{closest:()=>a},type,button,defaultPrevented:false,preventDefault(){prevented=true;}});return prevented;}
 return {click,questions,setAnswer:v=>answer=v};
}
let f=fixture();
assert.equal(f.click('https://example.org/guide/data.json',true),false);assert.equal(f.questions.length,0);
f.setAnswer(false);assert.equal(f.click('https://example.org/guide/data.json',true),true);assert.equal(f.questions.length,1);
f.setAnswer(true);assert.equal(f.click('https://example.org/guide/data.json',true),false);
assert.equal(f.click('https://official.org/pamphlet.pdf#page=26'),false);
f.setAnswer(false);assert.equal(f.click('https://official.org/pamphlet.pdf#page=40'),true);
const count=f.questions.length;f.click('https://campaign.org/');f.click('https://campaign.org/');assert.equal(f.questions.length,count);
// Page navigation/reload shares only the existing tab-session storage.
f=fixture();f.setAnswer(false);assert.equal(f.click('https://example.org/guide/data.json',true),true);
// A fresh tab session has no remembered requests.
f=fixture(new Map());f.click('https://example.org/guide/data.json',true);assert.equal(f.questions.length,0);
// Storage blocked by browser privacy settings: request handling still works in memory.
f=fixture({get(){throw Error('blocked');},set(){throw Error('blocked');}});f.click('https://example.org/guide/data.json',true);f.setAnswer(false);assert.equal(f.click('https://example.org/guide/data.json',true),true);
console.log('PASS: first/repeat requests; cancel/accept; same PDF across page fragments; ordinary links; reload persistence; fresh session; blocked storage.');
