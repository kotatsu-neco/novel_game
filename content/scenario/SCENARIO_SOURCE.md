# content-pack
title: 面会札
gameId: menkai_fuda
saveKey: menkai_fuda_save_v01
startScene: opening

# backgrounds
- id: black_plain
  kind: cssClass
  className: bg-black_plain
- id: black_rain
  kind: cssClass
  className: bg-black_rain
- id: hospital_night
  kind: cssClass
  className: bg-black_plain
- id: home_night
  kind: cssClass
  className: bg-black_plain

# audio
ambiences:
se:

---

# SCENARIO_SOURCE.md

## この文書の役割

これはサウンドノベル『面会札』のシナリオ原稿初版である。  
`STORY_BIBLE.md` を正本として、最大30分程度で読める構成に収める。

Runtime EngineはこのMarkdownを直接読まない。ゲーム化するときは compiler で `main.json` に変換する。

## status ルール

- `draft`: AIが新規作成・大幅修正可
- `ai_revise`: AIが修正可
- `human_review`: AIは提案のみ
- `human_final`: AIは変更禁止。問題指摘のみ
- `locked`: AIは変更禁止。正本扱い

---

# scene: opening
status: draft
background: home_night
ambience: silent

[text]
時計は、二十二時を少し過ぎていた。

湯を沸かす音が止まり、部屋の中には冷蔵庫の低い唸りだけが残っている。テーブルの上の固定電話が鳴ったのは、マグカップに手を伸ばしたときだった。

一度目は出なかった。

二度目は、間違い電話だと思った。

三度目で、私は受話器を取った。

[voice]
「夜間のお迎えについてご連絡しています」

[text]
声は女にも男にも聞こえなかった。若いとも年寄りとも分からない。ただ、病院の案内放送のように平らだった。

[voice]
「お手数ですが、夜間受付までお越しください」

[next: choice_call]

---

# scene: choice_call
status: draft
background: home_night
ambience: silent

[choice]
prompt: 電話をどう扱うか。

- label: すぐ切る
  next: call_hangup
  score: -1
  set:
    call_response: hangup

- label: 最後まで聞く
  next: call_listen
  score: +1
  set:
    call_response: listen

- label: 留守電に切り替える
  next: call_answering
  score: +0
  set:
    call_response: answering

---

# scene: call_hangup
status: draft
background: home_night
ambience: silent

[text]
私は受話器を置いた。

すぐにまた鳴った。

同じ間隔。同じ呼び出し音。まるで、置かれたことだけを待っていたようだった。

[next: home_before_departure]

---

# scene: call_listen
status: draft
background: home_night
ambience: silent

[text]
私は受話器を耳に当てたまま、最後まで聞いた。

[voice]
「呼び出し元は、夜間受付にてご確認ください。お迎えの方は、札をお受け取りください」

[text]
迎え。

その言葉だけが、他の事務的な声から少し浮いていた。

通話は、向こうから切れた。

[next: home_before_departure]

---

# scene: call_answering
status: draft
background: home_night
ambience: silent

[text]
私は応答を切り、留守電に切り替えた。

しばらく無音が続いたあと、機械の録音音声に重なるように、さっきの声が入った。

[voice]
「夜間のお迎えについてご連絡しています」

[text]
録音はそこで途切れた。だが固定電話は、すぐにまた鳴り始めた。

[next: home_before_departure]

---

# scene: home_before_departure
status: draft
background: home_night
ambience: silent

[text]
知っている病院の名前だった。

市立病院。自転車なら、夜道でも十分ほどで着く。私は受話器を持ち上げ、こちらから折り返そうとした。

話し中だった。

もう一度かけても、同じだった。

呼び出し音が鳴らないまま、耳の奥で細い雑音だけが続いた。

[next: choice_home_check]

---

# scene: choice_home_check
status: draft
background: home_night
ambience: silent

[choice]
prompt: 家を出る前に何を確認するか。

