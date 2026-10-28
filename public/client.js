'use strict';
const $=id=>document.getElementById(id);
const LABELS={
 ja:{title:'森Pのオンラインゲームラウンジ',subtitle:'名前と合言葉だけで、友達とゲーム！',joinTitle:'お友達をゲームに招待！',joinExplain:'同じ合言葉を入力すると同じ部屋に入れます。メールや会員登録は不要です。',nickname:'ゲームの名前（ニックネーム）',phrase:'みんなで決めた合言葉（4文字以上）',phraseNotice:'誰もいない合言葉なら新しい部屋ができます。すでにあれば参加します。',enter:'入室する',noAccount:'📌 登録なしでOK',noAccountText:'本名・電話番号・メールアドレスの入力欄はありません。',twoToFour:'👥 2～4人でプレイ',twoToFourText:'コンビ麻雀は4人、ほかの対戦は2人から楽しめます。',playCoins:'🪙 架空コインだけ',playCoinsText:'購入・換金・送金なし。勝ち負けはゲームの中だけです。',soloLink:'前回の1人用ゲームで遊ぶ',room:'対戦ルーム',shareNotice:'このページのURLと合言葉を友達に伝えてください。',copyInvite:'招待文をコピー',leave:'退出する',players:'参加プレイヤー',games:'ゲームを選択',stake:'1人の架空コイン',reset:'新しい勝負',hostOnly:'ゲーム切替と賭け金は部屋の作成者が決めます。',activity:'プレイの記録',morip:'森P・ゲーム案内人',teach:'遊び方を説明するよ！',nextTip:'次の説明 ▶',privacy:'本名やメールは入力不要。名前は対戦中だけ表示され、合言葉はサーバーでハッシュ化します。部屋・コインはサーバー再起動で消えます。換金や送金はできません。',mahjong:'コンビ麻雀',oicho:'対戦おいちょかぶ',fiftyone:'51ポーカー',roulette:'ストップ＆ダイス',slots:'レシートスロット',host:'部屋の代表',you:'あなた',disconnected:'接続待ち',hostHint:'代表がゲームを選びます。みんなの参加を待ちましょう。',coins:'コイン',await:'準備中',playing:'対戦中',ended:'終了',betting:'賭け受付中',spinning:'回転中',tie:'同点！',shopping:'お買い物',waitingMahjong:'4人で2対2のコンビ麻雀。4人そろったら代表が開始できます。',startMahjong:'🀄 4人で対局開始',glass:'🫧 透明牌モード',mahjongIntro:'並び順で1人目+3人目、2人目+4人目がチームです。手番で自分の牌を選び、「この牌を捨てる」で確定します。',wall:'山の残り',team:'チーム',turn:'手番',tileDiscard:'牌を押して捨てる',tsumo:'ツモ！',yourHand:'あなたの手牌',hidden:'裏向き',win:'あがり',roundDraw:'流局',again:'もう一度遊ぶ',oichoIntro:'2人を選んで1対1の勝負。同点なら同じ2人がコインを積み増して再勝負！',challenger:'プレイヤー1',opponent:'プレイヤー2',startOi:'🃏 勝負開始',pot:'積まれたコイン',round:'勝負回数',twoCards:'配られた札',oiHelp:'札の合計の下一桁で勝負（9が最強）。2枚で勝負するか、1枚追加するか選んでね。',drawCard:'さらに1枚',stand:'この札で勝負',rematch:'🪙 同額追加して再勝負',refund:'同点で終了・コイン返却',oiTieNote:'同点です！ 両方が「追加して再勝負」を選ぶと積み増し。どちらかが終了すると返却されます。',waiting:'相手を待っています',fiftyoneIntro:'51点を超えないように最大5回追加で引けます。最高得点、同点ならポーカー役の強さで勝負。',start51:'♠️ 51勝負開始',point:'点',poker:'ポーカー役',bust:'51超え',hits:'追加で引いた枚数',fiftyoneHelp:'追加は5回まで。Aは1/11、絵札は10。役は同点の決着にも使います。',pickRoulette:'ルーレットの予想を選んでコインを置こう。代表が回し、回っている間に誰でも止められます。',red:'赤（奇数）',black:'黒（偶数）',low:'1～6',high:'7～12',number:'数字',placeBet:'🪙 コインを置く',startSpin:'🎡 ルーレットを回す',stopSpin:'✋ 今止める！',wheelResult:'出た数字',dice:'🎲 追加10枚でサイコロ挑戦',diceNote:'サイコロ4～6なら+2点と20枚獲得、1～3なら−2点で追加10枚は失います。',yourBet:'あなたの予想',shopHelp:'架空のお店で買い物をして、レシートの下3桁をスロットでそろえよう！',shop:'買い物する',receipt:'あなたのレシート',noReceipt:'まずはお買い物！',slotSpin:'🎰 スロットを回す',receiptHit:'レシート一致なら5倍、ゾロ目なら3倍、2つ同じ数字なら1倍。',slotOther:'仲間のスロット結果',youNeedShop:'買い物してから回そう。',names:'参加者',result:'結果',history:'対戦結果',walletRefill:'🪙 体験用コインを補充',leader:'代表',inviteCopied:'招待文をコピーしました。LINEで送れます。',invitePrompt:'招待文をコピーして友達に送ってください。',invalidLogin:'ニックネームと4文字以上の合言葉が必要です。',connectionError:'接続できません。オンライン公開したURLか確認してください。',socketClosed:'接続が切れました。ページを開き直して入り直してください。',youWon:'勝利！',youLost:'敗北',joinWaiting:'友達を招待して参加してもらいましょう。'},
 en:{title:'Mori P’s Online Game Lounge',subtitle:'Play with friends using only a nickname and a passphrase',joinTitle:'Invite your friends!',joinExplain:'Enter the same passphrase to join the same room. No email or sign-up needed.',nickname:'Game nickname',phrase:'Shared passphrase (4+ characters)',phraseNotice:'A new passphrase creates a room; an existing one joins it.',enter:'Enter room',noAccount:'📌 No registration',noAccountText:'No legal name, phone number or email required.',twoToFour:'👥 Play with 2–4 people',twoToFourText:'Mahjong needs 4 players. Other games need 2 or more.',playCoins:'🪙 Fictional coins only',playCoinsText:'No purchases, transfers, or cash-outs.',soloLink:'Play the previous solo version',room:'Game room',shareNotice:'Share this website address and the passphrase with friends.',copyInvite:'Copy invitation',leave:'Leave',players:'Players',games:'Choose a game',stake:'Play coins per player',reset:'New round',hostOnly:'The room host selects the game and stake.',activity:'Activity',morip:'Mori P · Your guide',teach:'Here’s how to play!',nextTip:'Next tip ▶',privacy:'No identity or email needed. Names are temporary; the server hashes room passphrases. Rooms and coins reset on restart. No real money.',mahjong:'Team Mahjong',oicho:'Oicho-Kabu Duel',fiftyone:'51 Poker',roulette:'Stop & Dice',slots:'Receipt Slots',host:'Host',you:'You',disconnected:'Offline',hostHint:'The host chooses the game. Invite friends to join.',coins:'coins',await:'Waiting',playing:'Playing',ended:'Finished',betting:'Open for bets',spinning:'Spinning',tie:'Tie!',shopping:'Shopping',waitingMahjong:'Team Mahjong requires exactly four people.',startMahjong:'🀄 Start 4-player mahjong',glass:'🫧 See-through tiles',mahjongIntro:'Players 1+3 form a team against 2+4. On your turn, select a tile and confirm with Discard this tile.',wall:'Tiles left',team:'Team',turn:'Turn',tileDiscard:'Tap a tile to discard',tsumo:'Self-draw win!',yourHand:'Your tiles',hidden:'Hidden',win:'Winner',roundDraw:'Draw',again:'Play again',oichoIntro:'Choose two players to duel. Ties keep the pot and allow extra wagers.',challenger:'Player 1',opponent:'Player 2',startOi:'🃏 Start duel',pot:'Coin pot',round:'Round',twoCards:'Cards',oiHelp:'The last digit of your card total wins; 9 is highest. Draw one card or stand.',drawCard:'Draw one more',stand:'Stand',rematch:'🪙 Add coins & rematch',refund:'End tie & refund',oiTieNote:'Tie! Both players must agree to add the same stake. Either can choose a refund.',waiting:'Waiting for opponent',fiftyoneIntro:'Get as close to 51 as possible; draw up to five extra cards. Poker hands break ties.',start51:'♠️ Start 51 Poker',point:'points',poker:'Poker hand',bust:'Over 51',hits:'Extra draws',fiftyoneHelp:'Up to 5 hits. A is 1 or 11 and face cards are 10. Poker hands break equal points.',pickRoulette:'Pick a roulette bet. The host spins, and anyone can stop the wheel.',red:'Red (odd)',black:'Black (even)',low:'1–6',high:'7–12',number:'Number',placeBet:'🪙 Place bet',startSpin:'🎡 Spin wheel',stopSpin:'✋ Stop now!',wheelResult:'Final number',dice:'🎲 Risk 10 coins on dice',diceNote:'Roll 4–6: +2 points, earn 20 coins. Roll 1–3: −2 points, lose 10 coins.',yourBet:'Your bet',shopHelp:'Shop at a fictional store and match the last 3 digits of your receipt.',shop:'Buy item',receipt:'Your receipt',noReceipt:'Shop first!',slotSpin:'🎰 Spin slots',receiptHit:'Exact receipt = 5×, any triple = 3×, pair = 1×.',slotOther:'Friends’ slot results',youNeedShop:'Buy an item first.',names:'Players',result:'Result',history:'Results',walletRefill:'🪙 Refill play coins',leader:'Host',inviteCopied:'Invitation copied. Share it with friends.',invitePrompt:'Copy and share this invitation.',invalidLogin:'Enter a nickname and a passphrase of at least 4 characters.',connectionError:'Could not connect. Check that you opened the hosted website.',socketClosed:'Connection closed. Reload and rejoin.',youWon:'You won!',youLost:'You lost',joinWaiting:'Invite friends to join.'},
 zh:{title:'森P在线游戏大厅',subtitle:'只用昵称和口令与朋友一起玩',joinTitle:'邀请朋友一起玩！',joinExplain:'输入相同口令即可进入同一个房间，无需邮箱或注册。',nickname:'游戏昵称',phrase:'大家约定的口令（至少4个字）',phraseNotice:'新口令会创建房间；已有口令则加入房间。',enter:'进入房间',noAccount:'📌 无需注册',noAccountText:'不需要真实姓名、电话或邮箱。',twoToFour:'👥 2～4人游玩',twoToFourText:'麻将需4人，其他对战至少2人。',playCoins:'🪙 仅限虚拟金币',playCoinsText:'不可购买、转让或兑换现金。',soloLink:'游玩之前的单人版本',room:'对战房间',shareNotice:'把网页地址和口令发给朋友。',copyInvite:'复制邀请文字',leave:'退出',players:'玩家',games:'选择游戏',stake:'每位玩家虚拟金币',reset:'新一局',hostOnly:'房主选择游戏和下注额。',activity:'游戏记录',morip:'森P・游戏导师',teach:'我来教你怎么玩！',nextTip:'下一条提示 ▶',privacy:'无需填写个人身份或邮箱。服务器对口令进行哈希处理；重启时房间和金币会重置。无真钱交易。',mahjong:'双人组队麻将',oicho:'花札九点对决',fiftyone:'51点扑克',roulette:'停止轮盘与骰子',slots:'购物小票老虎机',host:'房主',you:'你',disconnected:'离线',hostHint:'房主负责选择游戏。邀请朋友吧。',coins:'金币',await:'等待中',playing:'进行中',ended:'结束',betting:'下注中',spinning:'旋转中',tie:'平局！',shopping:'购物',waitingMahjong:'组队麻将需要4人。',startMahjong:'🀄 开始四人麻将',glass:'🫧 透明麻将牌',mahjongIntro:'第1+3位玩家为一队，对抗第2+4位。轮到你时点选一张牌打出。',wall:'剩余牌',team:'队伍',turn:'回合',tileDiscard:'点击打出牌',tsumo:'自摸！',yourHand:'你的牌',hidden:'隐藏',win:'获胜者',roundDraw:'流局',again:'再来一次',oichoIntro:'选择两位玩家对决。平局后可以追加金币继续争夺奖池。',challenger:'玩家1',opponent:'玩家2',startOi:'🃏 开始对决',pot:'金币池',round:'局数',twoCards:'牌',oiHelp:'牌的点数相加取个位数，9最大。可再抽一张或停牌。',drawCard:'再抽一张',stand:'停牌',rematch:'🪙 追加金币再赛',refund:'平局结束并退回金币',oiTieNote:'平局！双方同意才会加注重赛；任意一方可选择退还奖池。',waiting:'等待对手',fiftyoneIntro:'最多再抽5张，尽量接近51点而不要超过。扑克牌型用于平分决胜。',start51:'♠️ 开始51点',point:'点',poker:'扑克牌型',bust:'超过51',hits:'额外抽牌',fiftyoneHelp:'最多再抽5张。A可作1或11，花牌为10。点数相同由扑克牌型决定。',pickRoulette:'选择下注，房主开始旋转，任何玩家都可停止轮盘。',red:'红（奇数）',black:'黑（偶数）',low:'1～6',high:'7～12',number:'数字',placeBet:'🪙 放置金币',startSpin:'🎡 开始旋转',stopSpin:'✋ 立即停止！',wheelResult:'停在数字',dice:'🎲 追加10枚掷骰子',diceNote:'掷出4～6加2分并获得20枚，1～3减2分并损失10枚。',yourBet:'你的下注',shopHelp:'在虚拟商店购物，再用小票金额末三位作为老虎机目标！',shop:'购买',receipt:'你的小票',noReceipt:'请先购物！',slotSpin:'🎰 转动老虎机',receiptHit:'小票一致5倍、三同号3倍、两同号1倍。',slotOther:'朋友的结果',youNeedShop:'请先购物。',names:'玩家',result:'结果',history:'历史',walletRefill:'🪙 补充体验金币',leader:'房主',inviteCopied:'邀请已复制。可发给朋友。',invitePrompt:'复制邀请内容并分享。',invalidLogin:'请输入昵称和至少4个字符的口令。',connectionError:'连接失败，请检查是否使用公开的网址。',socketClosed:'连接已断开，请重新加载。',youWon:'胜利！',youLost:'失败',joinWaiting:'邀请朋友加入吧。'},
 ko:{title:'모리P 온라인 게임 라운지',subtitle:'닉네임과 암호만으로 친구와 함께!',joinTitle:'친구를 초대하세요!',joinExplain:'같은 암호를 입력하면 같은 방에 들어옵니다. 이메일과 회원가입은 필요 없습니다.',nickname:'게임 닉네임',phrase:'함께 정한 암호(4자 이상)',phraseNotice:'새 암호는 새 방을 만들고, 기존 암호는 해당 방에 입장합니다.',enter:'입장',noAccount:'📌 가입 불필요',noAccountText:'실명, 전화번호, 이메일이 필요 없습니다.',twoToFour:'👥 2~4명 플레이',twoToFourText:'마작은 4명, 다른 대전은 2명부터 가능합니다.',playCoins:'🪙 가상 코인만 사용',playCoinsText:'구입·양도·현금 교환 불가.',soloLink:'이전 1인용 게임 하기',room:'게임 방',shareNotice:'사이트 주소와 암호를 친구에게 전달하세요.',copyInvite:'초대 메시지 복사',leave:'퇴장',players:'참가자',games:'게임 선택',stake:'1인당 가상 코인',reset:'새 게임',hostOnly:'방장이 게임과 베팅액을 선택합니다.',activity:'게임 기록',morip:'모리P · 게임 안내자',teach:'게임 방법을 알려줄게!',nextTip:'다음 설명 ▶',privacy:'개인 신상이나 이메일은 필요 없습니다. 암호는 서버에서 해시 처리하며, 재시작 시 방과 코인이 사라집니다. 실제 돈은 사용할 수 없습니다.',mahjong:'2대2 팀 마작',oicho:'오이초카부 대결',fiftyone:'51 포커',roulette:'스톱 & 주사위',slots:'영수증 슬롯',host:'방장',you:'나',disconnected:'오프라인',hostHint:'방장이 게임을 선택합니다. 친구를 초대하세요.',coins:'코인',await:'대기',playing:'진행 중',ended:'종료',betting:'베팅 중',spinning:'회전 중',tie:'무승부!',shopping:'쇼핑',waitingMahjong:'팀 마작은 4명이 필요합니다.',startMahjong:'🀄 4인 마작 시작',glass:'🫧 투명 패',mahjongIntro:'1+3번이 한 팀, 2+4번이 다른 팀입니다. 차례가 되면 패를 탭하세요.',wall:'남은 패',team:'팀',turn:'차례',tileDiscard:'버릴 패 터치',tsumo:'쯔모!',yourHand:'내 패',hidden:'비공개',win:'승자',roundDraw:'유국',again:'다시 하기',oichoIntro:'2명을 선택하여 대결합니다. 무승부면 코인을 더 걸고 다시 겨룹니다.',challenger:'플레이어 1',opponent:'플레이어 2',startOi:'🃏 대결 시작',pot:'쌓인 코인',round:'라운드',twoCards:'카드',oiHelp:'카드 합계 일의 자리로 승부하며 9가 최고입니다. 한 장 더 뽑거나 멈추세요.',drawCard:'한 장 더',stand:'그만 뽑기',rematch:'🪙 코인 추가하고 재대결',refund:'무승부 종료 및 환불',oiTieNote:'무승부! 양쪽이 추가 베팅에 동의하면 재대결합니다. 한 명이 종료하면 돌려줍니다.',waiting:'상대 기다리는 중',fiftyoneIntro:'51점을 넘지 않도록 추가로 최대 5장을 뽑습니다. 동점이면 포커 족보로 겨룹니다.',start51:'♠️ 51 게임 시작',point:'점',poker:'포커 족보',bust:'51 초과',hits:'추가 카드',fiftyoneHelp:'최대 5장 추가. A는 1/11, 그림 카드는 10. 동점이면 포커 족보로 결정.',pickRoulette:'베팅을 선택하세요. 방장이 돌리고 누구나 멈출 수 있습니다.',red:'빨강(홀수)',black:'검정(짝수)',low:'1~6',high:'7~12',number:'숫자',placeBet:'🪙 코인 놓기',startSpin:'🎡 돌리기',stopSpin:'✋ 지금 멈추기!',wheelResult:'나온 숫자',dice:'🎲 코인 10개로 주사위 도전',diceNote:'4~6이면 +2점과 20코인, 1~3이면 -2점과 코인 10개 손실.',yourBet:'내 베팅',shopHelp:'가상 가게에서 쇼핑한 영수증 끝 3자리를 슬롯에서 맞혀 보세요!',shop:'구매',receipt:'내 영수증',noReceipt:'먼저 쇼핑!',slotSpin:'🎰 슬롯 돌리기',receiptHit:'영수증 일치 5배, 같은 숫자 3개 3배, 2개 1배.',slotOther:'친구의 결과',youNeedShop:'먼저 물건을 구매하세요.',names:'참가자',result:'결과',history:'기록',walletRefill:'🪙 체험 코인 충전',leader:'방장',inviteCopied:'초대 메시지를 복사했습니다.',invitePrompt:'초대 메시지를 복사해 공유하세요.',invalidLogin:'닉네임과 4자 이상의 암호를 입력하세요.',connectionError:'연결할 수 없습니다. 공개 사이트 URL을 확인하세요.',socketClosed:'연결이 끊겼습니다. 새로고침 후 재입장하세요.',youWon:'승리!',youLost:'패배',joinWaiting:'친구를 초대하세요.'}
};
const COACH={
 ja:{mahjong:['森Pだよ！ 4人集まったら「コンビ麻雀」を始めよう。1番と3番、2番と4番がチームだよ。','自分の手番で1枚引いて、捨てる牌をタップ。4面子と1雀頭になったらツモできるよ。','透明牌は相手の牌の一部が見える特別ルール。チームで勝てば2人とも架空コインが増える！'],oicho:['親子なしの1対1勝負！ 2枚で勝負するか、さらに1枚引くか選ぶんだ。','合計の下一桁が9に近いほうが勝ち。同点ならコインは積まれたまま！','両者が同じ額を追加して再勝負できるよ。嫌なら引き分けで返却だ。'],fiftyone:['今度は21じゃない、51を目指す新しいカードゲーム！','Aは1か11、絵札は10。追加で引くのは最大5回までだよ。','51以下で大きい点が強い。同点はポーカーの役で決めるぞ。'],roulette:['まず赤黒や数字に架空コインを置こう。','代表がルーレットを回し、誰でも途中でストップできるぞ！','決着後はサイコロ。コインを追加して+2点を狙えるけど−2点になることも！'],slots:['架空のお店で飲み物やお菓子を選んで買い物するんだ。','購入金額の下3桁がスロットの目標。たとえば111コインなら「111」！','目標一致で5倍、ゾロ目なら3倍。友達の結果も一緒に見られるぞ。']},
 en:{mahjong:['Mori P here! Four players split into two teams: seats 1+3 versus 2+4.','Draw and tap one tile to discard. Make four sets and a pair to win.','See-through tiles reveal some opponent tiles. Winning teammates both earn play coins!'],oicho:['No banker: two players duel head to head. Draw one extra card or stand.','The last digit closest to 9 wins. A tie keeps the coins in the pot!','Both players can add the same stake to rematch, or end the tie and refund.'],fiftyone:['The goal is 51, not 21!','A is 1 or 11, face cards are 10. You may draw five extra cards.','Highest score at or below 51 wins. Poker hands break ties.'],roulette:['Place play coins on red, black, a range, or a number.','The host spins, but any player can stop the wheel while it moves.','Try a dice bonus: risk 10 coins for +2 or −2 score.'],slots:['Shop at the fictional store!','The last three digits of the receipt are your slot target.','Match your receipt for 5× coins; triples give 3×. Watch your friends too!']},
 zh:{mahjong:['森P来了！四位玩家分两队：1+3对2+4。','轮到你时抽一张、打出一张。四组面子加一对将可获胜。','透明牌会露出部分对手的牌。获胜队友都能赚取虚拟金币！'],oicho:['没有庄家：两位玩家直接对决。选择抽一张或停牌。','合计个位数越接近9越强。平局时奖池保留。','双方都追加同额金币就能重赛，也可平局退还。'],fiftyone:['目标不是21，而是51点！','A为1或11，花牌10点；最多加抽5张。','51以下最高者获胜；同点比较扑克牌型。'],roulette:['在颜色、范围或数字上放置虚拟金币。','房主开始旋转，任何玩家都可以中途停止！','追加10枚掷骰，可能+2分，也可能−2分。'],slots:['先在虚拟商店买点东西！','小票金额后三位就是老虎机目标。','匹配小票获得5倍，三个同号获得3倍。']},
 ko:{mahjong:['모리P 등장! 4명이 1+3, 2+4 팀으로 나뉘어요.','내 차례에 한 장 뽑고 한 장 버리세요. 4개 몸통과 1개 머리를 만들면 승리!','투명 패로 상대 패 일부를 볼 수 있고 팀원 모두 코인을 받아요.'],oicho:['딜러 없이 두 사람이 대결합니다. 한 장 더 뽑거나 멈추세요.','합계 일의 자리가 9에 가까울수록 강하고, 비기면 코인을 유지해요.','둘 다 코인을 추가하면 재대결, 아니면 무승부 환불!'],fiftyone:['21이 아닌 51을 목표로 해요!','A는 1 또는 11, 그림 카드는 10. 최대 5장을 더 뽑습니다.','51 이하 최고 점수 승리, 동점은 포커 족보로 결정!'],roulette:['빨강, 검정, 숫자에 코인을 놓아요.','방장이 돌리고 누구든 도중에 멈출 수 있어요!','주사위에 코인 10개를 걸어 +2점 또는 -2점에 도전.'],slots:['가상 상점에서 물건을 사세요!','영수증 마지막 세 자리를 슬롯 목표로 삼아요.','일치하면 5배, 같은 숫자 세 개면 3배!']}
};
const EVENTS={ja:{joined:'{name} が入室しました',left:'{name} が接続を離れました',modeChanged:'ゲームを変更しました',refilled:'{name} がコインを補充しました',mahjongStarted:'コンビ麻雀が始まりました',mahjongWon:'{name} が {method} であがりました！',mahjongDraw:'流局・コイン返却',oichoStart:'{a} vs {b}！',oichoWon:'{name} の勝利（{a} 対 {b}）',oichoTie:'同点 {a} 対 {b}！',oichoAgain:'第{rounds}戦、合計{pot}枚のコイン！',oichoRefund:'引き分け・コインを返却しました',fiftyoneStarted:'51ポーカー開始',fiftyoneResult:'51ポーカー結果：{names}',wheelStarted:'ルーレット回転！',wheelStopped:'停止：{number}',betPlaced:'{name} がコインを置きました',diceResult:'{name} のサイコロ {die}（{delta}点）',bought:'{name} が{cost}コインの買い物',slotResult:'{name} のスロット：{reels}（{multi}倍）'},en:{joined:'{name} joined',left:'{name} disconnected',modeChanged:'Game changed',refilled:'{name} refilled coins',mahjongStarted:'Team Mahjong started',mahjongWon:'{name} won by {method}!',mahjongDraw:'Draw, coins refunded',oichoStart:'{a} vs {b}!',oichoWon:'{name} wins ({a} vs {b})',oichoTie:'Tie: {a} vs {b}!',oichoAgain:'Round {rounds}, {pot} coins in pot',oichoRefund:'Tie refunded',fiftyoneStarted:'51 Poker started',fiftyoneResult:'51 Poker winners: {names}',wheelStarted:'Wheel spinning!',wheelStopped:'Stopped: {number}',betPlaced:'{name} placed a bet',diceResult:'{name} rolled {die} ({delta} pts)',bought:'{name} shopped for {cost} coins',slotResult:'{name} spun {reels} ({multi}×)'},zh:{joined:'{name} 加入了',left:'{name} 离线',modeChanged:'游戏已更换',refilled:'{name} 补充金币',mahjongStarted:'麻将开始',mahjongWon:'{name} {method} 获胜！',mahjongDraw:'流局退币',oichoStart:'{a} 对 {b}',oichoWon:'{name} 获胜（{a}:{b}）',oichoTie:'平局 {a}:{b}',oichoAgain:'第{rounds}局，奖池{pot}',oichoRefund:'平局退币',fiftyoneStarted:'51点开始',fiftyoneResult:'51点赢家：{names}',wheelStarted:'轮盘转动',wheelStopped:'停止数字：{number}',betPlaced:'{name} 已下注',diceResult:'{name} 掷出{die}（{delta}分）',bought:'{name} 买了{cost}金币的商品',slotResult:'{name} 结果：{reels}（{multi}倍）'},ko:{joined:'{name} 입장',left:'{name} 연결 끊김',modeChanged:'게임 변경',refilled:'{name} 코인 충전',mahjongStarted:'마작 시작',mahjongWon:'{name} {method} 승리!',mahjongDraw:'유국, 코인 반환',oichoStart:'{a} vs {b}!',oichoWon:'{name} 승리({a}:{b})',oichoTie:'무승부 {a}:{b}',oichoAgain:'{rounds}라운드, {pot}코인',oichoRefund:'무승부 환불',fiftyoneStarted:'51포커 시작',fiftyoneResult:'51포커 승자: {names}',wheelStarted:'룰렛 회전!',wheelStopped:'멈춘 숫자: {number}',betPlaced:'{name} 베팅',diceResult:'{name} 주사위 {die}({delta}점)',bought:'{name} {cost}코인 구매',slotResult:'{name} 슬롯 {reels}({multi}배)'}};
const ERR={ja:{invalidLogin:'名前と合言葉を確認してください。',roomsFull:'部屋数の上限です。',roomFull:'この部屋は4人で満員です。',nameUsed:'同じ名前の人がいます。',coinsLow:'コイン不足です。補充してください。',needFour:'4人全員が接続したら開始できます。',needTwo:'2人以上必要です。',needTwoBets:'2人以上がコインを置いてください。',chooseTwo:'異なる2人を選んでください。',notHost:'この操作は代表だけです。',notTurn:'まだあなたの手番ではありません。',notPlaying:'この操作は今はできません。',alreadyChosen:'すでに選択しました。',spinTooSoon:'あと少し回してから止めてください。',needShop:'先にお買い物してください。',slowDown:'操作が多すぎます。少し待ってください。',notJoined:'入室してください。',badAction:'操作を確認してください。'},en:{invalidLogin:'Check nickname and passphrase.',roomFull:'Room already has 4 players.',nameUsed:'Nickname already in use.',coinsLow:'Not enough coins. Refill.',needFour:'All 4 players must be connected.',needTwo:'At least 2 players required.',needTwoBets:'At least 2 bets required.',chooseTwo:'Choose two different players.',notHost:'Host only.',notTurn:'Not your turn.',notPlaying:'Not available right now.',alreadyChosen:'Already chosen.',spinTooSoon:'Let it spin a little longer.',needShop:'Shop first.',slowDown:'Too many actions. Try again.',badAction:'Action unavailable.'},zh:{roomFull:'房间已有4人。',nameUsed:'昵称已使用。',coinsLow:'金币不足，请补充。',needFour:'需要4人在线。',needTwo:'至少需要2人。',needTwoBets:'需要2人下注。',chooseTwo:'选择两位不同的玩家。',notHost:'仅限房主操作。',notTurn:'尚未轮到你。',notPlaying:'现在不能操作。',alreadyChosen:'已经选择。',spinTooSoon:'再转一会儿。',needShop:'先购物。',badAction:'操作无效。'},ko:{roomFull:'방에 4명이 있습니다.',nameUsed:'이미 사용 중인 닉네임입니다.',coinsLow:'코인이 부족합니다. 충전하세요.',needFour:'4명이 온라인이어야 합니다.',needTwo:'최소 2명 필요합니다.',needTwoBets:'최소 2명이 베팅해야 합니다.',chooseTwo:'서로 다른 2명을 선택하세요.',notHost:'방장만 가능합니다.',notTurn:'아직 내 차례가 아닙니다.',notPlaying:'지금은 사용할 수 없습니다.',alreadyChosen:'이미 선택했습니다.',spinTooSoon:'조금 더 돌려 주세요.',needShop:'먼저 쇼핑하세요.',badAction:'유효하지 않은 동작입니다.'}};
const sessionGet=k=>{try{return sessionStorage.getItem(k)}catch{return null}};
const sessionSet=(k,v)=>{try{sessionStorage.setItem(k,v)}catch{}};
const sessionRemove=k=>{try{sessionStorage.removeItem(k)}catch{}};
let lang='ja', ws=null,state=null,token=null,gameTip=0,phrase='',nickname='',glass=true,oiA='',oiB='',roulettePick='red';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const txt=k=>LABELS[lang][k]||LABELS.ja[k]||k;
const format=(v,params={})=>String(v||'').replace(/\{(\w+)\}/g,(_,k)=>String(params[k]??''));
const button=(label,act,val='',disabled=false,cls='')=>`<button class="button ${cls}" data-act="${esc(act)}" data-val="${esc(val)}" ${disabled?'disabled':''}>${esc(label)}</button>`;
const me=()=>state?.players.find(x=>x.id===state.me);
const canHost=()=>state?.host===state?.me;
const playerName=id=>state?.players.find(p=>p.id===id)?.name||'—';
const countPlayers=()=>state?.players.filter(p=>p.connected).length||0;
function setStatus(message,join=false){$(join?'joinStatus':'gameStatus').textContent=message;}
function changeLang(next){lang=LABELS[next]?next:'ja';document.documentElement.lang=lang;$('language').value=lang;document.querySelectorAll('[data-i]').forEach(el=>el.textContent=txt(el.dataset.i));document.querySelectorAll('[data-game-label]').forEach(el=>el.textContent=txt(el.dataset.gameLabel)); if(state)render();}
$('language').addEventListener('change',e=>changeLang(e.target.value));
$('joinBtn').onclick=()=>{
 nickname=$('name').value.trim();phrase=$('phrase').value.trim();
 if(!nickname||phrase.length<4){setStatus(txt('invalidLogin'),true);return;}
 try{if(ws)ws.close();ws=new WebSocket((location.protocol==='https:'?'wss':'ws')+'://'+location.host);}
 catch{setStatus(txt('connectionError'),true);return;}
 $('joinBtn').disabled=true;setStatus('…',true);
 ws.onopen=()=>ws.send(JSON.stringify({type:'join',name:nickname,phrase,character:window.starSelected||1,token:sessionGet('morip_token_'+nickname)||''}));
 ws.onmessage=event=>{
  let msg;try{msg=JSON.parse(event.data);}catch{return;}
  if(msg.type==='joined') {token=msg.token;sessionSet('morip_token_'+nickname,token);$('joinPage').hidden=true;$('roomPage').hidden=false;setStatus('',true);$('joinBtn').disabled=false;}
  else if(msg.type==='state'){const last=state?.game;state=msg;if(last!==state.game)gameTip=0;render();}
  else if(msg.type==='error'){const label=ERR[lang]?.[msg.key]||ERR.ja[msg.key]||msg.key;setStatus(label,!state);$('joinBtn').disabled=false;}
 };
 ws.onerror=()=>{setStatus(txt('connectionError'),!state);$('joinBtn').disabled=false;};
 ws.onclose=()=>{if(state){setStatus(txt('socketClosed'));}else setStatus(txt('connectionError'),true);$('joinBtn').disabled=false;};
};
$('leaveBtn').onclick=()=>{sessionRemove('morip_token_'+nickname);ws?.close();ws=null;state=null;$('roomPage').hidden=true;$('joinPage').hidden=false;setStatus('');};
$('inviteBtn').onclick=async()=>{
 const msg=lang==='en'?`Join my Mori P Game Lounge!\nWebsite: ${location.origin}\nPassphrase: ${phrase}\nUse any game nickname — no registration needed.`:lang==='zh'?`来森P游戏大厅一起玩吧！\n网址：${location.origin}\n口令：${phrase}\n只需要游戏昵称，无需注册。`:lang==='ko'?`모리P 게임 라운지에 초대해요!\n주소: ${location.origin}\n암호: ${phrase}\n게임 닉네임만 입력하면 됩니다.`:`森Pのゲームラウンジで一緒に遊ぼう！\nゲームのURL：${location.origin}\n合言葉：${phrase}\n好きなゲーム名で入室してね。メール登録は不要だよ！`;
 try{await navigator.clipboard.writeText(msg);setStatus(txt('inviteCopied'));}catch{window.prompt(txt('invitePrompt'),msg);}
};
$('games').onclick=e=>{const b=e.target.closest('[data-game]');if(!b||!canHost())return;sendAction('config',{game:b.dataset.game,stake:Number($('stake').value)});};
$('stake').onchange=()=>{if(canHost())sendAction('config',{game:state.game,stake:Number($('stake').value)});};
$('resetBtn').onclick=()=>sendAction('restart');
$('coachNext').onclick=()=>{gameTip++;renderCoach();};
$('board').onclick=e=>{
 const b=e.target.closest('[data-act]');if(!b||b.disabled)return;
 const a=b.dataset.act,val=b.dataset.val;
 if(a==='startMahjong')sendAction(a,{glass});
 else if(a==='discard')sendAction(a,{tile:Number(val)});
 else if(a==='startOi')sendAction(a,{challenger:oiA,opponent:oiB});
 else if(a==='oiChoice'||a==='choice51')sendAction(a,{hit:val==='true'});
 else if(a==='rouletteBet')sendAction(a,{pick:roulettePick});
 else if(a==='shop')sendAction(a,{cost:Number(val)});
 else sendAction(a);
};
$('board').onchange=e=>{
 if(e.target.id==='glassSwitch')glass=e.target.checked;
 if(e.target.id==='oichoA')oiA=e.target.value;
 if(e.target.id==='oichoB')oiB=e.target.value;
 if(e.target.id==='wheelPick')roulettePick=e.target.value;
};
function sendAction(action,more={}){if(ws?.readyState===WebSocket.OPEN){ws.send(JSON.stringify({type:'action',action,...more}));setStatus('');}}
function render(){
 if(!state)return;
 $('playerCount').textContent=`${countPlayers()}/4`;
 $('players').innerHTML=state.players.map((p,i)=>`<div class="player ${p.id===state.me?'you':''} ${p.connected?'':'muted'}"><span class="player-name"><b>${i+1}. ${esc(p.name)}</b>${p.id===state.me?` <small>(${esc(txt('you'))})</small>`:''} ${p.id===state.host?'👑':''}${p.connected?'':' ⚪'}</span><span class="highlight">🪙 ${p.coins.toLocaleString()}</span></div>`).join('');
 $('hostHint').textContent=canHost()?txt('leader')+': '+(me()?.name||''):txt('hostHint');
 document.querySelectorAll('#games [data-game]').forEach(b=>{b.classList.toggle('active',b.dataset.game===state.game);b.disabled=!canHost();});
 $('stake').value=String(state.stake);$('stake').disabled=!canHost();$('resetBtn').disabled=!canHost();
 $('gameTitle').textContent=txt(state.game);$('gameState').textContent=txt(state.session?.phase||'await');
 $('activity').innerHTML=state.log.map(event=>`<div class="entry">${esc(format(EVENTS[lang]?.[event.key]||EVENTS.ja[event.key]||event.key,event.params))}</div>`).join('');
 $('gameInfo').textContent=({mahjong:txt('mahjongIntro'),oicho:txt('oichoIntro'),fiftyone:txt('fiftyoneIntro'),roulette:txt('pickRoulette'),slots:txt('shopHelp')})[state.game];
 $('board').innerHTML=({mahjong:renderMahjong,oicho:renderOicho,fiftyone:render51,roulette:renderRoulette,slots:renderSlots})[state.game]();
 renderCoach();
}
function renderCoach(){ if(!state)return;const tips=COACH[lang][state.game]||COACH.ja[state.game];$('coachMessage').textContent=tips[gameTip%tips.length]; }
function nameSeat(p){return `${esc(p.name)}${p.id===state.me?' ✨':''}`;}
function stack(value){let n=Math.min(10,Math.ceil(value/50));return `<div class="pile">${Array.from({length:n},()=>'<b></b>').join('')}</div>`;}
function tileName(t){if(t===null||t===undefined)return '🂠';if(t<27)return `${t%9+1}${['萬','索','筒'][Math.floor(t/9)]}`;return ['東','南','西','北','白','發','中'][t-27];}
function renderMahjong(){
 const s=state.session;
 if(!s||s.type!=='mahjong')return `<div class="tablebox"><p>${esc(txt('waitingMahjong'))}</p><p>${esc(txt('mahjongIntro'))}</p><label><input type="checkbox" id="glassSwitch" ${glass?'checked':''}> ${esc(txt('glass'))}</label><div class="controls">${button(txt('startMahjong'),'startMahjong','',!canHost()||countPlayers()!==4,'gold')}</div></div>`;
 const current=s.players.find(p=>s.players[s.turn]?.id===p.id),isTurn=s.phase==='playing'&&current?.id===state.me;
 const winner=s.winner?playerName(s.winner.id)+' ('+s.winner.method+')':txt('roundDraw');
 return `<div class="tablebox"><div class="row"><span class="pill">${esc(txt('wall'))}: ${s.wall}</span><span class="pill">${esc(txt('turn'))}: ${esc(current?.name||'—')}</span><span class="pill">${esc(txt('glass'))}: ${s.glass?'ON':'OFF'}</span></div>${s.phase==='ended'?`<p class="highlight">🏆 ${esc(winner)}</p>${canHost()?button(txt('again'),'startMahjong','',false,'gold'):''}`:''}</div>
 ${s.players.map(p=>`<div class="seat"><div class="sec-head"><b>${esc(p.name)} <small>(${esc(txt('team'))} ${p.team===0?'A':'B'})</small></b><span class="pill ${s.phase==='playing'&&s.players[s.turn].id===p.id?'ok':''}">${p.hand.length} 🀄</span></div><div class="tileline">${p.hand.map(t=>`<button class="tile ${t===null?'opaque':p.id!==state.me?'glass':''}" ${p.id===state.me&&isTurn?'data-act="discard" data-val="'+t+'"':'disabled'}>${esc(tileName(t))}</button>`).join('')}</div><div class="tileline">${(p.discard||[]).map(t=>`<span class="tile discarded">${esc(tileName(t))}</span>`).join('')}</div>${p.id===state.me&&s.canTsumo?button(txt('tsumo'),'tsumo','',false,'gold'):''}</div>`).join('')}`;
}
const formSelect=(id,options,value)=>`<select id="${id}">${options.map(o=>`<option value="${esc(o.id)}" ${o.id===value?'selected':''}>${esc(o.name)}</option>`).join('')}</select>`;
function cardName(c){if(c===undefined||c===null)return '🂠';const rank=c%13+1;return `${['♠','♥','♦','♣'][Math.floor(c/13)]}${rank===1?'A':rank===11?'J':rank===12?'Q':rank===13?'K':rank}`;}
function cardList(cards,asNums=false){if(!Array.isArray(cards))return `<div class="cardline">${Array.from({length:cards?.count||2},()=>'<span class="card hidden">?</span>').join('')}</div>`;return `<div class="cardline">${cards.map(c=>`<span class="card ${!asNums&&[1,2].includes(Math.floor(c/13))?'red':''}">${esc(asNums?String(c):cardName(c))}</span>`).join('')}</div>`;}
function renderOicho(){
 const s=state.session,players=state.players.filter(x=>x.connected);
 if(!oiA||!players.some(p=>p.id===oiA))oiA=players[0]?.id||'';
 if(!oiB||!players.some(p=>p.id===oiB))oiB=players[1]?.id||'';
 if(!s||s.type!=='oicho')return `<div class="tablebox"><p>${esc(txt('oichoIntro'))}</p><div class="row"><label>${esc(txt('challenger'))} ${formSelect('oichoA',players,oiA)}</label><label>${esc(txt('opponent'))} ${formSelect('oichoB',players,oiB)}</label></div>${button(txt('startOi'),'startOi','',!canHost()||players.length<2||oiA===oiB,'gold')}</div>`;
 const involved=[s.challenger,s.opponent].includes(state.me);
 return `<div class="tablebox"><div class="row"><span class="pill">${esc(txt('round'))}: ${s.rounds}</span><span class="pill highlight">${esc(txt('pot'))}: ${s.pot} 🪙</span></div>${stack(s.pot)}</div>
 ${[s.challenger,s.opponent].map((id,i)=>`<div class="seat"><b>${esc(playerName(id))}</b>${cardList(s.hands[id],true)}${s.outcome?`<span class="pill">${i===0?s.outcome.a:s.outcome.b} ${esc(txt('point'))}</span>`:''}${s.choices[id]&&s.phase==='playing'?`<span class="pill ok">✓</span>`:''}${s.ready[id]?'<span class="pill ok">🪙 ✓</span>':''}</div>`).join('')}
 ${s.phase==='playing'?involved?`<p>${esc(txt('oiHelp'))}</p><div class="controls">${button(txt('drawCard'),'oiChoice','true',!!s.choices[state.me],'gold')}${button(txt('stand'),'oiChoice','false',!!s.choices[state.me])}</div>`:`<p>${esc(txt('waiting'))}</p>`:''}
 ${s.phase==='tie'?`<p class="highlight">${esc(txt('oiTieNote'))}</p>${involved?`<div class="controls">${button(txt('rematch'),'oiRematch','',!!s.ready[state.me]||me().coins<s.stake,'gold')}${button(txt('refund'),'oiRefund')}</div>`:''}`:''}
 ${s.phase==='ended'?`<p class="highlight">🏆 ${esc(s.outcome?.winner?playerName(s.outcome.winner):txt('tie'))}</p>${canHost()?button(txt('again'),'startOi','',false,'gold'):''}`:''}`;
}
function calc51(cards){if(!Array.isArray(cards))return null;let sum=0,aces=0;for(const c of cards){const v=c%13+1;sum+=v===1?1:Math.min(v,10);if(v===1)aces++;}for(let i=0;i<aces;i++)if(sum+10<=51)sum+=10;return sum;}
function render51(){
 const s=state.session;
 if(!s||s.type!=='fiftyone')return `<div class="tablebox"><p>${esc(txt('fiftyoneIntro'))}</p><div class="controls">${button(txt('start51'),'start51','',!canHost()||countPlayers()<2,'gold')}</div></div>`;
 return `<div class="tablebox"><p>${esc(txt('fiftyoneHelp'))}</p><span class="pill">${s.participants.length} ${esc(txt('names'))}</span></div>
 ${s.participants.map(id=>{const cards=s.hands[id],st=s.status[id],points=calc51(cards),win=s.result?.winners.includes(id);return `<div class="seat"><div class="sec-head"><b>${esc(playerName(id))}${win?' 🏆':''}</b><span class="pill">${st.hits}/5</span></div>${cardList(cards)}${points!==null?`<span class="pill ${points>51?'warn':'ok'}">${points} / 51 ${points>51?esc(txt('bust')):''}</span>`:''}${st.done?'<span class="pill">✓</span>':''}${id===state.me&&s.phase==='playing'&&!st.done?`<div class="controls">${button(txt('drawCard'),'choice51','true',false,'gold')}${button(txt('stand'),'choice51','false')}</div>`:''}</div>`;}).join('')}
 ${s.phase==='ended'?`<div class="tablebox"><b>🏆 ${esc(s.result.winners.map(playerName).join(' / ')||txt('roundDraw'))}</b><div class="row">${s.result.ranking.map(x=>`<span class="pill">${esc(playerName(x.id))}: ${x.points} ${esc(txt('point'))} · ${esc(txt('poker'))} ${x.rank}</span>`).join('')}</div>${canHost()?button(txt('again'),'start51','',false,'gold'):''}</div>`:''}`;
}
function renderRoulette(){
 const s=state.session;
 if(!s||s.type!=='roulette'||s.phase==='betting'){
 const bets=s?.type==='roulette'?s.bets:{};
 const options=['red','black','low','high',...Array.from({length:13},(_,i)=>`num:${i}`)].map(id=>({id,name:id.startsWith('num:')?txt('number')+' '+id.split(':')[1]:txt(id)}));
 return `<div class="tablebox"><p>${esc(txt('pickRoulette'))}</p><div class="row"><label>${esc(txt('yourBet'))} ${formSelect('wheelPick',options,roulettePick)}</label>${button(txt('placeBet'),'rouletteBet','',false,'gold')}</div><div class="row">${Object.entries(bets).map(([id,b])=>`<span class="pill">${esc(playerName(id))}: ${esc(b.pick)} 🪙${b.stake}</span>`).join('')}</div>${canHost()?button(txt('startSpin'),'rouletteSpin','',Object.keys(bets).length<2):''}</div>`;
 }
 return `<div class="wheel-wrap"><div class="radial ${s.phase==='spinning'?'spinning':''}"><span class="center">${s.phase==='spinning'?'🎡':s.result}</span></div><div class="tablebox"><p>${s.phase==='spinning'?esc(txt('spinning')):esc(txt('wheelResult'))}</p>${s.phase==='ended'?`<div class="big-number">${s.result}</div>`:''}<p>${Object.entries(s.bets).map(([id,b])=>`${esc(playerName(id))}: ${esc(b.pick)} ${s.phase==='ended'?(b.won?'✅':'✖️'):''}`).join('　')}</p>${s.phase==='spinning'?button(txt('stopSpin'),'rouletteStop','',false,'gold'):''}${s.phase==='ended'?`<p>${esc(txt('diceNote'))}</p>${s.bets[state.me]?button(txt('dice'),'diceRisk','',!!s.dice[state.me]||me().coins<10,'gold'):''}<p>${Object.entries(s.dice).map(([id,d])=>`${esc(playerName(id))}: 🎲${d.die} (${d.delta>=0?'+':''}${d.delta})`).join('　')}</p>${canHost()?button(txt('again'),'restart'):''}`:''}</div></div>`;
}
function renderSlots(){
 const s=state.session?.type==='slots'?state.session:null, receipt=s?.receipts[state.me],spin=s?.spins[state.me];
 const products=[['🥤',111],['🍪',222],['🎁',333],['📒',444]];
 return `<div class="tablebox"><p>${esc(txt('shopHelp'))}</p><div class="row">${products.map(([emoji,cost])=>`<button data-act="shop" data-val="${cost}" class="shopitem" ${me().coins<cost?'disabled':''}><strong style="font-size:22px">${emoji}</strong><span>${cost} 🪙</span><small>${esc(txt('shop'))}</small></button>`).join('')}</div></div>
 <div class="tablebox"><h3>${esc(txt('receipt'))}</h3><div class="row">${receipt?`<span class="pill">${receipt.cost} 🪙</span><div class="big-number">${esc(receipt.target)}</div>`:`<span>${esc(txt('noReceipt'))}</span>`}</div><p>${esc(txt('receiptHit'))}</p><div class="reels">${(spin?.reels||['?','?','?']).map(r=>`<span class="reel">${esc(r)}</span>`).join('')}</div>${spin?`<p class="highlight">${spin.multi}×</p>`:''}${button(txt('slotSpin'),'slotSpin','',!receipt||me().coins<state.stake,'gold')}</div>
 ${s?`<div class="seat"><h3>${esc(txt('slotOther'))}</h3>${Object.entries(s.spins).map(([id,r])=>`<div class="row"><span>${esc(playerName(id))}</span><b>${esc(r.reels.join(''))}</b><span>${r.multi}×</span></div>`).join('')}</div>`:''}`;
}
// Add a free, fictional coin refill to the player list panel.
const refill=document.createElement('button');refill.className='button outline small-btn';refill.dataset.i='walletRefill';refill.textContent=txt('walletRefill');refill.onclick=()=>sendAction('refill');document.querySelector('#players').after(refill);
changeLang('ja');


