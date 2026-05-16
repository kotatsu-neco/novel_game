# content-pack
title: 返し鈴
gameId: kaeshisuzu
saveKey: kaeshisuzu_save_v01
startScene: title

# backgrounds
- id: black_rain
  kind: cssClass
  className: bg-black_rain
- id: black_plain
  kind: cssClass
  className: bg-black_plain
- id: old_house_evening
  kind: image
  src: assets/bg/old_house_evening.png
- id: butsuma_night
  kind: image
  src: assets/bg/butsuma_night.png
- id: mountain_path
  kind: image
  src: assets/bg/mountain_path.png
- id: shrine_night
  kind: image
  src: assets/bg/shrine_night.png
- id: shrine_dawn
  kind: image
  src: assets/bg/shrine_dawn.png
- id: old_house_morning
  kind: image
  src: assets/bg/old_house_morning.png
- id: butsuma_morning
  kind: image
  src: assets/bg/butsuma_morning.png

# audio
ambiences:
se:

---

# SCENARIO_SOURCE.md

## この文書の役割

この文書は、人間とAIが共同で扱うシナリオ原稿正本である。
Runtime EngineはこのMarkdownを直接読まない。実行時に読むのは `content/scenario/main.json` のみ。

## status ルール

- `draft`: AIが新規作成・大幅修正可
- `ai_revise`: AIが修正可
- `human_review`: AIは提案のみ
- `human_final`: AIは変更禁止。問題指摘のみ
- `locked`: AIは変更禁止。正本扱い

---

# scene: title
status: human_review
background: black_rain
ambience: rain_light

[text]
雨の音だけがしている。

遠くで、鈴が鳴った。

ちりん。

[title]
返し鈴

[next: mother_intro]

---

# scene: mother_intro
status: human_review
background: black_plain
ambience: silent

[text]
雨になりそうだから、早めに行ってきなさい。

母はそう言って、玄関まで見送りに来た。

靴を履く私の背中へ、鍵の鳴る音がした。

[voice]
「遙、気を付けて行ってらっしゃい」

[voice]
「うん。暗くなる前には戻る」

[text]
祖母の家の鍵は、掌の中で思っていたより冷たかった。

[next: house_intro]

---

# scene: house_intro
status: human_review
background: old_house_evening
ambience: rain_light

[text]
祖母の家には、まだ祖母の匂いが残っていた。

畳に染みた線香の匂い。古い箪笥。湯呑みに残った薄い茶渋。片付けるものは思っていたより少なく、祖母が最後までこの家をひとりで整えていたことが、部屋のあちこちから伝わってきた。

雨が降り出したのは、仏間の押し入れを開けた頃だった。

[next: butsuma_box]

---

# scene: butsuma_box
status: human_final
background: butsuma_night
ambience: rain_medium

[text]
押し入れの奥に、古い木箱があった。

箱は褪せた紐で結ばれている。蓋には墨で文字があり、懐中電灯を当てると、かすれた線がゆっくり浮かび上がった。

[document]
『返鈴箱　片桐家』

[text]
紐に触れると、指先に冷たさが残った。

部屋の中は、さっきより暗い。

[text]
箱の中には、黒ずんだ小さな鈴が入っていた。

白い布。古い紐付きの巾着。古い写真。紙が二枚。

鈴は動いていない。ただ、見ていると、こちらが息を止めてしまう。

[next: documents]

---

# scene: documents
status: human_final
background: butsuma_night
ambience: rain_medium

[text]
一枚目の紙は、古い和紙だった。

墨はところどころ薄れているが、文字は読める。

[document]
『返鈴覚書
雨夜 家に返り来たる鈴は 素手にて取るべからず
鈴を鳴らすべからず
名を口にすべからず
呼ぶ声ありとも 答ふべからず

暁までに 社の絵馬掛の下に納むべし

返すこと能はざる時は 白布に包み 返鈴箱に納め置くべし
ただし 箱を開きし者は 次なる雨夜 また呼ばるるものと心得よ』

[text]
もう一枚は、祖母の走り書きだった。

鉛筆の線が震えている。

[document]
『この箱を開けた方へ。
この箱はできるだけそのままにしてください。中の鈴には触れないで。
もし雨の夜に開けたなら鈴を鳴らさず白布で包んでください。

声がしても返事をしないでください。
名前を読まないでください。
朝まで箱を閉じていられるならそれが一番です。

それでも鈴が鳴り続けるなら覚書の通りにしてください。
私は返せませんでした。』

[text se=bell_far]
遙は箱の蓋を閉じた。

紐を結び直そうとした、そのときだった。

箱の内側で、鈴が鳴った。

ちりん。

[text se=wet_footstep]
廊下の方から、水を含んだ足音がした。

一歩、また一歩。

足音は仏間の前で止まった。障子の向こうで、子どもの声がする。

[voice]
「それ、ぼくの」

[next: choice_bell]

---

# scene: choice_bell
status: human_final
background: butsuma_night
ambience: rain_medium

[choice]
prompt: 鈴をどう扱うか。