- label: 留守電を確認する
  next: check_answering
  score: +1
  set:
    home_checked: answering

- label: 電話番号を確認する
  next: check_number
  score: +1
  set:
    home_checked: number

- label: 確認せず病院へ向かう
  next: check_none
  score: -1
  set:
    home_checked: none

---

# scene: check_answering
status: draft
background: home_night
ambience: silent

[text]
留守電には、一件だけ残っていた。

[voice]
「夜間受付までお越しください。呼び出し元は、東病棟三階、三一七です」

[text]
録音はそれだけだった。

患者の名前も、こちらの名前もない。

それなのに電話は、また鳴った。

[next: ride_to_hospital]

---

# scene: check_number
status: draft
background: home_night
ambience: silent

[text]
着信履歴には、市立病院の代表番号が表示されていた。

登録していない番号なのに、画面には病院名が出ている。私はスマホで病院の番号を検索した。数字は一致していた。

それなら、なおさら放っておけなかった。

誤連絡なら、止めてもらわなければならない。

[next: ride_to_hospital]

---

# scene: check_none
status: draft
background: home_night
ambience: silent

[text]
これ以上、部屋で電話を聞いていたくなかった。

私は鍵と財布だけを取った。湯は冷めかけていたが、火は消えている。玄関を出ると、夜の空気が思ったより湿っていた。

背中の奥で、まだ電話の音が鳴っている気がした。

[next: ride_to_hospital]

---

# scene: ride_to_hospital
status: draft
background: black_rain
ambience: silent

[text]
自転車のライトが、濡れた道路を細く照らした。

雨は降っていない。ただ、路面だけが黒く光っている。車通りは少なく、ペダルを踏む音がやけに近く聞こえた。

市立病院の建物は、いつも通りそこにあった。

救急入口の明かり。夜間受付の表示。自動ドアの前に置かれた消毒液。見慣れた病院の、見慣れた夜の顔だった。

だから私は、そのまま中へ入った。

[next: hospital_entrance]

---

# scene: hospital_entrance
status: draft
background: hospital_night
ambience: silent

[text]
中も、普通だった。

受付の奥には淡い照明がつき、廊下の床は薄く光っている。遠くで誰かの靴音がした。白い服の人影が、角を曲がって見えなくなる。

窓口に、警備員らしき人が立っていた。

紺色の制服。制帽。胸元の名札は、光の加減で読めない。

[voice]
「夜間の方ですね」

[text]
私は、迎えに来たわけではないと言った。

警備員らしき人は、表情を変えなかった。

[voice]
「呼び出し元は東病棟三階、三一七です。こちらでご確認ください」

[next: reception_pass]

---

# scene: reception_pass
status: draft
background: hospital_night
ambience: silent

[text]
差し出されたのは、普通の面会札だった。

白いプラスチックの板に、紺色の文字。首から掛けるための細い紐がついている。表には、見慣れた病院名と「夜間面会」の文字があった。

その下に、小さく印字されている。

[document]
『東病棟 三階 317』

[voice]
「こちらをお掛けください」

[text]
私は面会ではないと、もう一度言った。

[voice]
「呼び出し元の確認は、病棟でお願いします」

[next: choice_reception]

---

# scene: choice_reception
status: draft
background: hospital_night
ambience: silent

[choice]
prompt: 夜間受付でどうするか。

- label: 受付簿に記入する
  next: reception_sign
  score: -1
  set:
    reception_action: sign

- label: 要件だけを聞き直す
  next: reception_ask
  score: +0
  set:
    reception_action: ask

- label: 面会札の裏を見る
  next: reception_back
  score: +1
  set:
    reception_action: check_back

---

# scene: reception_sign
status: draft
background: hospital_night
ambience: silent

[text]
受付簿には、日付と時刻、面会先を書く欄があった。

私は面会先の欄に「317」とだけ書いた。ボールペンの先が、紙に引っかかる。

それだけで済ませたつもりだった。

