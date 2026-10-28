'use strict';
const assert=require('node:assert/strict');
const EventEmitter=require('node:events');
const Module=require('node:module');
const original=Module._load;
class FakeWSS extends EventEmitter {constructor(){super();this.clients=[];}close(){}}
Module._load=function(name,...rest){if(name==='ws')return {WebSocketServer:FakeWSS,WebSocket:{OPEN:1}};return original.call(this,name,...rest)};
const app=require('./server.js'); Module._load=original;
class FakeWS extends EventEmitter {
 constructor(){super();this.readyState=1;this.messages=[];this.roomKey=null;this.pid=null;}
 send(value){this.messages.push(JSON.parse(value))}
 close(){this.readyState=3;this.emit('close')}
 act(obj){this.emit('message',JSON.stringify(obj))}
 last(type){return [...this.messages].reverse().find(x=>x.type===type)}
}
const p=[];
for(let i=0;i<4;i++){
 const ws=new FakeWS();app.wss.emit('connection',ws,{socket:{remoteAddress:`127.0.0.${i+1}`}});
 ws.act({type:'join',name:`Guest${i+1}`,phrase:'fourplayers',character:i+6});
 assert(ws.last('joined')?.token);
 assert.equal(ws.last('state').players.length,i+1);
 p.push(ws);
}
assert.equal(app.rooms.size,1);
assert.equal(p[0].last('state').players[0].character,6);
assert.equal(p[0].last('state').players[3].character,9);
const coinsBefore=p[0].last('state').players[0].coins;
p[0].act({type:'action',action:'gift',gift:'rose',target:p[1].pid});
assert.equal(p[1].last('state').stage[0].gift,'rose');
assert.equal(p[1].last('state').stage[0].from,p[0].pid);
assert.equal(p[0].last('state').players[0].coins,coinsBefore);
p[0].act({type:'action',action:'character',character:18});
assert.equal(p[1].last('state').players[0].character,18);
p[0].act({type:'action',action:'character',character:200});
assert.equal(p[0].last('error').key,'badAction');

const room=[...app.rooms.values()][0], action=(ws,name,more={})=>ws.act({type:'action',action:name,...more});
function checkNoErrors(ws){assert.notEqual(ws.messages.at(-1)?.type,'error',JSON.stringify(ws.messages.at(-1)));}
// Mahjong: exactly four seats and sequential turns; hands are private.
action(p[0],'startMahjong',{glass:true});checkNoErrors(p[0]);
let s=room.session;assert.equal(s.type,'mahjong');assert.equal(s.hands[p[0].pid].length,14);
assert.equal(s.hands[p[1].pid].length,13);
assert.equal(p[1].last('state').session.players[0].hand.length,14);
assert(p[1].last('state').session.players[0].hand.some(x=>x===null));
action(p[0],'discard',{tile:s.hands[p[0].pid][0]});checkNoErrors(p[0]);
assert.equal(s.turn,1);assert.equal(s.hands[p[1].pid].length,14);
// Configure Oicho, duel and choose.
action(p[0],'config',{game:'oicho',stake:20});
action(p[0],'startOi',{challenger:p[0].pid,opponent:p[1].pid});checkNoErrors(p[0]);
s=room.session;assert.equal(s.pot,40);
action(p[0],'oiChoice',{hit:true});action(p[1],'oiChoice',{hit:false});
assert(['tie','ended'].includes(s.phase));
if(s.phase==='tie'){action(p[0],'oiRematch');action(p[1],'oiRematch');assert.equal(s.pot,80);assert.equal(s.phase,'playing');}
// 51 Poker; each player can stand, server settles.
action(p[0],'config',{game:'fiftyone',stake:10});action(p[0],'start51');checkNoErrors(p[0]);
s=room.session;assert.equal(s.participants.length,4);
for(const x of p)action(x,'choice51',{hit:false});
assert.equal(s.phase,'ended');assert.equal(s.result.ranking.length,4);
// Roulette player bets and roulette starts. Stop timing affects result.
action(p[0],'config',{game:'roulette',stake:10});action(p[0],'rouletteBet',{pick:'red'});
action(p[1],'rouletteBet',{pick:'black'});action(p[0],'rouletteSpin');
s=room.session;assert.equal(s.phase,'spinning');s.start=Date.now()-1500;
action(p[2],'rouletteStop');checkNoErrors(p[2]);assert.equal(s.phase,'ended');assert(s.result>=0&&s.result<=12);
action(p[0],'diceRisk');assert.equal(typeof s.dice[p[0].pid].die,'number');
// Slots shopping and receipt matching.
action(p[0],'config',{game:'slots',stake:10});action(p[0],'shop',{cost:111});checkNoErrors(p[0]);
s=room.session;assert.equal(s.receipts[p[0].pid].target,'111');
action(p[0],'slotSpin');assert.equal(s.spins[p[0].pid].reels.length,3);
// Nickname uniqueness, max room capacity and account-free joining.
const extra=new FakeWS();app.wss.emit('connection',extra,{socket:{remoteAddress:'127.0.0.22'}});
extra.act({type:'join',name:'Guest1',phrase:'fourplayers'});assert.equal(extra.last('error').key,'roomFull');
// English/CJK strings should be accepted, controls are not.
const other=new FakeWS();app.wss.emit('connection',other,{socket:{remoteAddress:'127.0.0.23'}});
other.act({type:'join',name:'月影🌙',phrase:'一緒に遊ぶ2026'});assert.equal(other.last('state').players[0].name,'月影🌙');
// Access-control: guests cannot choose another game.
action(p[1],'config',{game:'oicho',stake:10});assert.equal(p[1].last('error').key,'notHost');
// Disconnect switches host to an online user (after server patch).
p[0].close();assert.equal(room.host,p[1].pid);
for(const x of p.slice(1))x.close();other.close();extra.close();
app.stop();console.log('✓ Character selection, fan gift sync, no-paid-gifts; Join, 4-player team mahjong, Oicho duel, 51 poker, roulette dice, shops+slots, privacy, access control');
