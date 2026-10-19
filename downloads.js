'use strict';
// Only file-link requests are remembered, in this tab's sessionStorage.
(() => {
 const key='oregon-guide:file-requests:v1';
 let requested=new Set();
 try {const saved=JSON.parse(sessionStorage.getItem(key)||'[]');if(Array.isArray(saved))requested=new Set(saved.filter(v=>typeof v==='string'));} catch {}
 function fileType(a){
  if(a.hasAttribute('download'))return 'download';
  const path=new URL(a.href,location.href).pathname;
  if(/\.pdf(?:\/download)?$/i.test(path)||/\/DocumentCenter\/View\//i.test(path)||new URL(a.href,location.href).hostname==='docs.clackamas.us')return 'pdf';
  if(/\.(zip|csv|xlsx?|docx?|pptx?)$/i.test(path)||/\/download$/i.test(path))return 'file';
  return '';
 }
 function label(a){
  const type=fileType(a);if(!type||a.dataset.fileLabel)return;
  a.dataset.fileLabel='true';
  const note=document.createElement('span');note.className='file-note';
  note.textContent=type==='download'?' (direct download)':type==='pdf'?' (PDF — opens or downloads)':' (file — opens or downloads)';
  a.append(note);
 }
 function annotate(root){if(root.matches?.('a[href]'))label(root);root.querySelectorAll?.('a[href]').forEach(label);}
 annotate(document);
 new MutationObserver(records=>{for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1)annotate(n);}).observe(document.body,{childList:true,subtree:true});
 function request(e){
  if(e.defaultPrevented||(e.type==='auxclick'&&e.button!==1))return;
  const a=e.target.closest?.('a[href]');if(!a)return;
  const type=fileType(a);if(!type)return;
  const url=new URL(a.href,location.href);url.hash='';
  if(requested.has(url.href)&&!window.confirm(type==='download'?'You already requested this file in this tab session. Download it again?':'You already opened or requested this file in this tab session. Open or download it again?')){e.preventDefault();return;}
  requested.add(url.href);
  try {sessionStorage.setItem(key,JSON.stringify([...requested]));}catch{}
 }
 document.addEventListener('click',request);
 document.addEventListener('auxclick',request);
})();