警備員らしき人は、面会札をこちらへ押し出した。

[voice]
「お迎えの方は、札をお掛けください」

[next: choice_pass]

---

# scene: reception_ask
status: draft
background: hospital_night
ambience: silent

[text]
「どなたの呼び出しですか」と聞いた。

警備員らしき人は、少しだけ首を傾けた。

[voice]
「呼び出し元は、東病棟三階、三一七です」

[text]
患者の名前は返ってこなかった。

もう一度聞こうとすると、遠くの院内放送が先に鳴った。

[voice]
「夜間面会の方は、受付をお済ませください」

[next: choice_pass]

---

# scene: reception_back
status: draft
background: hospital_night
ambience: silent

[text]
面会札を受け取る前に、私は裏を見た。

赤い丸印が、ひとつ押されていた。病院の検印にしては古く、朱肉がまだ乾いていないように見える。

指で触れようとして、やめた。

警備員らしき人は、札ではなく私の手元だけを見ていた。

[voice]
「お掛けください」

[next: choice_pass]

---

# scene: choice_pass
status: draft
background: hospital_night
ambience: silent

[choice]
prompt: 面会札をどう扱うか。

- label: 首から掛ける
  next: pass_neck
  score: -2
  set:
    visitor_pass_action: neck

- label: 手に持つだけにする
  next: pass_hand
  score: +1
  set:
    visitor_pass_action: hand

- label: いったん返そうとする
  next: pass_return_try
  score: +1
  set:
    visitor_pass_action: return_try

---

# scene: pass_neck
status: draft
background: hospital_night
ambience: silent

[text]
私は面会札を首から掛けた。

紐は軽いはずなのに、首の後ろに湿った感触が残った。札が胸元で揺れ、プラスチックの角が服に当たる。

院内放送が流れた。

[voice]
「お迎えの方は、札をお掛けのうえ、東病棟へお進みください」

[text]
その言い方に引っかかったが、私はもう歩き出していた。

[next: ward_corridor_bound]

---

# scene: pass_hand
status: draft
background: hospital_night
ambience: silent

[text]
私は面会札を首から掛けず、手に持った。

警備員らしき人は、何も言わなかった。ただ、目線だけが札の紐を追ったように見えた。

エレベーターの方から、遠くの人影がひとつ、こちらを見てすぐに背を向けた。

[next: ward_corridor_free]

---

# scene: pass_return_try
status: draft
background: hospital_night
ambience: silent

[text]
「これは必要ありません」と言って、私は面会札を返そうとした。

警備員らしき人は受け取らなかった。

[voice]
「確認が終わりましたら、お返しください」

[text]
お返しください。

返却してください、ではなかった。

私はその言葉を聞き違いだと思うことにして、札を手に持ったまま東病棟へ向かった。

[next: ward_corridor_free]

---

# scene: ward_corridor_free
status: draft
background: hospital_night
ambience: silent

[text]
東病棟三階の廊下は、普通の病院の匂いがした。

消毒液。乾いたリネン。壁際の手すり。夜間用に落とされた照明。どれも知っている病院のものだった。

それでも、歩くほどに面会札が重くなる。

裏を見ると、赤い丸印が二つになっていた。

押された瞬間を、私は見ていない。

[next: broadcast_shift_free]

---

# scene: ward_corridor_bound
status: draft
background: hospital_night
ambience: silent

[text]
東病棟三階へ上がると、面会札が胸元で揺れた。

廊下は普通だった。壁際の手すりも、消火栓も、ナースステーションの薄い灯りも、見慣れた病院のままだった。

けれど、人影が遠くを通るたび、誰もが私の胸元を見ているように思えた。

院内放送が鳴った。

[voice]
「お迎えの方は、札を外さず、お進みください」

[text]
私は足を止めなかった。

止める理由が、うまく見つからなかった。

[next: broadcast_shift_bound]

---

# scene: broadcast_shift_free
status: draft
background: hospital_night
ambience: silent