- label: 白布に包む
  next: bell_wrap_result
  score: +1
  set:
    bell_handling: bell_wrap

- label: そのまま持つ
  next: bell_pocket_result
  score: +0
  set:
    bell_handling: bell_pocket

- label: 鈴を鳴らして確かめる
  next: bell_ring_result
  score: -1
  set:
    bell_handling: bell_ring

---

# scene: bell_wrap_result
status: human_review
background: butsuma_night
ambience: rain_medium

[text]
遙は白布を広げた。

鈴には触れない。布越しに包み、箱の中にあった古い巾着へ入れる。紐を絞ると、鈴の形だけが布の奥で小さく浮いた。

音はしない。

遙は巾着を上着の内側へしまった。廊下の足音も、それ以上は近づかなかった。

[next: road_to_shrine]

---

# scene: bell_pocket_result
status: human_review
background: butsuma_night
ambience: rain_medium

[text se=bell_far]
遙は鈴をつまみ上げた。

思っていたより軽い。上着のポケットへ入れた瞬間、中で小さく鳴った。

廊下の奥で、濡れた足が畳を踏む音がした。

[next: road_to_shrine]

---

# scene: bell_ring_result
status: human_review
background: butsuma_night
ambience: silent

[text se=bell_close]
遙は鈴を持ち上げた。

本当に鳴るのか。そう思っただけだった。

ちりん。

音は小さかった。それなのに、家じゅうの雨音が一瞬で消えた。

障子の向こうで、何かが息を吸った。

[next: road_to_shrine]

---

# scene: road_to_shrine
status: human_review
background: mountain_path
ambience: rain_heavy

[text]
玄関の鍵は、なかなか開かなかった。

外へ出ると、雨が傘を強く叩いた。右手に傘。左手に懐中電灯。白布に包んだ鈴は、巾着ごと上着の内側にある。覚書と祖母の走り書きは、台所で見つけた保存袋に入れた。

スマホは圏外になっていた。

家の奥では、まだ箱が鳴っている。

[text]
古い写真が、保存袋の中で曇っていた。

軒下で懐中電灯を当てる。写真には、子どもが二人写っていた。社の前に並んで立っている。ひとりは、若いころの祖母に似ていた。

裏には細い字があった。

[document]
『志乃と惣太　社の前にて』

[voice]
「そう……」

[text se=bell_far]
惣太、と声に出しかけて、遙は口を閉じた。

上着の内側で、鈴が少しだけ震えた。

[next: shrine_ema]

---

# scene: shrine_ema
status: human_review
background: shrine_night
ambience: rain_heavy

[text]
社は、思っていたより近かった。

雨の中で、鳥居だけが白く浮いている。石段には濡れた落ち葉が張りつき、懐中電灯の光を向けるたび、黒い水たまりが小さく揺れた。

拝殿の軒下へ入ると、雨の音が少し遠くなった。遙は傘を畳み、柱のそばへ立てかける。

[text]
絵馬掛には、古い絵馬がいくつも重なっていた。

字の消えたもの。割れたもの。紐だけが残ったもの。ひとつずつ光を当てていくうちに、写真の裏にあったものと同じ名が見えた。

[document]
『佐久間 惣太』

[text]
その横に、新しい紙の札が結ばれていた。

他の絵馬より、ずっと白い。遙は懐中電灯を近づけた。

[document]
『名を声に出さないでください
鈴は
呼んだ人についていきます』

[text]
その言葉だけが、箱の中の走り書きと同じ息をしていた。

[next: choice_ema]

---

# scene: choice_ema
status: human_final
background: shrine_night
ambience: rain_heavy

[choice]
prompt: 絵馬の前でどうするか。

- label: 名前を読まず、鈴を置く
  next: ema_place_bell_result
  score: +1
  set:
    ema_action: ema_place_bell

- label: 書かれた名前を小声で読む
  next: ema_read_name_result
  score: -1
  set:
    ema_action: ema_read_name

- label: 絵馬を外して裏を見る
  next: ema_remove_result
  score: +0
  set:
    ema_action: ema_remove

---

# scene: ema_place_bell_result
status: human_review
background: shrine_night
ambience: rain_heavy

[text]
遙は、名の書かれた絵馬を見ないようにした。

上着の内側から巾着を取り出し、白布をほどく。鈴を絵馬掛の下へ置いた。

音はしなかった。

社の奥で、子どもが泣く声がした。けれど、その声は近づいてこない。

[next: return_path]

---

# scene: ema_read_name_result
status: human_review
background: shrine_night
ambience: rain_heavy

[text]
遙は絵馬の文字に光を当てた。

[document]
『佐久間 惣太』

[text se=bell_close]
唇が、名前の形に動いた。

声にした瞬間、白布の中で鈴が跳ねた。耳元で、子どもの声がする。

[voice]
「呼んだ」

[next: return_path]

---

# scene: ema_remove_result
status: human_review
background: shrine_night
ambience: rain_heavy

[text]
遙は絵馬に手をかけた。

