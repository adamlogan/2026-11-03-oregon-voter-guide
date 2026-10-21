const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync(__dirname+'/downloads.js','utf8');
const saved=new Map();
function fixture(storage=saved,documents={},initialAnchors=[]){
 const events={},anchors=initialAnchors,questions=[];let answer=true;
 const context={URL,Set,JSON,location:{href:'https://example.org/guide/index.html'},sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},window:{GUIDE_DOCUMENTS:documents,confirm:q=>{questions.push(q);return answer;}},MutationObserver:class{observe(){}},document:{body:{},querySelectorAll:()=>anchors,createElement:()=>({}),addEventListener:(name,fn)=>events[name]=fn}};
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
// The repeat prompt identifies the original URL filename and uses plain language.
f=fixture(new Map());f.click('https://official.org/Original%20Voter%20Guide.pdf#page=2');f.click('https://official.org/Original%20Voter%20Guide.pdf#page=9');assert(f.questions[0].includes('Original Voter Guide.pdf'));assert(f.questions[0].includes('during this visit'));assert(!f.questions[0].includes('tab session'));
console.log('PASS: original filename interpolation and plain-language repeat prompt.');

f=fixture(new Map(),{'https://official.org/DocumentCenter/View/12':{filename:'Original-county-guide.pdf',title:'County voters’ pamphlet'}});f.click('https://official.org/DocumentCenter/View/12#page=10');f.click('https://official.org/DocumentCenter/View/12#page=11');assert(f.questions[0].includes('Original-county-guide.pdf'));assert(f.questions[0].includes('County voters’ pamphlet'));console.log('PASS: catalog filename and document title preserved in repeat prompt.');

// File notes remain part of the link text, including links with hidden publisher context.
const notes=[];const annotated={href:'https://official.org/Original%20Voter%20Guide.pdf#page=7',dataset:{},hasAttribute:()=>false,append:n=>notes.push(n.textContent)};
fixture(new Map(),{},[annotated]);assert.equal(notes.length,1);assert(notes[0].includes('Original Voter Guide.pdf'));assert(notes[0].includes('PDF page 7'));assert(notes[0].includes('opens or downloads'));
console.log('PASS: initial link annotation preserves filename, PDF page and file behavior for accessible link text.');
