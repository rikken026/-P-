
/* 森Pゲームラウンジ：クラシック調BGM */
(() => {
  'use strict';

  if (document.getElementById('moriMusic')) return;

  const Audio = window.AudioContext ||
                window.webkitAudioContext;

  const box = document.createElement('section');
  box.id = 'moriMusic';
  box.innerHTML = `
    <strong>🎼 森PのBGM</strong>
    <button id="musicSwitch" type="button">
      ▶ BGMを流す
    </button>
    <label>曲調
      <select id="musicMood">
        <option value="auto">場面に合わせる</option>
        <option value="light">爽やか・古典派風</option>
        <option value="dark">重厚・バロック風</option>
        <option value="battle">緊迫した勝負</option>
      </select>
    </label>
    <label>音量
      <input id="musicVolume" type="range"
        min="0" max="100" value="70">
    </label>
    <span id="musicState">停止中</span>
  `;

  const css = document.createElement('style');
  css.textContent = `
    #moriMusic {
      display:flex;
      align-items:center;
      flex-wrap:wrap;
      gap:10px;
      padding:12px;
      margin:8px 0 14px;
      border:1px solid #69a8ab;
      border-radius:14px;
      background:#183748;
      color:white;
      font:15px system-ui;
    }
    #moriMusic strong {color:#ffdf9b}
    #moriMusic button,#moriMusic select {
      min-height:48px;
      padding:9px 12px;
      border-radius:11px;
      border:1px solid #a1c4c5;
      background:#235361;
      color:white;
      font-size:16px;
      cursor:pointer;
    }
    #moriMusic button {
      background:#286b57;
      font-weight:bold;
    }
    #moriMusic label {
      display:flex;
      align-items:center;
      gap:7px;
    }
    #moriMusic input {
      width:95px;
      accent-color:#f2c76c;
    }
  `;
  document.head.append(css);

  const root = document.querySelector('.shell') ||
               document.querySelector('.container') ||
               document.body;
  root.prepend(box);

  const button = box.querySelector('#musicSwitch');
  const mood = box.querySelector('#musicMood');
  const volume = box.querySelector('#musicVolume');
  const status = box.querySelector('#musicState');

  let ctx, master, timer;
  let playing = false;
  let index = 0;
  let next = 0;
  let currentMood = '';

  // 既存曲の録音ではなくオリジナルの旋律
  const tunes = {
    light: {
      speed:108,
      wave:'triangle',
      melody:[76,79,81,79,76,74,72,74,
              76,72,74,76,79,76,74,72],
      bass:[48,53,55,48]
    },
    dark: {
      speed:100,
      wave:'sawtooth',
      melody:[60,63,67,72,67,63,60,58,
              56,60,63,68,63,60,56,55],
      bass:[36,41,44,43]
    },
    battle: {
      speed:142,
      wave:'triangle',
      melody:[72,73,79,78,72,68,71,73,
              75,74,80,79,77,73,74,71],
      bass:[36,37,39,35]
    }
  };

  const freq = n =>
    440 * Math.pow(2,(n-69)/12);

  function playNote(n,at,duration,strength,wave) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = wave;
    osc.frequency.setValueAtTime(freq(n),at);

    gain.gain.setValueAtTime(0.0001,at);
    gain.gain.exponentialRampToValueAtTime(
      strength,at+0.015);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,at+duration);

    osc.connect(gain);
    gain.connect(master);
    osc.start(at);
    osc.stop(at+duration+0.03);
  }

  function scene() {
    if (mood.value !== 'auto') return mood.value;

    const solo = !!document.getElementById('stage');

    if (solo &&
        !document.body.classList.contains('play-only'))
      return 'light';

    const room = document.getElementById('roomPage');

    if (!solo && (!room || room.hidden))
      return 'light';

    const title =
      document.getElementById('modeTitle')?.textContent ||
      document.getElementById('gameTitle')?.textContent ||
      '';

    if (/麻雀|mahjong|麻将|마작/i.test(title))
      return 'dark';

    if (/51|ルーレット|roulette|轮盘|룰렛/i.test(title))
      return 'battle';

    return 'light';
  }

  function tick() {
    if (!playing || ctx.state !== 'running') return;

    const name = scene();

    if (name !== currentMood) {
      currentMood = name;
      index = 0;
      next = ctx.currentTime + 0.06;
    }

    const tune = tunes[name];
    const beat = 30 / tune.speed;

    // 森Pの説明中はBGMを小さくする
    const talking = !!window.speechSynthesis?.speaking;

    master.gain.setTargetAtTime(
      Number(volume.value)/100 *
        (talking ? 0.05 : 0.60),
      ctx.currentTime,0.15
    );

    if (next < ctx.currentTime - 0.4)
      next = ctx.currentTime + 0.05;

    let count = 0;

    while (next < ctx.currentTime + 0.2 &&
           count++ < 5) {
      const pos = index % 16;
      const at = Math.max(ctx.currentTime+0.004,next);

      playNote(tune.melody[pos],at,
               beat*0.82,0.11,tune.wave);

      if (pos % 4 === 0) {
        playNote(
          tune.bass[Math.floor(pos/4)],
          at,beat*3.2,0.09,'sine'
        );
      }

      next += beat;
      index++;
    }
  }

  button.addEventListener('click',async () => {
    if (playing) {
      playing = false;
      clearInterval(timer);

      master.gain.setTargetAtTime(
        0,ctx.currentTime,0.05);

      button.textContent = '▶ BGMを流す';
      status.textContent = '停止中';
      return;
    }

    if (!Audio) {
      status.textContent = '音声に未対応です';
      return;
    }

    try {
      if (!ctx) {
        ctx = new Audio();
        master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);
      }

      await ctx.resume();
      playing = true;
      currentMood = '';

      clearInterval(timer);
      timer = setInterval(tick,80);
      tick();

      button.textContent = '■ BGMを止める';
      status.textContent = '再生中';

    } catch(e) {
      status.textContent = '音声を再生できません';
    }
  });

  document.addEventListener('visibilitychange',() => {
    if (!ctx || !playing) return;

    if (document.hidden) {
      master.gain.setTargetAtTime(
        0,ctx.currentTime,0.05);
    } else {
      currentMood = '';
      next = ctx.currentTime + 0.05;
    }
  });

  window.addEventListener('pagehide',() => {
    clearInterval(timer);
  });
})();
