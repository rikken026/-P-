/* Keep native game handlers as the single source of game actions. */
(()=>{
 const root=document.getElementById('board')||document.getElementById('stage');
 if(!root)return;
 const words={ja:['牌を選び、確定ボタンで捨ててください。','選択中：','この牌を捨てる','ゲーム操作'],en:['Select a tile, then confirm to discard.','Selected: ','Discard this tile','Game actions'],zh:['选择一张牌，再确认打出。','已选择：','打出此牌','游戏操作'],ko:['패를 선택한 뒤 버리기를 눌러 주세요.','선택: ','이 패 버리기','게임 조작']};
 const w=()=>words[document.documentElement.lang]||words.ja;
 const dock=document.createElement('nav');dock.className='touch-dock';dock.hidden=true;document.body.append(dock);
 const selection=document.createElement('div');selection.className='touch-selection';selection.hidden=true;root.after(selection);
 let chosen=null,bypass=false;
 const tileSelector='button[data-act="discard"],button[data-discard]';
 const actions='button[data-act]:not([data-act="discard"]):not([data-act="shop"]),button[data-action],button[data-kab]';
 function size(){document.body.style.setProperty('--dock-space',dock.getBoundingClientRect().height+16+'px')}
 new ResizeObserver(size).observe(dock);
 function confirm(){
  if(!chosen||!chosen.isConnected||chosen.disabled)return;
  const tile=chosen;chosen=null;bypass=true;
  try{tile.click()}finally{bypass=false;tile.classList.remove('touch-selected');tile.setAttribute('aria-pressed','false');refresh()}
 }
 function confirmButton(){const b=document.createElement('button');b.type='button';b.className='touch-confirm';b.textContent=w()[2];b.disabled=!chosen;b.onclick=confirm;return b}
 function refresh(){
  if(chosen&&(!chosen.isConnected||chosen.disabled))chosen=null;
  const tiles=[...root.querySelectorAll(tileSelector)].filter(b=>!b.disabled);
  tiles.forEach(b=>b.setAttribute('aria-pressed',String(b===chosen)));
  selection.replaceChildren();selection.hidden=!tiles.length;
  const label=chosen?w()[1]+(chosen.getAttribute('aria-label')||chosen.textContent.trim()):w()[0];
  if(tiles.length){const s=document.createElement('span');s.setAttribute('role','status');s.textContent=label;selection.append(s,confirmButton())}
  dock.replaceChildren();dock.setAttribute('aria-label',w()[3]);
  if(tiles.length){const p=document.createElement('p');p.textContent=label;dock.append(p,confirmButton())}
  for(const original of root.querySelectorAll(actions)){
   if(!original.getClientRects().length)continue;
   const b=document.createElement('button');b.type='button';b.textContent=original.textContent;b.disabled=original.disabled;
   b.onclick=()=>{if(original.isConnected&&!original.disabled)original.click()};dock.append(b);
  }
  dock.hidden=!dock.children.length;size();
 }
 root.addEventListener('click',e=>{
  const b=e.target.closest(tileSelector);if(!b||b.disabled||bypass)return;
  e.preventDefault();e.stopImmediatePropagation();
  if(chosen)chosen.classList.remove('touch-selected');chosen=b;b.classList.add('touch-selected');refresh();
 },true);
 new MutationObserver(refresh).observe(root,{childList:true,subtree:true});
 new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 window.addEventListener('resize',size);refresh();
})();
