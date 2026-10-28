'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { WebSocketServer, WebSocket } = require('ws');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'public');
const rooms = new Map();
const GAME_TYPES = new Set(['mahjong', 'oicho', 'fiftyone', 'roulette', 'slots']);
const MAX_ROOMS = 300;
const COIN_START = 1000;
const STAKES = [10, 20, 50, 100, 200];
const GIFT_TYPES = new Set(['heart','rose','star','bouquet','light']);
const validCharacter = v => Number.isInteger(v) && v>=1 && v<=20;
const rnd = n => crypto.randomInt(n);
const uid = () => crypto.randomBytes(12).toString('hex');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const clampName = v => typeof v === 'string' ? v.trim().replace(/[<>\\\u0000-\u001f\u007f]/g, '').slice(0, 20) : '';
const validCode = v => typeof v === 'string' && v.trim().length >= 4 && v.trim().length <= 40 && !/[\u0000-\u001f]/.test(v);
const shuffle = arr => { for (let i = arr.length - 1; i > 0; i--) { const j = rnd(i + 1); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; };
const send = (ws, obj) => { if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj)); };
const tell = (ws, key, params = {}) => send(ws, { type: 'error', key, params });
function stage(room, kind, data={}) {
 if (!room.stage) room.stage=[];
 room.stage.unshift({ id:uid(), kind, at:Date.now(), ...data });
 room.stage.length=Math.min(room.stage.length,12);
}
function log(room, key, params = {}) {
 room.log.unshift({ key, params, at: Date.now() }); room.log.length = Math.min(room.log.length, 12);
 const eventKinds={mahjongStarted:'start',mahjongWon:'win',oichoStart:'start',oichoWon:'win',oichoTie:'tie',fiftyoneStarted:'start',fiftyoneResult:'win',wheelStarted:'start',wheelStopped:'wheel',slotResult:'slot',diceResult:'dice'};
 if (eventKinds[key]) {
  const who=room.players.find(x=>x.name===params.name || (params.names&&params.names.split(' / ').includes(x.name)))||null;
  stage(room,eventKinds[key],{from:who?.id||null, key, params});
  if (eventKinds[key]==='win' && who) {
    const types=['heart','rose','star','bouquet','light'];
    stage(room,'gift',{from:null,target:who.id,gift:types[rnd(types.length)],fan:true});
  }
 }
}
function dealCards(n = 40) { return shuffle(Array.from({length: n}, (_, i) => i)); }
function mahjongWall() { return shuffle(Array.from({length: 136},(_,i)=>Math.floor(i/4))); }
// 34 tile ids, 0-8 characters, 9-17 bamboo, 18-26 dots, 27-33 honors.
function isWin(tiles) {
  if (tiles.length !== 14) return false;
  const a = Array(34).fill(0); for(const t of tiles) { if(t<0||t>33)return false; a[t]++; }
  if(a.every(x => x===0||x===2) && a.filter(x=>x===2).length===7) return true;
  const yaochu = [0,8,9,17,18,26,27,28,29,30,31,32,33];
  if(yaochu.every(i=>a[i]>=1) && yaochu.some(i=>a[i]===2)) return true;
  function melds() {
    let i=a.findIndex(v=>v); if(i===-1)return true;
    if(a[i]>=3){a[i]-=3;if(melds())return a[i]+=3,true;a[i]+=3;}
    if(i<27 && i%9<7 && a[i+1]>0 && a[i+2]>0){ a[i]--;a[i+1]--;a[i+2]--; if(melds()){a[i]++;a[i+1]++;a[i+2]++;return true;} a[i]++;a[i+1]++;a[i+2]++; }
    return false;
  }
  for(let i=0;i<34;i++)if(a[i]>=2){a[i]-=2;if(melds())return true;a[i]+=2;}
  return false;
}
function pokerRank(cards) {
  function evaluate(five) {
    const nums=five.map(c=>c%13+1), suits=five.map(c=>Math.floor(c/13));
    const counts={};nums.forEach(v=>counts[v]=(counts[v]||0)+1);
    const groups=Object.values(counts).sort((a,b)=>b-a);
    const unique=new Set(nums);if(unique.has(1))unique.add(14);
    const straight=[1,2,3,4,5,6,7,8,9,10].some(start=>[0,1,2,3,4].every(offset=>unique.has(start+offset)));
    const flush=five.length===5&&suits.every(v=>v===suits[0]);
    if(straight&&flush)return 8;
    if(groups[0]===4)return 7;
    if(groups[0]===3&&groups[1]===2)return 6;
    if(flush)return 5;
    if(straight)return 4;
    if(groups[0]===3)return 3;
    if(groups[0]===2&&groups[1]===2)return 2;
    if(groups[0]===2)return 1;
    return 0;
  }
  if(cards.length<=5)return evaluate(cards);
  let best=0;
  function choose(from,hand){if(hand.length===5){best=Math.max(best,evaluate(hand));return;}
    for(let i=from;i<=cards.length-(5-hand.length);i++)choose(i+1,[...hand,cards[i]]);
  }
  choose(0,[]);return best;
}
function score51(cards) {
  const base = cards.reduce((sum,c)=>sum+(c%13+1>10?10:(c%13+1)===1?1:c%13+1),0);
  const aces=cards.filter(c=>c%13===0).length;
  let best=base;
  for(let i=0;i<=aces;i++) if(base+i*10<=51)best=base+i*10;
  return {points:best, bust:base>51, rank:pokerRank(cards)};
}
const online = p => p && p.ws && p.ws.readyState===WebSocket.OPEN;
const active = room => room.players.filter(online);
const requirePlayer = (ws) => {
  const room = rooms.get(ws.roomKey); const p=room?.players.find(x=>x.id===ws.pid);
  return {room,p};
};
function publicSession(room, p) {
  const s = room.session; if(!s) return null;
  const common={type:s.type, phase:s.phase, stake:s.stake};
  if(s.type==='mahjong') {
    return {...common, turn:s.turn, wall:s.wall.length, discards:s.discards, glass:s.glass, players:s.order.map((id,i)=>{
      const x=room.players.find(p=>p.id===id);
      const h=s.hands[id]||[];
      const exposed=id===p.id || (s.order.indexOf(p.id)%2===i%2);
      return {id, name:x?.name, seat:i, team:i%2, count:h.length, hand:exposed?h:(s.glass?h.map((t,j)=>s.reveals[id]?.[j]?t:null):h.map(()=>null)), discard:s.discards[id]||[]};
    }), canTsumo:s.phase==='playing' && s.order[s.turn]===p.id && isWin(s.hands[p.id]||[]), winner:s.winner||null};
  }
  if(s.type==='oicho') return {...common, challenger:s.challenger, opponent:s.opponent, pot:s.pot, rounds:s.rounds, ready:s.ready||{}, choices:s.choices||{}, hands:Object.fromEntries([s.challenger,s.opponent].map(id=>[id,(id===p.id||s.phase!=='playing')?s.hands[id]:{count:s.hands[id]?.length||0}])), outcome:s.outcome||null};
  if(s.type==='fiftyone') return {...common, participants:s.participants, status:s.status, hands:Object.fromEntries(s.participants.map(id=>[id,id===p.id||s.phase==='ended'?s.hands[id]:{count:s.hands[id].length}])), result:s.result||null};
  if(s.type==='roulette') return {...common, bets:s.bets, start:s.start||0, velocity:s.velocity||0, offset:s.offset||0, result:s.result, stoppedBy:s.stoppedBy||null, dice:s.dice||{}};
  if(s.type==='slots') return {...common, receipts:s.receipts, spins:s.spins||{}};
  return common;
}
function broadcast(room) {
  for (const p of room.players) if(online(p)) send(p.ws,{type:'state',me:p.id,host:room.host,game:room.game,stake:room.stake,players:room.players.map(x=>({id:x.id,name:x.name,connected:!!online(x),coins:x.coins,character:x.character||1})),session:publicSession(room,p),log:room.log,stage:room.stage||[]});
}
function resetSession(room) { if(room.session && room.session.phase==='playing' || room.session?.phase==='spinning' || room.session?.phase==='tie') {
  const s=room.session;
  if(s.type==='mahjong') s.order.forEach(id=>{ const p=room.players.find(x=>x.id===id); if(p) p.coins+=s.stake; });
  if(s.type==='oicho') { for(const id of [s.challenger,s.opponent]){ const p=room.players.find(x=>x.id===id); if(p)p.coins+=Math.floor(s.pot/2); } }
  if(s.type==='fiftyone') s.participants.forEach(id=>{const p=room.players.find(x=>x.id===id); if(p)p.coins+=s.stake;});
  if(s.type==='roulette') Object.entries(s.bets).forEach(([id,b])=>{const p=room.players.find(x=>x.id===id); if(p)p.coins+=b.stake;});
  }
  room.session=null;
}
function startMahjong(room, glass) {
  const ps=active(room); if(ps.length!==4 || room.players.length!==4)throw Error('needFour');
  if(ps.some(p=>p.coins<room.stake))throw Error('coinsLow');
  const order=room.players.map(p=>p.id), wall=mahjongWall(),hands={},discards={},reveals={};
  for(const p of ps){p.coins-=room.stake;hands[p.id]=wall.splice(0,13).sort((a,b)=>a-b);discards[p.id]=[];reveals[p.id]=hands[p.id].map(()=>rnd(4)!==0);}
  const s={type:'mahjong',phase:'playing',stake:room.stake,glass:!!glass,order,wall,hands,discards,reveals,turn:0,winner:null};
  room.session=s;
  drawMahjong(s);
  log(room,'mahjongStarted');
}
function drawMahjong(s) {
  if (!s.wall.length) return false;
  const id=s.order[s.turn];s.hands[id].push(s.wall.pop());s.hands[id].sort((a,b)=>a-b);
  s.reveals[id]=s.hands[id].map(()=>rnd(4)!==0);
  return true;
}
function settleMahjong(room, winnerId, method) {
  const s=room.session; s.phase='ended';s.winner={id:winnerId,method};
  const idx=s.order.indexOf(winnerId);let winnerTeam=idx%2;
  for(let i=0;i<4;i++) if(i%2===winnerTeam)room.players.find(p=>p.id===s.order[i]).coins+=s.stake*2;
  log(room,'mahjongWon',{name:room.players.find(p=>p.id===winnerId).name,method});
}
function discardMahjong(room,p,tile) {
  const s=room.session;
  if(!s||s.type!=='mahjong'||s.phase!=='playing')throw Error('notPlaying');
  if(s.order[s.turn]!==p.id) throw Error('notTurn');
  const i=s.hands[p.id].indexOf(tile);if(i<0)throw Error('invalidTile');
  s.hands[p.id].splice(i,1); s.discards[p.id].push(tile); s.reveals[p.id]=s.hands[p.id].map(()=>rnd(4)!==0);
  for(let k=1;k<4;k++) {const opponent=(s.turn+k)%4;if(opponent%2!==s.turn%2 && isWin([...s.hands[s.order[opponent]],tile])){ settleMahjong(room,s.order[opponent],'ron');return; }}
  s.turn=(s.turn+1)%4;
  if(!drawMahjong(s)) {s.phase='ended';s.winner=null;for(let j=0;j<4;j++)room.players.find(p=>p.id===s.order[j]).coins+=s.stake;log(room,'mahjongDraw');}
}
function makeDeck() {return shuffle(Array.from({length:52},(_,i)=>i));}
function oiDeal(s) { const deck=shuffle(Array.from({length:40},(_,i)=>i%10+1));s.deck=deck;s.hands={[s.challenger]:[deck.pop(),deck.pop()],[s.opponent]:[deck.pop(),deck.pop()]};s.choices={};s.ready={};s.phase='playing';s.outcome=null; }
function startOi(room,challenger,opponent) {
 const a=room.players.find(p=>p.id===challenger), b=room.players.find(p=>p.id===opponent);
 if(!a||!b||a===b||!online(a)||!online(b))throw Error('chooseTwo');
 if(a.coins<room.stake||b.coins<room.stake)throw Error('coinsLow');
 a.coins-=room.stake;b.coins-=room.stake;
 const s={type:'oicho',phase:'playing',challenger,opponent,pot:room.stake*2,rounds:1,stake:room.stake};room.session=s;oiDeal(s);log(room,'oichoStart',{a:a.name,b:b.name});
}
function oiChoice(room,p,hit) {
 const s=room.session;if(!s||s.type!=='oicho'||s.phase!=='playing'||![s.challenger,s.opponent].includes(p.id))throw Error('notPlaying');
 if(s.choices[p.id])throw Error('alreadyChosen');
 if(hit)s.hands[p.id].push(s.deck.pop());s.choices[p.id]=true;
 if(s.choices[s.challenger]&&s.choices[s.opponent]){
   const a=s.hands[s.challenger].reduce((x,y)=>x+y,0)%10, b=s.hands[s.opponent].reduce((x,y)=>x+y,0)%10;
   const winner=a===b?null:a>b?s.challenger:s.opponent;
   s.outcome={a,b,winner};
   if(winner){s.phase='ended';room.players.find(p=>p.id===winner).coins+=s.pot;log(room,'oichoWon',{name:room.players.find(p=>p.id===winner).name,a,b});}
   else {s.phase='tie';log(room,'oichoTie',{a,b,rounds:s.rounds});}
 }
}
function oiRematch(room,p) {
 const s=room.session;if(!s||s.type!=='oicho'||s.phase!=='tie'||![s.challenger,s.opponent].includes(p.id))throw Error('notPlaying');
 if(p.coins<s.stake)throw Error('coinsLow');
 s.ready[p.id]=true;
 if(s.ready[s.challenger]&&s.ready[s.opponent]){
   const a=room.players.find(p=>p.id===s.challenger),b=room.players.find(p=>p.id===s.opponent);
   if(a.coins<s.stake||b.coins<s.stake)throw Error('coinsLow');
   a.coins-=s.stake;b.coins-=s.stake;s.pot+=s.stake*2;s.rounds++;oiDeal(s);log(room,'oichoAgain',{rounds:s.rounds,pot:s.pot});
 }
}
function oiRefund(room) {
 const s=room.session;if(!s||s.type!=='oicho'||s.phase!=='tie')throw Error('notPlaying');
 for(const id of [s.challenger,s.opponent])room.players.find(p=>p.id===id).coins+=s.pot/2;
 s.phase='ended';log(room,'oichoRefund');
}
function start51(room) {
 const ps=active(room);if(ps.length<2)throw Error('needTwo');if(ps.some(p=>p.coins<room.stake))throw Error('coinsLow');
 const deck=makeDeck(), hands={},status={};ps.forEach(p=>{p.coins-=room.stake;hands[p.id]=[deck.pop(),deck.pop()];status[p.id]={done:false,hits:0};});
 room.session={type:'fiftyone',phase:'playing',stake:room.stake,deck,hands,status,participants:ps.map(p=>p.id),result:null};log(room,'fiftyoneStarted');
}
function finish51(room) {
 const s=room.session;s.phase='ended';
 const ranking=s.participants.map(id=>({id,...score51(s.hands[id])}));
 const valid=ranking.filter(x=>!x.bust);
 const max=valid.length?Math.max(...valid.map(x=>x.points)):-1;
 const contenders=valid.filter(x=>x.points===max), maxPoker=contenders.length?Math.max(...contenders.map(x=>x.rank)):-1;
 const winners=contenders.filter(x=>x.rank===maxPoker);
 const pot=s.participants.length*s.stake;
 const each=winners.length?Math.floor(pot/winners.length):s.stake;
 if(winners.length)winners.forEach(x=>room.players.find(p=>p.id===x.id).coins+=each);
 else s.participants.forEach(id=>room.players.find(p=>p.id===id).coins+=s.stake);
 s.result={ranking,winners:winners.map(x=>x.id),pot};
 log(room,'fiftyoneResult',{names:winners.map(x=>room.players.find(p=>p.id===x.id).name).join(' / ')||'—'});
}
function choice51(room,p,hit) {
 const s=room.session;if(!s||s.type!=='fiftyone'||s.phase!=='playing'||!s.participants.includes(p.id))throw Error('notPlaying');
 const stat=s.status[p.id];if(stat.done)throw Error('alreadyChosen');
 if(hit && stat.hits<5){s.hands[p.id].push(s.deck.pop());stat.hits++;if(score51(s.hands[p.id]).bust||stat.hits>=5)stat.done=true;}
 else stat.done=true;
 if(s.participants.every(id=>s.status[id].done))finish51(room);
}
function startRoulette(room) {
 const s=room.session;
 if(!s||s.type!=='roulette')throw Error('notPlaying');
 if(s.phase!=='betting')throw Error('notPlaying');
 if(Object.keys(s.bets).length<2)throw Error('needTwoBets');
 s.phase='spinning';s.start=Date.now();s.offset=rnd(1300)/100;s.velocity=7+rnd(7);s.result=null;
 log(room,'wheelStarted');
 s.timer=setTimeout(()=>{if(s.phase==='spinning'){stopRoulette(room,'auto');broadcast(room);}},12000);
}
function stopRoulette(room,who) {
 const s=room.session;if(!s||s.type!=='roulette'||s.phase!=='spinning')throw Error('notPlaying');
 let elapsed=Math.max(0,(Date.now()-s.start)/1000);
 if(elapsed<0.7 && who!=='auto')throw Error('spinTooSoon');
 const result=Math.floor((s.offset+elapsed*s.velocity)%13);
 s.result=result;s.phase='ended';s.stoppedBy=who;
 if(s.timer)clearTimeout(s.timer);
 for(const [id,bet] of Object.entries(s.bets)){
  let won=false, multiplier=2;
  switch(bet.pick){
   case 'red': won=result>0&&result%2===1;break;
   case 'black': won=result>0&&result%2===0;break;
   case 'low':won=result>=1&&result<=6;break;
   case 'high':won=result>=7&&result<=12;break;
   default:if(bet.pick.startsWith('num:')){won=result===Number(bet.pick.split(':')[1]);multiplier=12;}
  }
  bet.won=won;if(won)room.players.find(p=>p.id===id).coins+=bet.stake*multiplier;
 }
 log(room,'wheelStopped',{number:result});
}
function diceRisk(room,p) {
 const s=room.session;if(!s||s.type!=='roulette'||s.phase!=='ended'||!s.bets[p.id])throw Error('notPlaying');
 if(s.dice[p.id])throw Error('alreadyChosen');
 if(p.coins<10)throw Error('coinsLow');p.coins-=10;
 const die=rnd(6)+1, good=die>=4;
 if(good)p.coins+=20;
 s.dice[p.id]={die,delta:good?2:-2};log(room,'diceResult',{name:p.name,die,delta:good?2:-2});
}
function rouletteBet(room,p,pick) {
 if(!['red','black','low','high',...Array.from({length:13},(_,i)=>`num:${i}`)].includes(pick))throw Error('badPick');
 let s=room.session;
 if(!s||s.type!=='roulette') {s=room.session={type:'roulette',phase:'betting',bets:{},dice:{},stake:room.stake};}
 if(s.phase!=='betting')throw Error('notPlaying');
 if(s.bets[p.id])p.coins+=s.bets[p.id].stake;
 if(p.coins<room.stake)throw Error('coinsLow');p.coins-=room.stake;
 s.bets[p.id]={pick,stake:room.stake};
 log(room,'betPlaced',{name:p.name});
}
const products={111:'drink',222:'snack',333:'toy',444:'souvenir'};
function slotsShop(room,p,cost) {
 if(!products[cost])throw Error('badProduct');
 if(p.coins<cost)throw Error('coinsLow');
 let s=room.session;
 if(!s||s.type!=='slots')s=room.session={type:'slots',phase:'shopping',stake:room.stake,receipts:{},spins:{}};
 p.coins-=cost;s.receipts[p.id]={cost,product:products[cost],target:String(cost).padStart(3,'0')};
 log(room,'bought',{name:p.name,cost});
}
function slotsSpin(room,p) {
 const s=room.session;if(!s||s.type!=='slots'||!s.receipts[p.id])throw Error('needShop');
 if(p.coins<room.stake)throw Error('coinsLow');p.coins-=room.stake;
 const target=s.receipts[p.id].target;
 let reels=Array.from({length:3},()=>String(rnd(10)));
 if(rnd(8)===0)reels=target.split('');
 let multi=0;
 if(reels.join('')===target)multi=5;
 else if(reels.every(v=>v===reels[0]))multi=3;
 else if(new Set(reels).size<=2)multi=1;
 p.coins+=room.stake*multi;
 s.spins[p.id]={reels,multi,at:Date.now()};
 log(room,'slotResult',{name:p.name,reels:reels.join(''),multi});
}
function withAction(ws, data) {
 const {room,p}=requirePlayer(ws);if(!room||!p)throw Error('notJoined');
 const host = room.host===p.id;
 switch(data.action){
  case 'character':
   if(!validCharacter(data.character))throw Error('badAction');
   p.character=data.character;
   stage(room,'character',{from:p.id,character:p.character});
   break;
  case 'gift': {
   if(!GIFT_TYPES.has(data.gift))throw Error('badAction');
   const target=room.players.find(x=>x.id===data.target && online(x));
   if(!target)throw Error('badAction');
   if(p.lastGift && Date.now()-p.lastGift<1800)throw Error('slowDown');
   p.lastGift=Date.now();
   stage(room,'gift',{from:p.id,target:target.id,gift:data.gift});
   break;
  }
  case 'config':
   if(!host)throw Error('notHost');
   if(!GAME_TYPES.has(data.game)||!STAKES.includes(data.stake))throw Error('badAction');
   resetSession(room);room.game=data.game;room.stake=data.stake;log(room,'modeChanged',{game:data.game});break;
  case 'refill':
   p.coins=1000;log(room,'refilled',{name:p.name});break;
  case 'restart':
   if(!host)throw Error('notHost');resetSession(room);break;
  case 'startMahjong':
   if(!host||room.game!=='mahjong')throw Error('notHost');resetSession(room);startMahjong(room,!!data.glass);break;
  case 'discard': discardMahjong(room,p,Number(data.tile));break;
  case 'tsumo':{
   const s=room.session;if(!s||s.type!=='mahjong'||s.phase!=='playing'||s.order[s.turn]!==p.id||!isWin(s.hands[p.id]))throw Error('notPlaying');settleMahjong(room,p.id,'tsumo');break;
  }
  case 'startOi':
   if(!host||room.game!=='oicho')throw Error('notHost');resetSession(room);startOi(room,data.challenger,data.opponent);break;
  case 'oiChoice':oiChoice(room,p,!!data.hit);break;
  case 'oiRematch':oiRematch(room,p);break;
  case 'oiRefund':{const s=room.session;if(!s||![s.challenger,s.opponent].includes(p.id))throw Error('notPlaying');oiRefund(room);break;}
  case 'start51':
   if(!host||room.game!=='fiftyone')throw Error('notHost');resetSession(room);start51(room);break;
  case 'choice51':choice51(room,p,!!data.hit);break;
  case 'rouletteBet':if(room.game!=='roulette')throw Error('badAction');rouletteBet(room,p,String(data.pick));break;
  case 'rouletteSpin':if(!host||room.game!=='roulette')throw Error('notHost');startRoulette(room);break;
  case 'rouletteStop':stopRoulette(room,p.name);break;
  case 'diceRisk':diceRisk(room,p);break;
  case 'shop':if(room.game!=='slots')throw Error('badAction');slotsShop(room,p,Number(data.cost));break;
  case 'slotSpin':if(room.game!=='slots')throw Error('badAction');slotsSpin(room,p);break;
  default:throw Error('badAction');
 }
 broadcast(room);
}
function join(ws,msg) {
 const name=clampName(msg.name),phrase=typeof msg.phrase==='string'?msg.phrase.trim():'';
 if(!name||!validCode(phrase))throw Error('invalidLogin');
 if(rooms.size>=MAX_ROOMS)throw Error('roomsFull');
 const key=sha(phrase);
 let room=rooms.get(key);
 if(!room){room={key,players:[],host:null,game:'mahjong',stake:50,session:null,log:[],stage:[],at:Date.now()};rooms.set(key,room);}
 let p=room.players.find(x=>x.token===msg.token && x.name===name && msg.token);
 if(p){if(validCharacter(msg.character))p.character=msg.character;if(p.ws && p.ws!==ws)try{p.ws.close(4000,'new login');}catch{}}
 else {
  if(room.players.length>=4)throw Error('roomFull');
  if(room.players.some(x=>x.name.toLowerCase()===name.toLowerCase()))throw Error('nameUsed');
  p={id:uid(),token:uid(),name,coins:COIN_START,character:validCharacter(msg.character)?msg.character:1,ws:null};room.players.push(p);
  if(!room.host)room.host=p.id;
  log(room,'joined',{name});
 }
 p.ws=ws;ws.roomKey=key;ws.pid=p.id;
 send(ws,{type:'joined',token:p.token});broadcast(room);
}
const server=http.createServer((req,res)=>{
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,'http://local').pathname);}catch{res.writeHead(400);return res.end('Bad request');}
 if(pathname==='/health'){res.writeHead(200,{'Content-Type':'application/json'});return res.end(JSON.stringify({ok:true}));}
 if(pathname==='/')pathname='/index.html';
 const file=path.resolve(ROOT,'.'+pathname);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('Forbidden');}
 const ext=path.extname(file);
 if(!['.html','.js','.css','.png','.jpg','.jpeg','.svg','.ico'].includes(ext)){res.writeHead(404);return res.end('Not found');}
 fs.readFile(file,(err,body)=>{
  if(err){res.writeHead(404);return res.end('Not found');}
  const policy=pathname==='/solo.html' ? "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' ws: wss:; object-src 'none'" : "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self' ws: wss:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'";
  res.writeHead(200,{'Content-Type':({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'})[ext], 'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':policy});res.end(body);
 });
});
const wss=new WebSocketServer({server,maxPayload:4096,verifyClient:({req},done)=>{
 const origin=req.headers.origin;
 if(!origin) return done(true);
 try{const u=new URL(origin);const host=req.headers.host; done(u.host===host);}catch{done(false,403,'Invalid origin');}
}});
const ipLog = new Map();
wss.on('connection',(ws,req)=>{
 const ip=req.socket.remoteAddress||'unknown';
 ws.on('message',raw=>{
  try{
   const now=Date.now(), r=ipLog.get(ip)||{at:now,count:0};if(now-r.at>60000){r.at=now;r.count=0;}if(++r.count>150)throw Error('slowDown');ipLog.set(ip,r);
   const msg=JSON.parse(String(raw));
   if(!ws.roomKey){if(msg.type!=='join')throw Error('notJoined');join(ws,msg);}
   else if(msg.type==='action')withAction(ws,msg);
   else throw Error('badAction');
  } catch(e){tell(ws,e.message || 'badAction');}
 });
 ws.on('close',()=>{
  const {room,p}=requirePlayer(ws);if(!room||!p||p.ws!==ws)return;
  p.ws=null;
  if(room.host===p.id){const successor=room.players.find(x=>x.id!==p.id && online(x));if(successor)room.host=successor.id;}
  log(room,'left',{name:p.name});broadcast(room);
 });
});
const sweeper=setInterval(()=>{
 const now=Date.now();for(const [key,room] of rooms){
  if(active(room).length===0 && now-room.at>30*60*1000){if(room.session?.timer)clearTimeout(room.session.timer);rooms.delete(key);}
 }
 for(const [ip,item] of ipLog)if(now-item.at>5*60*1000)ipLog.delete(ip);
},60000);
if(require.main===module)server.listen(PORT,()=>console.log(`Mori P lounge on http://localhost:${PORT}`));
module.exports={server,wss,rooms,isWin,pokerRank,score51,stop:()=>{clearInterval(sweeper);server.close();wss.close();}};