[text]
スピーカーから、柔らかい音がした。

[voice]
「夜間面会の方は、指定の病室をご確認ください」

[text]
少し間があった。

[voice]
「お帰しの手続きは、札を違えぬようお願いいたします」

[text]
お帰し。

病院で聞く言葉ではない。少なくとも、私はそう思った。

317号室の表示は、廊下の突き当たりにあった。

[next: room_317_free]

---

# scene: broadcast_shift_bound
status: draft
background: hospital_night
ambience: silent

[text]
スピーカーから、柔らかい音がした。

[voice]
「夜間面会の方は、指定の病室をご確認ください」

[text]
少し間があった。

[voice]
「お迎えの方は、札を違えぬよう、お連れください」

[text]
札が胸元に貼りついたように重くなった。

外そうとしたが、指先が紐に触れる前に、317号室の扉が見えた。

[next: room_317_bound]

---

# scene: room_317_free
status: draft
background: hospital_night
ambience: silent

[text]
317号室の扉は、閉まっていた。

特別な札も、御札も、古い傷もない。普通の病室の扉だった。小さな窓にはカーテンがかかり、中は見えない。

手の中の面会札を裏返す。

赤い丸印は三つになっていた。三つ目だけが、まだ濡れているように見える。

中から、声がした。

[voice]
「お待ちしていました」

[text]
性別も年齢も分からない声だった。

[next: choice_door]

---

# scene: room_317_bound
status: draft
background: hospital_night
ambience: silent

[text]
317号室の扉は、閉まっていた。

普通の病室の扉だった。だが、胸元の面会札が扉の方へ引かれるように揺れる。プラスチックの裏が服に擦れ、冷たいものが染みた。

中から、声がした。

[voice]
「お待ちしていました」

[text]
性別も年齢も分からない声だった。

私が答える前に、院内放送が低く鳴った。

[voice]
「お迎えの方は、そのままお入りください」

[next: choice_door]

---

# scene: choice_door
status: draft
background: hospital_night
ambience: silent

[choice]
prompt: 317号室の前でどうするか。

- label: 病室へ入る
  next: door_enter_bad
  score: -2
  set:
    door_response: enter

- label: 声を聞いて待つ
  next: door_wait_normal
  score: +0
  set:
    door_response: wait

- label: 面会札を持って受付へ戻る
  next: return_reception_gate
  score: +2
  set:
    door_response: return_reception

---

# scene: return_reception_gate
status: draft
background: hospital_night
ambience: silent

[endingCheck]
- when: visitor_pass_action == neck
  next: return_reception_normal_bound

- default: true
  next: return_reception_true

---

# scene: door_enter_bad
status: draft
background: hospital_night
ambience: silent

[text]
私は扉を開けた。

中は暗かった。

病室なら、ベッドの輪郭くらいは見えるはずだった。カーテンの白さも、点滴台の影も、ナースコールの小さな灯りも。

何も見えない。

一歩入ると、背後で扉が閉まった。

[voice]
「お帰りなさい」

[text]
声は、すぐ耳元で聞こえた。

[next: ending_bad]

---

# scene: door_wait_normal
status: draft
background: hospital_night
ambience: silent

[text]
私は扉の前で待った。

中の声は、それきり黙った。廊下の奥で、カートの車輪が鳴ったような気がしたが、振り向いても何もなかった。

やがて院内放送が入った。

[voice]
「夜間面会は終了しました。お帰りの方は、受付までお戻りください」

[text]
普通の案内に戻っていた。

私はその言葉に従った。

[next: door_wait_gate]

---

# scene: door_wait_gate
status: draft
background: hospital_night
ambience: silent

[endingCheck]
- when: visitor_pass_action == neck
  next: ending_normal_bound

- default: true
  next: ending_normal

---

# scene: return_reception_normal_bound
status: draft
background: hospital_night
ambience: silent

[text]
私は面会札を外そうとした。

