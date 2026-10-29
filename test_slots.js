'use strict';
const assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const C=require('./public/slots.js');
assert.equal(new Set(C.symbols).size,14);assert.deepEqual(C.target('109'),['A','10','9']);
assert.throws(()=>C.evaluate(['A'],'111'));assert.throws(()=>C.target('abc'));
for(const a of C.symbols)for(const b of C.symbols)for(const c of C.symbols){
 const grid=[a,b,c,'K','Q','J','10','9','8'];const r=C.evaluate(grid,'123');
 const expected=a==='A'&&b==='2'&&c==='3'?5:a===b&&b===c?3:new Set([a,b,c]).size===2?1:a==='A'?.25:0;
 assert.equal(r.wins.find(w=>w.line===0)?.multi||0,expected);
 assert.equal(r.multi,r.wins.reduce((sum,w)=>sum+w.multi,0));
}
assert.equal(C.evaluate(Array(9).fill('A'),'111').multi,40);
assert.equal(C.evaluate(Array(9).fill('★'),'111').multi,24);
assert(C.summary({multi:.25},10,'ja').includes('配当: 2'));
assert(C.summary({multi:.25},10,'ja').includes('収支: -8'));
for(const lang of ['ja','en','zh','ko'])assert(C.rules(lang).length>30);
for(let line=0;line<8;line++){let grid=Array(9).fill('K');C.lines[line].forEach((cell,i)=>grid[cell]=['A','2','3'][i]);assert.equal(C.evaluate(grid,'123').wins.find(w=>w.line===line).kind,'receipt')}
let seen=[];assert.deepEqual(C.draw(n=>{seen.push(n);return 13}),Array(9).fill('★'));assert(seen.every(n=>n===14));
// Compile every inline solo script, including the existing extensions.
const html=fs.readFileSync('public/solo.html','utf8');for(const m of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
const setup=html.match(/Object.keys\(DICT\).forEach\(k=>\{DICT\[k\].rules\[4\][^\n]+/)[0];
const dict={ja:{rules:[],tutorials:[]},en:{rules:[],tutorials:[]},zh:{rules:[],tutorials:[]},ko:{rules:[],tutorials:[]}};vm.runInNewContext(setup,{DICT:dict,CardSlots:C});for(const d of Object.values(dict)){assert(Array.isArray(d.rules[4]));assert(Array.isArray(d.tutorials[4]))}
// Exercise actual solo spin/stop functions with a controlled timer and wallet.
const code=html.slice(html.indexOf('function slotState()'),html.indexOf('function renderSlots()'));
let paid=0,taken=0;const ctx={CardSlots:C,slots:null,bet:20,mode:'slots',slotsTimer:null,Math,Date,DICT:{ja:{}},lang:'ja',notice:{},SHOP_PRICES:[],note(){},renderStage(){},renderStatus(){},take(){taken++;return true},pay(n){paid+=n},setInterval(){return 1},clearInterval(){},$:()=>null};vm.createContext(ctx);vm.runInContext(code,ctx);
ctx.startSlots();assert.equal(taken,0);ctx.slotState().total=111;ctx.startSlots();ctx.startSlots();assert.equal(taken,1);ctx.slots.digits=Array(9).fill('A');ctx.bet=200;
ctx.stopSlotDigit();ctx.stopSlotDigit();assert.equal(paid,0);ctx.stopSlotDigit();ctx.stopSlotDigit();assert.equal(paid,800);assert.equal(ctx.slots.running,false);
console.log('✓ 2744 line combinations, eight directions, joker, validation, solo wallet/stops, script syntax');
