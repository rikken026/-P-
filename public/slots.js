(function(root){
'use strict';
const symbols=Object.freeze(['A','2','3','4','5','6','7','8','9','10','J','Q','K','★']);
const lines=Object.freeze([[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].map(Object.freeze));
function target(receipt){if(!/^\d{3}$/.test(receipt))throw Error('Invalid receipt');return [...receipt].map(v=>v==='1'?'A':v==='0'?'10':v)}
function evaluate(grid,receipt){
 if(!Array.isArray(grid)||grid.length!==9||grid.some(v=>!symbols.includes(v)))throw Error('Invalid grid');
 const wanted=target(receipt);
 const wins=lines.map((cells,line)=>{const a=cells.map(i=>grid[i]);
 let kind='miss',multi=0;
 if(a.every((v,i)=>v===wanted[i])){kind='receipt';multi=5}
 else if(a.every(v=>v===a[0])){kind='triple';multi=3}
 else if(new Set(a).size===2){kind='pair';multi=1}
 else if(a[0]===wanted[0]){kind='first';multi=.25}
 return {line,cells,kind,multi};});
 return {wins:wins.filter(v=>v.multi),multi:wins.reduce((n,v)=>n+v.multi,0)};
}
function draw(randomInt){return Array.from({length:9},()=>symbols[randomInt(14)])}
const copy={
 ja:['横3・縦3・斜め2の8ライン。左→右、縦は上→下。レシート1=A、0=10。ジョーカー★は独立した絵柄です。','各ライン：レシート一致×5／3枚同じ×3／2枚同じ×1／先頭だけ目標一致×0.25。高い役1つを採用し8ラインを合算。配当は投入額×合計倍率（端数切捨て）。','配当','収支','列を止める'],
 en:['8 lines: 3 rows, 3 columns, 2 diagonals. Read left to right or top to bottom. Receipt 1=A, 0=10. Joker ★ is a separate symbol.','Per line: receipt ×5 / triple ×3 / pair ×1 / first card matching target ×0.25. Highest award only per line; sum all 8. Payout = stake × total, rounded down.','Payout','Net','Stop column'],
 zh:['8条线：横3、竖3、斜2。从左到右或从上到下。小票1=A、0=10。★为独立图案。','每线：小票全中×5／三同×3／两同×1／首张匹配目标×0.25。每线只取最高奖，8线相加，投入×总倍率向下取整。','派彩','净收益','停止列'],
 ko:['8개 라인: 가로3, 세로3, 대각선2. 왼쪽부터 또는 위부터 판정. 영수증1=A, 0=10. ★는 독립 그림입니다.','라인당 영수증 일치×5 / 세 장 동일×3 / 두 장 동일×1 / 첫 카드 목표 일치×0.25. 라인별 최고 배당만 합산. 투입액×합계 배율을 내림합니다.','배당','순수익','열 멈추기']};
function words(lang){return copy[lang]||copy.ja}
function rules(lang){return words(lang).slice(0,2).join(' ')}
function summary(result,stake,lang){const w=words(lang),payout=Math.floor(stake*result.multi);return w[2]+': '+payout+' 🪙 · '+w[3]+': '+(payout-stake)+' 🪙 · '+result.multi+'×'}
function board(grid,result,running=false,stopped=0){const hits=new Set((result?.wins||[]).flatMap(v=>v.cells));return '<div class="card-slots" aria-label="3 × 3" aria-busy="'+running+'">'+grid.map((v,i)=>'<span id="slotDigit'+i+'" class="card-slot '+(hits.has(i)?'hit ':'')+(running&&i%3>=stopped?'rolling':'')+'">'+v+'</span>').join('')+'</div>'}
const api={symbols,lines,target,evaluate,draw,rules,summary,board,words};
if(typeof module==='object')module.exports=api;else root.CardSlots=api;
})(typeof globalThis==='object'?globalThis:this);
