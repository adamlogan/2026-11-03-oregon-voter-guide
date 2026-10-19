'use strict';
// Requests are remembered only for the current browser session, never in cookies.
(() => {
 const key='oregon-guide:file-requests:v2';
 let requested=new Map();
 try {const saved=JSON.parse(sessionStorage.getItem(key)||'[]');if(Array.isArray(saved))requested=new Map(saved.filter(v=>Array.isArray(v)&&typeof v[0]==='string'));} catch {}
 function metadata(a){
  const url=new URL(a.href,location.href),path=url.pathname;
  const direct=a.hasAttribute('download');
  const pdf=/\.pdf(?:\/download)?$/i.test(path)||/\/DocumentCenter\/View\//i.test(path)||url.hostname==='docs.clackamas.us';
  if(!direct&&!pdf&&!/\.(zip|csv|xlsx?|docx?|pptx?)$/i.test(path)&&!/\/download$/i.test(path))return null;
  const parts=decodeURIComponent(path).split('/').filter(Boolean);
  const clean=new URL(url.href);clean.hash='';const known=(window.GUIDE_DOCUMENTS||{})[clean.href]||{};
  const filename=a.dataset.filename||known.filename||(/\.[a-z0-9]{2,5}$/i.test(parts.at(-1)||'')?parts.at(-1):parts.at(-1)==='download'&&/\.[a-z0-9]{2,5}$/i.test(parts.at(-2)||'')?parts.at(-2):'Filename supplied by the source');
  const state=/VP_G26-Book([\da-z]+)_web\.pdf/i.exec(path);
  const title=a.dataset.documentTitle||known.title||(state?`Oregon 2026 voters’ pamphlet, book ${state[1]}`:filename==='data.json'?'Endorsement guide data':pdf?'Election source document (PDF)':'Source file');
  const page=/^#page=(\d+)/i.exec(url.hash);
  url.hash='';return {url:url.href,filename,title,page:page?.[1],direct,pdf};
 }
 function label(a){
  const m=metadata(a);if(!m||a.dataset.fileLabel)return;
  a.dataset.fileLabel='true';
  const note=document.createElement('span');note.className='file-note';
  note.textContent=` — ${m.title}; ${m.filename}${m.page?`; PDF page ${m.page}`:''} (${m.direct?'direct download':'opens or downloads'})`;
  a.append(note);
 }
 function annotate(root){if(root.matches?.('a[href]'))label(root);root.querySelectorAll?.('a[href]').forEach(label);}
 annotate(document);
 new MutationObserver(records=>{for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1)annotate(n);}).observe(document.body,{childList:true,subtree:true});
 function request(e){
  if(e.defaultPrevented||(e.type==='auxclick'&&e.button!==1))return;
  const a=e.target.closest?.('a[href]');if(!a)return;
  const m=metadata(a);if(!m)return;
  const previous=requested.get(m.url);
  if(previous&&!window.confirm(`You already opened or requested “${previous.filename}” (${previous.title}) during this visit. ${m.direct?'Download it':'Open or download it'} again?`)){e.preventDefault();return;}
  requested.set(m.url,{filename:m.filename,title:m.title});
  try {sessionStorage.setItem(key,JSON.stringify([...requested]));}catch{}
 }
 document.addEventListener('click',request);
 document.addEventListener('auxclick',request);
})();