紐は、思っていたより簡単にほどけた。絵馬の裏には、墨の薄れた文字がある。

[document]
『返らぬ名を呼ぶな
返らぬ音を持つな』

[text]
読み終えたとき、鳥居の外の道が、さっきより暗くなっていた。

[next: return_path]

---

# scene: return_path
status: human_review
background: shrine_night
ambience: rain_fade

[text]
帰ろう。

そう思った瞬間、雨の音が遠くなった。

背後で、子どもの声がする。

[voice]
「帰るの」

[text]
遙は歩き出した。

次の声は、祖母の声に似ていた。

[voice]
「遙、待ちなさい」

[text]
足が止まりかける。

懐中電灯の光が、鳥居の根元で揺れた。

背中のすぐ後ろで、今度は自分の声がした。

[voice]
「片桐遙」

[next: choice_voice]

---

# scene: choice_voice
status: human_final
background: shrine_night
ambience: silent

[choice]
prompt: 呼び声にどう反応するか。

- label: 振り返らない
  next: voice_no_turn_result
  score: +1
  set:
    voice_action: voice_no_turn

- label: 鳥居まで走る
  next: voice_run_result
  score: +0
  set:
    voice_action: voice_run

- label: 返事をする
  next: voice_answer_result
  forceEnding: ending_bad
  set:
    voice_action: voice_answer

---

# scene: voice_no_turn_result
status: human_review
background: shrine_night
ambience: silent

[text se=bell_far]
声が背中に触れた。

答えてはいけない。

覚書の墨が、まぶたの裏でにじむ。

名を呼ばない。

音は返す。

道は閉じる。

鈴が一度だけ震えた。

遙は振り返らず、鳥居の外へ足を出した。

[next: ending_check]

---

# scene: voice_run_result
status: human_review
background: shrine_night
ambience: rain_heavy

[text]
考えるより先に、足が動いた。

遙は鳥居まで走る。傘が肩にぶつかり、懐中電灯の光が地面を大きく揺らした。

背後で名前が聞こえた。

私の名前だった。

鳥居を抜けた瞬間、雨音が戻った。

助かった。

そう思ったのに、背中の奥に、何かを置いてきたような冷たさが残った。

[next: ending_check]

---

# scene: voice_answer_result
status: human_review
background: shrine_night
ambience: silent

[text]
遙は振り返った。

誰もいない。

足元に鈴が落ちている。

社に置いたはずの鈴だった。内側に、小さな文字が刻まれている。

[document]
『片桐遙』

[next: ending_bad]

---

# scene: ending_check
status: human_review
background: black_rain
ambience: 

[endingCheck]

---

# scene: ending_bad
status: human_review
background: butsuma_morning
ambience: silent

[text]
名前が思い出せない。

免許証を見ても、スマホを見ても、そこにある文字が読めない。

朝になっていた。

祖母の家の仏間に、返鈴箱がある。蓋は開いている。白布の上に、鈴がひとつ置かれていた。

[text se=bell_close]
ちりん。

[text]
庭の方から、声がした。

[voice]
「それ、わたしの」

[text]
その声は、遙自身の声だった。

[ending]
ending: bad
title: BAD END
subtitle: 名を返す

---

# scene: ending_normal
status: human_review
background: old_house_morning
ambience: rain_after

[text]
朝になっていた。

雨は止んでいる。祖母の家は、昨日と同じ顔をしていた。

仏間へ戻ると、返鈴箱は空だった。白布だけが底に残っている。

遙はしばらくそこに座っていた。

[text]
スマホの画面が、急に明るくなる。

写真が一枚、保存されていた。

撮った覚えはない。

社の前に、子どもの影が立っている。

その横に、もうひとつ、小さな影があった。

[text se=bell_far]
遠くで、鈴が鳴った。

ちりん。

[ending]
ending: normal
title: NORMAL END
subtitle: 夜明けの鈴

---

# scene: ending_true
status: human_review
background: shrine_dawn
ambience: dawn_silence

[text]
鳥居の外へ出た瞬間、雨が止んだ。

背後で、子どもの泣く声がした。

それは、こちらへ来る声ではなかった。社の奥で、何かがほどけるように、木が小さく鳴った。

遙は、ゆっくり振り返った。

[text]
絵馬掛の下に、鈴はない。

白布だけが、濡れずに残っている。

絵馬の文字が、朝の薄い光の中で、少しずつ薄れていく。

[document]
『佐久間 惣太』

[text]
最後の一画が、雨に溶けた。

[text]
祖母の家に戻ると、返鈴箱は閉じていた。

紐は、誰かが結び直したように、きれいに掛かっている。

箱の中に、鈴はなかった。

白い紐だけが、底に残っていた。

[text]
祖母の走り書きの裏に、まだ文字があった。

朝の光に透かすまで、見えなかった。

[document]
『鈴を鳴らさなかった人だけが
あの子を帰してやれるのです』

[text]
遙は、その紙を箱の底へ戻した。

もう、鈴の音はしなかった。

[ending]
ending: true
title: TRUE END
subtitle: 返し鈴

---
