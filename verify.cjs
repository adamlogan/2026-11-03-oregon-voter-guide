const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=require('node:path');const root=__dirname;const D=JSON.parse(fs.readFileSync(path.join(root,'data.json'),'utf8'));
let c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),c);assert.equal(JSON.stringify(c.window.GUIDE),JSON.stringify(D));
const ids=new Set(),E=new Set(D.entities.map(e=>e.id));for(const e of D.entities){assert(e.description);assert(new URL(e.source).protocol==='https:');}
for(const i of D.items){assert(!ids.has(i.id));ids.add(i.id);assert(i.description&&i.raceDescription&&i.source&&i.rosterStatus);assert(new URL(i.source).protocol==='https:');const claims=new Set();for(const c of i.endorsements){assert(E.has(c.entity));assert(!claims.has(c.entity));claims.add(c.entity);assert(['Issuer-confirmed','Campaign-reported'].includes(c.confidence));assert(new URL(c.source).protocol==='https:');assert(c.checked&&c.cycle&&c.position);}}
const controls=Object.fromEntries(['search','geo','level','confidence','entityType','position','cycle','match','only'].map(k=>[k,{value:k==='match'?'any':'',checked:false}]));
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');const setup=app.slice(0,app.indexOf('let opener;'));const funcs=app.slice(app.indexOf('function claimMatches'),app.indexOf('function renderEntities'));
c={window:{GUIDE:D},document:{getElementById:id=>controls[id]}};vm.createContext(c);vm.runInContext(setup+funcs,c);const run=code=>vm.runInContext(code,c);assert.equal(run('filtered().length'),D.items.length);run("selected.add('nfib')");assert(run("filtered().some(i=>i.name==='Christine Drazan')"));run("selected.add('ona')");assert(run('filtered().length')>50);controls.match.value='all';assert(run('filtered().every(i=>i.endorsements.some(c=>c.entity==="nfib")&&i.endorsements.some(c=>c.entity==="ona"))'));run('selected.clear()');controls.match.value='any';controls.search.value='lisa fragala';assert.equal(run('filtered().length'),1);controls.search.value='';controls.level.value='Measures';assert.equal(run('filtered().length'),D.items.filter(i=>i.kind==='Measure').length);controls.position.value='No';assert(run("filtered().some(i=>i.name==='Measure 26-267')"));assert(run("filtered().some(i=>i.name==='Measure 9-185')"));controls.position.value='';controls.level.value='';controls.confidence.value='Campaign-reported';assert(run('filtered().length')>0);controls.confidence.value='';controls.cycle.value='Primary';assert(run('filtered().length')>0);controls.cycle.value='';controls.geo.value='Polk';assert(run("filtered().some(i=>i.name==='Deb Patterson')"));controls.geo.value='';controls.entityType.value='Individual';assert(run('filtered().length')>=20);
for(const f of ['index.html','methodology.html']){const html=fs.readFileSync(path.join(root,f),'utf8');for(const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(!m[1].startsWith('https:'))assert(fs.existsSync(path.join(root,m[1].split(/[?#]/)[0])));}}
console.log('PASS: dataset parity; unique IDs; primary-source links; claim attribution; real filter logic for any/all, search, measures, opposition, campaign sources, stage, geography, individuals; local asset links.');

const merkley=D.items.find(i=>i.name==='Jeff Merkley');assert(merkley.endorsements.length>=21);assert.equal(merkley.endorsements.find(c=>c.entity==='oea').position,'Recommendation to NEA');assert.equal(merkley.endorsements.find(c=>c.entity==='ourrev').cycle,'Primary');controls.entityType.value='';controls.position.value='support';assert(run("filtered().some(i=>i.name==='Jeff Merkley')"));

for(const i of D.items.filter(i=>i.kind==='Candidate')){if(i.campaignUrl){assert(['https:','http:'].includes(new URL(i.campaignUrl).protocol));assert(i.campaignSource&&i.campaignChecked);}}

assert.equal(D.items.filter(i=>i.endorsements.some(c=>c.entity==='olcv')).length,105);assert.equal(D.items.filter(i=>i.endorsements.some(c=>c.entity==='olcv'&&c.confidence!=='Issuer-confirmed')).length,0);

assert.equal(new Set(D.items.filter(i=>/^(hd|sd)\d+$/.test(i.race)).map(i=>i.race)).size,75);
assert.equal(D.items.filter(i=>i.endorsements.some(c=>c.entity==='sierra-or')).length,52);
assert.equal(D.items.filter(i=>i.endorsements.some(c=>c.entity==='nfib')).length,38);
assert.equal(D.items.filter(i=>i.endorsements.some(c=>c.entity==='ag')).length,42);
assert.equal(D.items.filter(i=>i.endorsements.some(c=>c.entity==='fire')).length,57);
assert.equal(D.items.filter(i=>i.name==='Mai Vang').length,0);
assert(D.items.filter(i=>i.ballotpediaUrl).every(i=>!i.ballotpediaUrl.includes('redlink=1')));
const audit=JSON.parse(fs.readFileSync(path.join(root,'source-audit.json'),'utf8'));assert.equal(audit.entities.length,D.entities.length);
for(const e of audit.entities)assert.equal(e.claims,D.items.filter(i=>i.endorsements.some(c=>c.entity===e.id)).length);
console.log('PASS: legislative roster coverage; full Sierra/AG/NFIB/fire lists; withheld roster conflict; real profile links; per-entity audit counts.');

assert(!D.entities.some(e=>e.id==='sierra'));assert(!D.items.some(i=>i.endorsements.some(c=>c.entity==='sierra')));
for(const [id,count] of Object.entries({'sierra-national':5,'sierra-or':52,pp:65,orcops:36,farm:20,ucrp:7}))assert.equal(D.items.filter(i=>i.endorsements.some(c=>c.entity===id)).length,count);
assert.equal(D.entities.find(e=>e.id==='sierra-national').name,'Sierra Club - National');
assert(!D.items.find(i=>i.name==='Val Hoyle').endorsements.some(c=>c.entity==='sierra-national'));
assert(D.items.find(i=>i.name==='Travis Nelson').endorsements.some(c=>c.entity==='pp'&&c.source.endsWith('#page=2')));
assert(!D.items.find(i=>i.name==='Greg Smith').endorsements.some(c=>c.entity==='farm'||c.entity==='agc'));
assert(!D.items.find(i=>i.name==='Thuy Tran').endorsements.some(c=>c.entity==='mother'));
for(const e of D.entities){assert.equal(e.includedClaims,D.items.filter(i=>i.endorsements.some(c=>c.entity===e.id)).length);assert(e.coverageReview);}
for(const i of D.items)for(const claim of i.endorsements)for(const x of claim.additionalSources||[]){assert(new URL(x.source).protocol==='https:');assert(x.confidence&&x.cycle&&x.checked);}
console.log('PASS: full PPAO union, national/chapter Sierra separation, expanded Farm/ORCOPS, historical evidence exclusion, additional evidence, and entity coverage summaries.');