紐は絡まっていない。結び目もない。ただ、首の後ろで指が滑り、なかなか外れなかった。

何とか外したとき、プラスチックの裏が掌に触れた。

赤い印が、ひとつ増えていた。

受付へ戻ると、警備員らしき人は立っていた。私は札を返した。

その人は受け取ったが、私を見なかった。

[voice]
「お帰りください」

[text]
私は病院を出た。

自転車の鍵を差し込むまで、電話の音がどこかで鳴っている気がした。

[next: ending_normal_bound]

---

# scene: return_reception_true
status: draft
background: hospital_night
ambience: silent

[text]
私は扉から離れた。

声は追ってこなかった。ただ、手の中の面会札だけが、わずかに湿っている。

来た道を戻る。廊下の表示は同じだった。ナースステーションの明かりも、手すりも、消火栓も、何ひとつ変わっていない。

それなのに、院内放送だけが低く響いた。

[voice]
「お連れになるものを、違えぬよう、お返しください」

[text]
私は面会札を握った。

連れて帰るものなどない。

そう思った瞬間、札の裏の朱印が、乾いた。

[next: true_reception]

---

# scene: true_reception
status: draft
background: hospital_night
ambience: silent

[text]
夜間受付に戻ると、警備員らしき人は同じ場所に立っていた。

私は面会札を差し出した。

[voice]
「確認は、お済みですか」

[text]
私は、誤連絡だとだけ言った。

それ以上は言えなかった。

警備員らしき人は、札を受け取った。裏も表も見ず、受付の下へしまう。

[voice]
「お預かりします」

[text]
その言葉は、病院の手続きとしては少しだけ違っていた。

けれど、私は何も聞かなかった。

[next: ending_true]

---

# scene: ending_bad
status: draft
background: black_plain
ambience: silent

[text]
電話が鳴っている。

どこかの部屋で。

受話器を取る音がした。

[voice]
「夜間のお迎えについてご連絡しています」

[text]
その声を聞いているのは、もう私ではなかった。

なのに、電話の向こうで息をしているものが、こちらを見ている気がした。

[ending]
ending: bad
title: BAD END
subtitle: 次の迎え

---

# scene: ending_normal
status: draft
background: home_night
ambience: silent

[text]
家に戻ると、固定電話は鳴っていなかった。

留守電のランプは消えている。着信履歴には、市立病院の代表番号だけが残っていた。

私はマグカップの湯を捨てた。流しに落ちる音が、妙に大きい。

それで終わったのだと思いたかった。

翌朝、手のひらに薄い赤い跡が残っていた。

丸い印のようにも、ただ握りしめた痕のようにも見えた。

[ending]
ending: normal
title: NORMAL END
subtitle: 消えた着信

---

# scene: ending_normal_bound
status: draft
background: home_night
ambience: silent

[text]
家に戻ると、固定電話は鳴っていなかった。

留守電のランプは消えている。着信履歴には、市立病院の代表番号だけが残っていた。

私はマグカップの湯を捨てた。流しに落ちる音が、妙に大きい。

それで終わったのだと思いたかった。

翌朝、首の後ろに赤い線が残っていた。

面会札の紐が当たったような、細い跡だった。

[ending]
ending: normal
title: NORMAL END
subtitle: 消えた着信

---

# scene: ending_true
status: draft
background: home_night
ambience: silent

[text]
家に戻っても、電話は鳴らなかった。

次の日も、その次の日も。

市立病院へ確認の電話を入れると、夜間受付の人は淡々と答えた。

昨夜、東病棟三階の面会記録はありません。

三一七号室は使用中ですが、夜間の呼び出しもありません。

私は礼を言って、電話を切った。

受話器を置くと、部屋の中が静かになった。

静かすぎるくらいに。

[text]
あの面会札を持って帰らなくてよかった。

それだけは分かる。

何を返したのかは、分からない。

[ending]
ending: true
title: TRUE END
subtitle: 返された札
