# 森Pのゲームラウンジ — GLOBAL IDOL STAGE edition

Four-language (JA, EN, ZH, KO) fictional-coin party game with a 20-character star selector, per-character dialogue and Web Speech text-to-speech, browser-generated cheering and applause, free fan gifts and server-synchronized character/gift events. Mori P uses the user-provided round white face / sunglasses / suit image.

## Play solo, offline

Open `public/solo.html` in a browser. It is a self-contained file, including all character thumbnails and the Mori P image. The separately supplied `森P_アイドル演出版_1人用.html` is the same file.

## Run online multiplayer

Requires Node.js >=20 and network access for installing the dependency. Install and run:

```bash
npm install
npm start
```

Then visit http://localhost:3000. Upload these source files to a WebSocket-compatible Node host (such as a suitable Render Web Service) to enable friends on different devices to join via the public URL. Set build command `npm install` and start command `npm start`. A static HTML host alone is not sufficient for the multiplayer version. No deployment or published URL is included.

A nickname and a shared passphrase are the only join inputs; maximum 4 players per room. No e-mail or phone number. Passphrases are SHA-256 hashed in server RAM, and no user profiles are persisted. Server restarts clear coins, sessions and fan events. IP addresses are temporarily used for rate limiting. Anyone with the room phrase can join a vacant seat.

## Stage architecture

- `public/assets/char_01.jpg` … `char_20.jpg`: concept portrait crops, one per original character.
- `public/assets/morip.png`: supplied Mori P mascot.
- `public/stars.js` + `public/stars.css`: character picker, fan stage and optional Web Speech synthesis / Web Audio sound effects.
- `server.js`: character IDs on join/update, synchronized free gifts and fan notifications when players win; does not alter coin balances for gifts.
- `public/solo.html`: fully self-contained offline game, voice/effects and selection included.
- `test_server.js`: mocked WebSocket unit/integration tests.

Speech voice availability differs across devices/browsers and may need enabled system voices. Sound is opt-out via ON/OFF and volume controls; audio activation may require a user click. The app does not have recorded voice acting, pre-recorded crowd audio, or real-money functionality.

## Tests

```bash
node test_server.js
```

The previous special-rule game mechanics remain prototypes (not official Riichi Mahjong, Oicho-Kabu, Blackjack, or casino-game rules), and full simultaneous real-network device testing has not been completed in this sandbox.
