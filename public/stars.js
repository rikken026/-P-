'use strict';
/* Mori P Character Stage — no account, paid gifts, network audio files, or real money */
(()=>{
const CREW=[
 ['月影レイ','ヴィジュアル系歌手','日本','この一打で、世界を変える。','勝負はここからだ！','This move changes everything.'],
 ['紫苑ルナ','ゴシックロック歌手','日本','最後に微笑むのは、私よ。','この夜は私のもの。','I will have the last smile.'],
 ['黒羽ノア','ギタリスト','英国','見えているものだけが真実じゃない。','静かに決めるよ。','Not everything is as it seems.'],
 ['ソ・ハリン','K-POPダンサー','韓国','みんなの声援が、私の力！','一緒に楽しもう！','Your cheers give me strength!'],
 ['パク・ジュン','K-POPリーダー','韓国','最高のステージにしよう。','チームでつかむ勝利だ。','Let us make this a great stage!'],
 ['皇アキト','元ホスト','日本','この勝負、楽しませてあげるよ。','今夜の主役は決まりだね。','This round is going to be fun.'],
 ['麗華ミオ','イベントプロデューサー','日本','駆け引きは、美しくなくちゃ。','鮮やかな勝利ね。','Every move should be elegant.'],
 ['夢咲ユラ','地雷系配信者','日本','今日は応援してくれる？','きゃっ、うれしい！','Will you cheer for me today?'],
 ['胡桃ミナ','ファッションデザイナー','日本','ゾロ目もコーデも、揃えちゃお！','最高にかわいく決まった！','Let us match the perfect look!'],
 ['リン・シャオ','多言語シンガー','台湾','言葉が違っても、心は通じるわ。','世界のみんな、ありがとう。','Different words, one heart.'],
 ['霧島ハル','プログラマー','日本','この確率なら……まだ勝てる。','計算どおり……かな。','The odds are still in my favor.'],
 ['星野スミレ','イラストレーター','日本','私の描いた未来、叶うかな。','夢みたい……ありがとう。','Will my imagined future come true?'],
 ['アミナ・カマラ','ゲーム開発者','セネガル','ゲームは世界をつなぐ言葉よ！','みんなと遊べて最高！','Games bring the world together!'],
 ['早乙女カナ','AI起業家','日本','判断が未来を作る。','作戦成功ね。','Our choices shape the future.'],
 ['アレックス・ロペス','ファッション起業家','スペイン','自分らしく勝つ。それが最高。','みんな、自分らしく輝こう。','Winning as yourself is the best.'],
 ['ダンテ・ロッシ','元プロ勝負師','イタリア','本当に強い者は、引く時を知る。','今日は良い勝負だった。','A true expert knows when to stop.'],
 ['リー・ウェイロン','ステージマジシャン','中国','見える牌に惑わされてはいけません。','さて、種明かしはまだです。','Do not be fooled by visible tiles.'],
 ['レナ・オルテガ','歌手・回復支援活動家','メキシコ','人生は勝ち負けだけじゃない。','仲間がいるってすばらしい。','Life is about more than winning.'],
 ['サム・オコナー','DJ・プロデューサー','カナダ','人生のリズムは自分で決める！','いいビートだったね！','Set the rhythm of your own life!'],
 ['アオ・ミズキ','電子音楽アーティスト','シンガポール','音楽で境界線を越えていこう。','世界中に届けよう！','Let music cross all borders!']
].map(([name,role,country,line,win,en],i)=>({id:i+1,name,role,country,line,win,en,pitch:[.92,1.13,.96,1.22,1.04,1.06,1.10,1.28,1.21,1.06,.88,1.16,1.07,1.05,1.02,.89,1.0,1.1,1.03,1.09][i]}));
window.STAR_CHARACTERS=CREW;
const L={
 ja:{heading:'🌟 推しキャラクターを選ぼう',intro:'20人全員から選択できます。対戦のセリフ・歓声・応援ギフトが変わります。',selected:'選択中',select:'このキャラで遊ぶ',preview:'▶ セリフを試す',voice:'キャラの声',sfx:'歓声・効果音',volume:'音量',gift:'無料の応援ギフト',to:'届ける相手',send:'応援を送る 🎁',none:'キャラを選んでください',champ:'観客が大歓声！',join:'応援ステージ',tip:'※音声は端末の読み上げ機能です。初回はボタン操作が必要です。',heart:'ハート',rose:'薔薇',star:'スター',bouquet:'花束',light:'ペンライト',giftsent:'から応援ギフト！',round:'いよいよ対戦開始！',victory:'勝利！ 会場が沸いています！',tie:'同点！ もう一度勝負！',wheel:'ルーレットが止まりました！',slot:'スロットの結果が出ました！',character:'キャラクターが変わりました',giftstage:'応援ギフトが届きました！',noVoice:'この端末では読み上げ音声に対応していません。',encourage:'みんな、応援ありがとう！',coachRead:'🔊 森Pが説明を読む'},
 en:{heading:'🌟 Choose your star',intro:'Pick any of 20 characters. Each has unique lines, cheers and free fan gifts.',selected:'Selected',select:'Play as this character',preview:'▶ Hear catchphrase',voice:'Character voice',sfx:'Crowd & effects',volume:'Volume',gift:'Free fan gift',to:'Send to',send:'Send cheer 🎁',none:'Choose a character',champ:'The crowd goes wild!',join:'Fan stage',tip:'Voices use your device text-to-speech. Tap a button to enable audio.',heart:'Heart',rose:'Rose',star:'Star',bouquet:'Bouquet',light:'Light stick',giftsent:'sent a fan gift!',round:'Let the game begin!',victory:'Victory! What a cheer!',tie:'A tie! Another round!',wheel:'The wheel has stopped!',slot:'Slot results are in!',character:'Character changed',giftstage:'A fan gift arrived!',noVoice:'Speech is not available on this device.',encourage:'Thank you for the cheers!',coachRead:'🔊 Hear Mori P’s guide'},
 zh:{heading:'🌟 选择你的明星角色',intro:'20位角色任选，体验专属台词、观众欢呼和免费应援礼物。',selected:'已选择',select:'使用这个角色',preview:'▶ 试听台词',voice:'角色语音',sfx:'欢呼与音效',volume:'音量',gift:'免费应援礼物',to:'送给',send:'发送应援 🎁',none:'请选择角色',champ:'全场欢呼！',join:'应援舞台',tip:'语音使用设备的朗读功能，需要先点击按钮启用。',heart:'爱心',rose:'玫瑰',star:'星星',bouquet:'花束',light:'荧光棒',giftsent:'送来了应援礼物！',round:'比赛开始！',victory:'胜利！欢呼响起！',tie:'平局！再次对战！',wheel:'轮盘停下了！',slot:'老虎机结果揭晓！',character:'角色已更换',giftstage:'收到了应援礼物！',noVoice:'此设备不支持语音朗读。',encourage:'谢谢大家的支持！',coachRead:'🔊 森P语音讲解'},
 ko:{heading:'🌟 나만의 스타를 선택하세요',intro:'20명 중 선택해 대사, 관중 함성, 무료 응원 선물을 즐겨요.',selected:'선택됨',select:'이 캐릭터로 플레이',preview:'▶ 대사 듣기',voice:'캐릭터 음성',sfx:'함성/효과음',volume:'음량',gift:'무료 응원 선물',to:'받는 사람',send:'응원 보내기 🎁',none:'캐릭터 선택',champ:'관객이 환호합니다!',join:'응원 스테이지',tip:'음성은 기기의 읽어주기 기능을 사용하며, 첫 버튼 입력이 필요합니다.',heart:'하트',rose:'장미',star:'별',bouquet:'꽃다발',light:'응원봉',giftsent:'응원 선물을 보냈어요!',round:'게임 시작!',victory:'승리! 환호성이 울려 퍼져요!',tie:'무승부! 다시 한번!',wheel:'룰렛이 멈췄어요!',slot:'슬롯 결과가 나왔어요!',character:'캐릭터 변경',giftstage:'팬 선물이 도착했어요!',noVoice:'이 기기에서는 음성 읽기가 지원되지 않습니다.',encourage:'응원해 주셔서 감사합니다!',coachRead:'🔊 모리P 설명 듣기'}
};
const GIFTS={heart:'💗',rose:'🌹',star:'🌟',bouquet:'💐',light:'✨'};
const safeGet=k=>{try{return localStorage.getItem(k)}catch{return null}};
const safeSet=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
let selected=Number(safeGet('morip_star_selected'))||1;
if(!Number.isInteger(selected)||selected<1||selected>20) selected=1;
window.starSelected=selected;
let voiceOn=safeGet('morip_voice')!=='false';
let soundOn=safeGet('morip_sound')!=='false';
let volume=Number(safeGet('morip_volume')||.65);if(!(volume>=0&&volume<=1))volume=.65;
let audio=null, firstState=true, seen=new Set(), lastLocale='', visualTimer=null;
function locale(){return (document.getElementById('language')?.value||document.documentElement.lang||'ja') in L?(document.getElementById('language')?.value||document.documentElement.lang||'ja'):'ja'}
function t(k){return (L[locale()]||L.ja)[k]||L.ja[k]||k}
function url(i){return window.STAR_AVATARS?.[i-1]||`${window.STAR_ASSET_PREFIX||'/assets/'}char_${String(i).padStart(2,'0')}.jpg`}
function moriUrl(){return window.STAR_MORIP||`${window.STAR_ASSET_PREFIX||'/assets/'}morip.png`}
function getChar(i){return CREW[(Number(i)||1)-1]||CREW[0]}
function phraseFor(ch,kind='start'){
 if(kind==='win'){return locale()==='ja'?ch.win:t('victory')}
 if(kind==='tie')return t('tie');
 if(kind==='gift')return t('encourage');
 if(kind==='wheel')return t('wheel');
 if(kind==='slot')return t('slot');
 if(locale()==='en')return ch.en;
 if(locale()==='ja')return ch.line;
 return `${ch.name}！${t('round')}`;
}
function speech(text,ch){
 if(!voiceOn || !('speechSynthesis' in window))return;
 try{
  const speech=window.speechSynthesis;
  speech.cancel();
  let utter=new SpeechSynthesisUtterance(text);
  utter.lang={ja:'ja-JP',en:'en-US',zh:'zh-CN',ko:'ko-KR'}[locale()];
  const matching=speech.getVoices().filter(v=>v.lang.toLowerCase().startsWith(utter.lang.slice(0,2).toLowerCase()));
  if(matching.length)utter.voice=matching[(ch?.id||1)%matching.length];
  utter.pitch=ch?.pitch||1;utter.rate=.98;utter.volume=volume;
  speech.speak(utter);
 }catch(e){}
}
function audioCtx(){try{if(!audio){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;audio=new C();}if(audio.state==='suspended') audio.resume();return audio;}catch{return null}}
function tone(freq,time,duration=.15,g=.055){const c=audioCtx();if(!c||!soundOn)return;const o=c.createOscillator(),v=c.createGain();o.type='triangle';o.frequency.value=freq;v.gain.setValueAtTime(.0001,time);v.gain.exponentialRampToValueAtTime(Math.max(.0002,g*volume),time+.015);v.gain.exponentialRampToValueAtTime(.0001,time+duration);o.connect(v);v.connect(c.destination);o.start(time);o.stop(time+duration+.01)}
function cheer(type='cheer'){
 if(!soundOn)return;const c=audioCtx();if(!c)return;
 const now=c.currentTime+.04;
 const notes=type==='gift'?[523,659,784]:type==='start'?[392,494,587]:[523,659,784,1046];
 notes.forEach((hz,i)=>tone(hz,now+i*.11,.23,type==='gift'?.045:.065));
 // Synthetic applauding claps: brief gated noise bursts, never prerecorded recordings.
 try{
  const buf=c.createBuffer(1,Math.round(c.sampleRate*.068),c.sampleRate),d=buf.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
  for(let i=0;i<(type==='gift'?4:9);i++){
   const src=c.createBufferSource(),vol=c.createGain();src.buffer=buf;
   vol.gain.value=volume*.025;
   src.connect(vol).connect(c.destination);const at=now+.18+i*.11+(i%3)*.013;src.start(at);src.stop(at+.067);
  }
 }catch{}
}
function fireworks(text,emoji='✨'){
 const stage=document.getElementById('starToast');if(!stage)return;
 stage.innerHTML=`<span class="star-shimmer" aria-hidden="true">${emoji} ✨ ${emoji}</span><b>${escapeHtml(text)}</b>`;
 stage.hidden=false;clearTimeout(visualTimer);visualTimer=setTimeout(()=>stage.hidden=true,4400);
}
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function renderPicker(){
 const picker=document.getElementById('starPicker');if(!picker)return;
 picker.innerHTML=`<div class="star-title"><div><h2>${t('heading')}</h2><p>${t('intro')}</p></div><div class="star-volume"><label><input type="checkbox" data-star="voice" ${voiceOn?'checked':''}> 🔊 ${t('voice')}</label><label><input type="checkbox" data-star="sfx" ${soundOn?'checked':''}> 👏 ${t('sfx')}</label><label>${t('volume')} <input type="range" data-star="volume" min="0" max="1" step="0.05" value="${volume}"></label></div></div>
 <div class="star-selected"><img src="${url(selected)}" alt=""><div><span class="star-kicker">${t('selected')}</span><strong>${getChar(selected).name}</strong><small>${getChar(selected).role} · ${getChar(selected).country}</small><p>「${escapeHtml(phraseFor(getChar(selected)))}」</p><button type="button" data-star="preview">${t('preview')}</button></div></div>
 <div class="star-grid" role="group" aria-label="${t('heading')}">${CREW.map(ch=>`<button type="button" class="star-card ${selected===ch.id?'active':''}" data-star-choice="${ch.id}" aria-pressed="${selected===ch.id}"><img src="${url(ch.id)}" loading="lazy" alt=""><span>${String(ch.id).padStart(2,'0')} ${ch.name}</span><small>${ch.role}</small></button>`).join('')}</div><p class="star-disclaimer">${t('tip')}</p>`;
}
function addPicker(){
 let box=document.createElement('section');box.id='starPicker';box.className='star-picker panel';
 const join=document.querySelector('#joinPage .intro');
 if(join)join.after(box);
 else {const hero=document.querySelector('.hero');if(hero)hero.after(box);else document.querySelector('.shell')?.prepend(box);}
 box.addEventListener('click',e=>{const b=e.target.closest('[data-star-choice]');if(b){selected=Number(b.dataset.starChoice);window.starSelected=selected;safeSet('morip_star_selected',String(selected));renderPicker();refreshRoom();if(window.starIsOnline && window.state?.me)sendCharacter(); else if(window.starIsOnline){try{if(typeof state!=='undefined'&&state?.me)sendCharacter();}catch{}}}
 if(e.target.closest('[data-star="preview"]')){cheer('gift');const ch=getChar(selected);speech(phraseFor(ch),ch);fireworks(`${ch.name}：${phraseFor(ch)}`,'🌟');}});
 box.addEventListener('input',e=>{const k=e.target.dataset.star;if(k==='volume'){volume=Number(e.target.value);safeSet('morip_volume',String(volume))}});
 box.addEventListener('change',e=>{const k=e.target.dataset.star;if(k==='voice'){voiceOn=e.target.checked;safeSet('morip_voice',String(voiceOn))}if(k==='sfx'){soundOn=e.target.checked;safeSet('morip_sound',String(soundOn))}});
 renderPicker();
}
function sendCharacter(){try{if(typeof sendAction==='function')sendAction('character',{character:selected})}catch{}}
function onlineState(){try{return typeof state!=='undefined'?state:null}catch{return null}}
function refreshRoom(){
 const r=document.getElementById('starRoom');if(!r)return;
 const s=onlineState();if(!s)return;
 const ch=getChar(selected),people=s.players.filter(p=>p.connected);
 r.innerHTML=`<div class="star-room-top"><div class="star-hero"><img src="${url(selected)}" alt=""><div><span class="star-kicker">${t('join')}</span><h3>${escapeHtml(ch.name)}</h3><p>${escapeHtml(ch.role)}</p><p class="star-phrase">「${escapeHtml(phraseFor(ch))}」</p></div></div><button type="button" id="starChange" class="button outline small-btn">${t('heading')}</button></div>
 <div class="star-gift-bar"><label>${t('gift')}<select id="starGift">${Object.entries(GIFTS).map(([k,v])=>`<option value="${k}">${v} ${t(k)}</option>`).join('')}</select></label><label>${t('to')}<select id="starTarget">${people.map(p=>`<option value="${escapeHtml(p.id)}" ${p.id===s.me?'selected':''}>${escapeHtml(p.name)} · ${getChar(p.character).name}</option>`).join('')}</select></label><button id="starSend" type="button" class="button gold">${t('send')}</button><button id="starPreview" type="button" class="button outline">${t('preview')}</button></div><div class="star-feed" id="starFeed">${(s.stage||[]).slice(0,4).map(eventLine).join('')}</div>`;
 document.getElementById('starChange').onclick=()=>document.getElementById('starPicker')?.scrollIntoView({behavior:'smooth'});
 document.getElementById('starPreview').onclick=()=>{cheer('gift');speech(phraseFor(ch),ch);fireworks(ch.name+'：'+phraseFor(ch),'🎤')};
 document.getElementById('starSend').onclick=()=>{const gift=document.getElementById('starGift').value,target=document.getElementById('starTarget').value;sendAction('gift',{gift,target})};
}
function eventLine(ev){const s=onlineState();if(!s)return '';
 let from=s.players.find(p=>p.id===ev.from),target=s.players.find(p=>p.id===ev.target),name=from?.name||(ev.fan?(locale()==='ja'?'ファン':locale()==='en'?'Fans':locale()==='ko'?'팬':'粉丝'):'森P');
 let label=ev.kind==='gift'?`${name} ${GIFTS[ev.gift]||'🎁'} → ${target?.name||'？'}`:ev.kind==='character'?`${name} · ${t('character')}`:ev.kind==='win'?`🏆 ${name} · ${t('victory')}`:ev.kind==='start'?`🎮 ${t('round')}`:ev.kind==='tie'?`🔥 ${t('tie')}`:ev.kind==='wheel'?`🎡 ${t('wheel')}`:ev.kind==='slot'?`🎰 ${t('slot')}`:`🎲 ${t('round')}`;
 return `<span class="star-feed-item">${escapeHtml(label)}</span>`;
}
function processState(s){
 if(!s)return;
 if(firstState){(s.stage||[]).forEach(e=>seen.add(e.id));firstState=false;return;}
 const fresh=(s.stage||[]).filter(e=>!seen.has(e.id)).reverse();(s.stage||[]).forEach(e=>seen.add(e.id));
 if(seen.size>100){seen=new Set((s.stage||[]).map(e=>e.id))}
 fresh.slice(-4).forEach(ev=>{
  const from=s.players.find(p=>p.id===ev.from),target=s.players.find(p=>p.id===ev.target);
  const actor=getChar(ev.kind==='gift'?target?.character:from?.character);
  if(ev.kind==='character')return;
  if(ev.kind==='gift'){
   let msg=`${from?.name||(ev.fan?'ファン':'森P')} ${GIFTS[ev.gift]||'🎁'} → ${target?.name||actor.name}！ ${t('giftstage')}`;
   fireworks(msg,GIFTS[ev.gift]);cheer('gift');speech(phraseFor(actor,'gift'),actor);return;
  }
  if(['win','tie','start','wheel','slot','dice'].includes(ev.kind)){
   const kind=ev.kind==='win'?'win':ev.kind==='tie'?'tie':ev.kind==='wheel'?'wheel':ev.kind==='slot'?'slot':'start';
   const line=phraseFor(actor,kind);fireworks((from?.name||actor.name)+'：'+line,ev.kind==='win'?'🏆':'✨');
   cheer(ev.kind==='win'?'win':'start');speech(line,actor);
  }
 });
}
function addCoachVoice(){
 const panel=document.querySelector('#roomPage .coach-panel')||document.querySelector('aside.coach');
 if(!panel)return;
 const target=panel.querySelector('#coachMessage')||panel.querySelector('#speech');
 const read=document.createElement('button');read.type='button';read.className='star-coach-say';read.textContent=t('coachRead');
 read.onclick=()=>{if(!target)return;cheer('gift');speech(target.textContent,{id:1,pitch:.92})};
 panel.append(read);
 const sel=document.getElementById('language');sel?.addEventListener('change',()=>read.textContent=t('coachRead'));
}
function initOnline(){
 window.starIsOnline=true;
 addPicker();addCoachVoice();
 const r=document.createElement('section');r.id='starRoom';r.className='star-room panel';document.querySelector('.room-top')?.after(r);
 const toast=document.createElement('div');toast.id='starToast';toast.hidden=true;toast.className='star-toast';document.body.append(toast);
 // Add the chosen character to the initial join request (room members can use different characters).
 const oldRender=render;render=function(...args){oldRender(...args);const s=onlineState();if(!s)return;
  const list=document.querySelectorAll('#players .player');list.forEach((node,i)=>{const p=s.players[i];if(!p)return;const img=document.createElement('img');img.src=url(p.character);img.className='star-player-portrait';img.alt=getChar(p.character).name;node.prepend(img);node.querySelector('.player-name')?.insertAdjacentHTML('beforeend',`<small class="star-role">${escapeHtml(getChar(p.character).name)}</small>`)});
  refreshRoom();processState(s);
 };
 const oldLang=changeLang;changeLang=function(next){oldLang(next);renderPicker();refreshRoom()};


}
function initSolo(){
 addPicker();addCoachVoice();
 const toast=document.createElement('div');toast.id='starToast';toast.hidden=true;toast.className='star-toast';document.body.append(toast);
 const aside=document.querySelector('.coach .morip');if(aside){aside.outerHTML=`<img src="${moriUrl()}" class="star-morip-icon" alt="森P">`}
 let latest='';
 const oldNote=note;note=function(key,vars={},kind=''){
  oldNote(key,vars,kind);
  if(latest===key && !kind)return;latest=key;
  const ch=getChar(selected);
  if(kind==='win') {const line=phraseFor(ch,'win');fireworks(ch.name+'：'+line,'🏆');cheer('win');speech(line,ch);}
  else if(kind==='lose'){fireworks(t('champ'),'🎭');cheer('start');}
  else if(['mahjongStart','kbStart','bjPlaying','rSpinning','sSpinning'].includes(key)){const line=phraseFor(ch);fireworks(ch.name+'：'+line,'🎤');cheer('start');speech(line,ch)}
  else if(key==='kbTie'||key==='kbWar'){fireworks(t('tie'),'🔥');cheer('start');speech(t('tie'),ch)}
 };
 const oldSetLanguage=setLanguage;setLanguage=function(next){oldSetLanguage(next);renderPicker()};
 const oldGo=goMode;goMode=function(m){oldGo(m);latest='';};
 // Free, non-competitive gifts to the player's own fan stage, also usable without an online room.
 const r=document.createElement('section');r.className='star-solo-fans';r.innerHTML=`<strong>🎁 ${t('gift')} · ${t('join')}</strong><div class="star-solo-gifts">${Object.entries(GIFTS).map(([k,v])=>`<button type="button" data-solo-gift="${k}">${v} ${t(k)}</button>`).join('')}</div><p class="star-disclaimer">${t('tip')}</p>`;
 document.querySelector('.star-picker')?.after(r);
 r.onclick=e=>{const b=e.target.closest('[data-solo-gift]');if(!b)return;const ch=getChar(selected);fireworks(`${GIFTS[b.dataset.soloGift]} ${ch.name}！ ${t('giftstage')}`,GIFTS[b.dataset.soloGift]);cheer('gift');speech(phraseFor(ch,'gift'),ch)};
}
try{if(document.getElementById('joinPage'))initOnline();else if(document.getElementById('stage'))initSolo();}catch(err){console.error('Star Stage error',err)}
})();