/* 森P オンライン音声チュートリアル */
(() => {
  const room = document.getElementById('roomPage');
  const panel = room.querySelector('.coach-panel');
  const next = document.getElementById('coachNext');
  const language = document.getElementById('language');

  function speak() {
    panel.querySelector('.star-coach-say')?.click();
  }

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'button gold';
  btn.style.cssText =
    'min-height:52px;font-size:17px;white-space:normal';

  const labels = {
    ja: '🎓 森Pの説明を聞く',
    en: '🎓 Hear Mori P',
    zh: '🎓 收听森P讲解',
    ko: '🎓 모리P 설명 듣기'
  };

  function updateLabel() {
    btn.textContent = labels[language.value] || labels.ja;
  }

  updateLabel();
  language.addEventListener('change', updateLabel);
  btn.addEventListener('click', speak);
  next.addEventListener('click', speak);

  room.querySelector('.room-actions').prepend(btn);
})();


/* オンライン対戦・ゲーム画面拡大 */
(() => {
  const room = document.getElementById('roomPage');
  const layout = room.querySelector('.room-layout');
  const bar = document.createElement('div');

  bar.style.cssText =
    'display:none;position:sticky;top:0;z-index:50;' +
    'background:#102638;padding:10px;gap:8px;' +
    'flex-wrap:wrap;border-radius:12px';

  bar.innerHTML =
    '<button class="button outline" id="gameReturn">' +
    '← ゲーム選択に戻る</button>' +
    '<button class="button gold" id="gameSpeak">' +
    '🔊 森Pの説明を聞く</button>';

  room.querySelector('.room-top').after(bar);

  let playing = false;
  let focused = false;

  function showGame(on) {
    focused = on;
    const parts = [
      document.querySelector('.container > nav'),
      document.querySelector('header.top'),
      room.querySelector('.room-top'),
      room.querySelector('.left'),
      room.querySelector('.coach-panel'),
      document.getElementById('starRoom'),
      room.querySelector('.privacy')
    ];

    parts.forEach(el => {
      if (el) el.style.display = on ? 'none' : '';
    });

    layout.style.gridTemplateColumns =
      on ? 'minmax(0,1fr)' : '';

    document.querySelector('.container').style.maxWidth =
      on ? '100%' : '';

    bar.style.display = on ? 'flex' : 'none';
    window.scrollTo(0, 0);
  }

  document.getElementById('gameReturn').onclick =
    () => showGame(false);

  document.getElementById('gameSpeak').onclick =
    () => room.querySelector('.star-coach-say')?.click();

  const oldRender = render;
  render = function(...args) {
    oldRender(...args);
    const active = !!state?.session;

    if (active && !playing && !room.hidden)
      showGame(true);

    if (!active && playing && focused)
      showGame(false);

    playing = active;
  };

  document.getElementById('leaveBtn')
    .addEventListener('click', () => {
      showGame(false);
      playing = false;
    });
})();



