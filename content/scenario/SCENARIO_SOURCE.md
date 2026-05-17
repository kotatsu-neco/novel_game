# content-pack
title: 迷路
gameId: maze
saveKey: maze_save_v04
startScene: opening

# backgrounds
- id: station_stairs
  kind: image
  src: assets/bg/maze_station_stairs.png
- id: maze_corridor
  kind: image
  src: assets/bg/maze_corridor.png
- id: crossroad
  kind: image
  src: assets/bg/maze_crossroad.png
- id: water_corridor
  kind: image
  src: assets/bg/maze_water_corridor.png
- id: kiosk
  kind: image
  src: assets/bg/maze_kiosk.png
- id: cafe
  kind: image
  src: assets/bg/maze_cafe.png
- id: stairs_up
  kind: image
  src: assets/bg/maze_stairs_up.png
- id: bad_end_corridor
  kind: image
  src: assets/bg/maze_bad_end_corridor.png
- id: black_plain
  kind: cssClass
  className: bg-black_plain

# audio
ambiences:
se:

---

# SCENARIO_SOURCE.md

## この文書の役割

これは、サウンドノベル『迷路』のシナリオ原稿 v01 である。  
Runtime EngineはこのMarkdownを直接読まない。ゲーム化するときはcompilerで `main.json` に変換する。

---

# scene: opening
status: draft
background: black_plain
ambience: silent

[text]
白井乃々香は、地下鉄の階段を降りながら動画を見ていた。

大学の帰りだった。講義は四限で終わったが、友人と少し話し、コンビニに寄り、駅に着いたころには空が暗くなりかけていた。

スマホの画面には、保存済みの動画が表示されている。

[document]
『都市伝説を集めてみた　パート22』

[text]
いかにも雑なタイトルだった。サムネイルには赤い太字で「絶対に振り返るな」と書かれている。こういう動画ほど、たいてい何も起きない。

それでも乃々香はパート21まで見ていた。暇つぶしとしては、ちょうどよかった。

片方のイヤホンから、安っぽい効果音が鳴った。

[voice]
「次は、地下階段にまつわる都市伝説です」

[text]
乃々香は画面を見たまま、階段を降りた。

[next: video_phrase]

---

# scene: video_phrase
status: draft
background: station_stairs
ambience: silent

[text]
動画の中で、合成音声が急に低くなる。

[voice]
「ごめんなさい、ごめんなさい、ごめんなさい」

[text]
同じ言葉が、三度続いた。

乃々香は笑いかけた。怖がらせたいのだろうが、声が機械的すぎた。

画面には、雑なテロップが出ている。

[document]
『地下へ降りるときは、顔を伏せる？  
最後の段で誰かにぶつかったら——』

[text]
そこまで読んだところで、最後の一段を踏んだ。

肩が、誰かに当たった。

[voice]
「あ、すみま——」

[text]
言い終える前に、乃々香は振り返っていた。

そこには、誰もいなかった。

[next: no_one_there]

---

# scene: no_one_there
status: draft
background: maze_corridor
ambience: silent

[text]
人がいない。

それが最初に分かった異変だった。

改札へ向かうはずの地下通路には、誰もいなかった。会社員も、学生も、ベビーカーも、駅員もいない。

音もない。構内放送も、電車の低い振動も、遠くの足音もない。

乃々香はイヤホンを外した。

動画は止まっている。画面にはまだ、同じテロップが残っていた。

[document]
『振り返るな』

[text]
乃々香は、階段を見た。

さっき降りてきたはずの階段は、なかった。

その代わりに、同じ幅の地下通路が、左右と正面へ伸びていた。

[next: choice_initial_check]

---

# scene: choice_initial_check
status: draft
background: maze_corridor
ambience: silent

[choice]
prompt: まず何を確認するか。

- label: 降りてきた階段を探す
  next: check_missing_stairs
  score: +0

- label: スマホの動画を確認する
  next: check_saved_video
  score: +1

- label: 通路の案内板を見る
  next: check_sign_shape
  score: +1

---

# scene: check_missing_stairs
status: draft
background: maze_corridor
ambience: silent

[text]
乃々香は、さっき降りてきた階段を探した。

階段はない。

壁があるわけでも、扉で塞がれているわけでもない。最初からそこには通路しかなかった、という形で消えている。

床のタイルは、階段があった場所まで同じ模様で続いていた。

戻る場所が消えたのではない。

戻る場所が、最初からなかったことにされている。

[next: first_sign]

---

# scene: check_saved_video
status: draft
background: maze_corridor
ambience: silent

[text]
乃々香はスマホを見た。

通信はない。アンテナ表示は空白で、時刻だけが同じ場所に残っている。

それでも、保存済みの動画は開けた。

[document]
『都市伝説を集めてみた　パート22』

[text]
動画のサムネイルは、さっきより暗く見えた。

赤い文字の「絶対に振り返るな」だけが、やけにはっきりしている。

[next: first_sign]

---

# scene: check_sign_shape
status: draft
background: maze_corridor
ambience: silent

[text]
乃々香は通路の先の案内板を見た。

形は駅のものだった。緑の矢印。白い板。黒い文字。ピクトグラム。

しかし、配置だけが駅で、意味が駅ではない。

文字は読めない。  
けれど、案内しようとしていることだけは分かる。

それがいちばん嫌だった。

[next: first_sign]

---

# scene: first_sign
status: draft
background: crossroad
ambience: silent

[text]
十字路の正面に、案内板があった。

緑の矢印。白い板。黒い文字。駅の案内表示に見える。

けれど文字だけが読めなかった。

漢字の角張った骨組みに、ひらがなの丸みと、カタカナの直線が混じっている。日本語に見える。でも、どの線も知っている字になる直前で曲がっていた。

ただ、ピクトグラムだけは分かる。

左の案内板には、人型があった。頭がない。  
右の案内板にも、人型がある。腕がない。  
正面の案内板の人型だけは、何をしているのか分からないが、頭も、腕も、足もあった。

[next: choice_first_crossroad]

---

# scene: choice_first_crossroad
status: draft
background: crossroad
ambience: silent

[choice]
prompt: どの道へ進むか。

- label: 頭のない人型が付いた左の通路へ進む
  next: wrong_head_loop1
  score: -1

- label: 五体満足の人型が付いた正面の通路へ進む
  next: safe_first_path
  score: +1

- label: 腕のない人型が付いた右の通路へ進む
  next: wrong_arm_loop1
  score: -1

---

# scene: wrong_head_loop1
status: draft
background: maze_corridor
ambience: silent

[text]
左の通路へ入った。

壁はすぐに同じ白いタイルになった。案内板はあるが、文字は読めない。ピクトグラムもない。

しばらく歩くと、正面に鏡のような黒いガラスがあった。

そこに映った乃々香の顔だけが、少し遅れて動いた。

乃々香は目をそらした。

次の角を曲がると、さっきの十字路に戻っていた。

案内板の端に、細いひびが入っている。

[next: loop_one_notice_from_first]

---

# scene: wrong_arm_loop1
status: draft
background: maze_corridor
ambience: silent

[text]
右の通路へ入った。

途中までは普通の地下道だった。低い天井、白いタイル、古い蛍光灯。

スマホを握る手が、少し冷たくなる。

落としたわけではない。けれど、画面を操作しようとすると、親指の動きが遅れた。

乃々香は立ち止まり、深呼吸した。

次の角を曲がると、さっきの十字路に戻っていた。

案内板の端に、細いひびが入っている。

[next: loop_one_notice_from_first]

---

# scene: loop_one_notice_from_first
status: draft
background: crossroad
ambience: silent

[text]
戻ってきた。

乃々香はそう思った。

ただ、完全に同じではない。案内板の端にひびがある。床のタイルも、一枚だけ色が違う。

同じ場所なのに、同じではない。その差が、かえって気持ち悪かった。

これが一度目のループだと、乃々香はまだ知らない。

動画を開く。通信はない。

だが、保存済みの動画だけは再生できた。

[next: video_hint_after_loop1]

# scene: safe_first_path
status: draft
background: maze_corridor
ambience: silent

[text]
乃々香は正面へ進んだ。

人型は何を示しているのか分からなかった。歩いているようにも、立っているようにも見える。

けれど、欠けてはいなかった。

通路の奥に、閉鎖されたキオスクがあった。シャッターは下りている。なのに内側の灯りだけが点いている。

雑誌の表紙に、読めない文字が並んでいた。その横に、小さな人型のピクトグラムが印刷されている。

どれも、頭と腕と足があった。

乃々香は、少しだけ息を吐いた。

[next: video_hint_no_loop]

---

# scene: video_hint_no_loop
status: draft
background: maze_corridor
ambience: silent

[text]
保存していた動画は再生できた。

動画の続きには、軽い字幕が流れる。

[document]
『その22：地下階段の変な案内板  
・文字は読めないらしいｗ  
・絵だけ見ろって話  
・欠けてる人の方に行くと戻される  
・水泳マークはマジで水  
・最後は絶対振り返るな』

[text]
乃々香は、画面を見つめた。

ふざけた字幕だった。けれど、さっきの案内板と合っている。

欠けている人の方に行くと戻される。

まだ戻されてはいない。  
だからこそ、ここから間違えてはいけない。

[next: choice_video_response_0]

# scene: video_hint_after_loop1
status: draft
background: maze_corridor
ambience: silent

[text]
保存していた動画は再生できた。

動画の続きには、軽い字幕が流れる。

[document]
『その22：地下階段の変な案内板  
・文字は読めないらしいｗ  
・絵だけ見ろって話  
・欠けてる人の方に行くと戻される  
・水泳マークはマジで水  
・最後は絶対振り返るな』

[text]
乃々香は、画面を見つめた。

欠けている人の方に行くと戻される。

今なら分かる。  
さっき自分は、戻されたのだ。

一度目。

その言葉を、乃々香は声に出さずに飲み込んだ。

[next: choice_video_response_1]

# scene: choice_video_response_0
status: draft
background: maze_corridor
ambience: silent

[choice]
prompt: 動画をどう扱うか。

- label: 動画を最後まで見直す
  next: watch_video_more_0
  score: +1

- label: 怖くなって動画を閉じる
  next: close_video_0
  score: +0

- label: コメント欄を開こうとする
  next: no_connection_comments_0
  score: +0

---

# scene: watch_video_more_0
status: draft
background: maze_corridor
ambience: silent

[text]
乃々香は動画を少し巻き戻した。

合成音声は、相変わらず薄い調子で都市伝説を並べている。

[voice]
「この迷路では、案内板の文字を読もうとしてはいけません。読めるのは絵だけです」

[text]
画面の端に、小さな注意書きが出る。

[document]
『※三回戻されたらアウト、らしい』

[text]
雑な編集だった。けれど、いまの乃々香には冗談に見えなかった。

[next: water_sign_0]

---

# scene: close_video_0
status: draft
background: maze_corridor
ambience: silent

[text]
乃々香は動画を閉じた。

画面はホームに戻らない。通信がないから、読み込みの輪だけが回り続けている。

結局、保存済み動画のサムネイルだけが残った。

[document]
『都市伝説を集めてみた　パート22』

[text]
乃々香はもう一度、それを開いた。

認めたくないが、今はこれ以外に手がかりがない。

[next: water_sign_0]

---

# scene: no_connection_comments_0
status: draft
background: maze_corridor
ambience: silent

[text]
コメント欄を開こうとした。

画面は白くなり、読み込みの輪だけが回る。

通信がない。けれど、動画本体は再生できる。

オフライン保存しておいてよかった、と乃々香は思った。  
それが自分をここへ入れた理由の一つでもあるのに。

[next: water_sign_0]

---

# scene: choice_video_response_1
status: draft
background: maze_corridor
ambience: silent

[choice]
prompt: 動画をどう扱うか。

- label: 動画を最後まで見直す
  next: watch_video_more_1
  score: +1

- label: 怖くなって動画を閉じる
  next: close_video_1
  score: +0

- label: コメント欄を開こうとする
  next: no_connection_comments_1
  score: +0

---

# scene: watch_video_more_1
status: draft
background: maze_corridor
ambience: silent

[text]
乃々香は動画を少し巻き戻した。

合成音声は、相変わらず薄い調子で都市伝説を並べている。

[voice]
「この迷路では、案内板の文字を読もうとしてはいけません。読めるのは絵だけです」

[text]
画面の端に、小さな注意書きが出る。

[document]
『※三回戻されたらアウト、らしい』

[text]
雑な編集だった。けれど、いまの乃々香には冗談に見えなかった。

[next: water_sign_1]

---

# scene: close_video_1
status: draft
background: maze_corridor
ambience: silent

[text]
乃々香は動画を閉じた。

画面はホームに戻らない。通信がないから、読み込みの輪だけが回り続けている。

結局、保存済み動画のサムネイルだけが残った。

[document]
『都市伝説を集めてみた　パート22』

[text]
乃々香はもう一度、それを開いた。

認めたくないが、今はこれ以外に手がかりがない。

[next: water_sign_1]

---

# scene: no_connection_comments_1
status: draft
background: maze_corridor
ambience: silent

[text]
コメント欄を開こうとした。

画面は白くなり、読み込みの輪だけが回る。

通信がない。けれど、動画本体は再生できる。

オフライン保存しておいてよかった、と乃々香は思った。  
それが自分をここへ入れた理由の一つでもあるのに。

[next: water_sign_1]

---

# scene: water_sign_0
status: draft
background: crossroad
ambience: silent

[text]
次の分岐には、三つの案内板があった。

左のピクトグラムは、足のない人型。  
正面のピクトグラムは、水泳のような図像だった。オリンピックの競技マークで見たことがあるような、横向きの人影。  
右のピクトグラムは、五体満足の人型。

水泳マークの先は、水。

動画の雑な字幕が頭に残っている。

通路の奥から、水の匂いがした。

[next: choice_water_sign_0]

---

# scene: water_sign_1
status: draft
background: crossroad
ambience: silent

[text]
次の分岐には、三つの案内板があった。

左のピクトグラムは、足のない人型。  
正面のピクトグラムは、水泳のような図像だった。オリンピックの競技マークで見たことがあるような、横向きの人影。  
右のピクトグラムは、五体満足の人型。

水泳マークの先は、水。

動画の雑な字幕が頭に残っている。

通路の奥から、水の匂いがした。

[next: choice_water_sign_1]

---

# scene: choice_water_sign_0
status: draft
background: crossroad
ambience: silent

[choice]
prompt: どの道へ進むか。

- label: 足のない人型の左へ進む
  next: wrong_feet_loop1_from_water
  score: -1

- label: 水泳ピクトグラムの正面へ進む
  next: water_corridor_scene_0
  score: +0

- label: 五体満足の人型の右へ進む
  next: safe_second_path_0
  score: +1

# scene: choice_water_sign_1
status: draft
background: crossroad
ambience: silent

[choice]
prompt: どの道へ進むか。

- label: 足のない人型の左へ進む
  next: wrong_feet_loop2_from_water
  score: -1

- label: 水泳ピクトグラムの正面へ進む
  next: water_corridor_scene_1
  score: +0

- label: 五体満足の人型の右へ進む
  next: safe_second_path_1
  score: +1

# scene: wrong_feet_loop1_from_water
status: draft
background: maze_corridor
ambience: silent

[text]
左へ進んだ。

最初の数歩は何もなかった。  
けれど、足音が床に貼りつくように重くなる。

歩けないわけではない。  
ただ、足の裏が通路に覚えられていく感じがした。

次の角を曲がると、同じ十字路に戻っていた。

案内板のひびが増えている。

一度目だ。

乃々香は、そう数えた。

[next: loop_one_after_water]

# scene: loop_one_after_water
status: draft
background: crossroad
ambience: silent

[text]
十字路は、さっきよりわずかに平らに見えた。

左も、右も、正面も、通路の幅が似ている。  
まだ違いはある。  
けれど、違いを探さなければ見つからない。

戻される。

動画の字幕は、そう言っていた。

乃々香は、今度こそ欠けていない人型を選んだ。

[next: kiosk_area_1]

# scene: wrong_feet_loop2_from_water
status: draft
background: maze_corridor
ambience: silent

[text]
左へ進んだ。

足音が重くなる。  
床のタイルが、靴底を少しずつ覚えていく。

次の角を曲がると、同じ十字路に戻っていた。

蛍光灯の間隔が、どれも同じに見える。  
水の匂いが薄くなっている。  
キオスクの灯りも見えない。

二度目だ。

動画の字幕が頭に残っていた。

[document]
『※三回戻されたらアウト、らしい』

[next: kiosk_area_2]

# scene: water_corridor_scene_0
status: draft
background: water_corridor
ambience: silent

[text]
正面へ進むと、床に水が溜まっていた。

浅い。靴底が濡れる程度だ。だが、通路の奥へ行くほど水位は少しずつ上がっている。

天井から雫が落ちる。規則正しく、同じ間隔で。

遠くで、水をかく音がした。

人はいない。

乃々香は引き返した。水泳ピクトグラムは、道ではなく警告だった。

[next: safe_second_path_0]

---

# scene: safe_second_path_0
status: draft
background: maze_corridor
ambience: silent

[text]
右へ進むと、通路は乾いていた。

壁には相変わらず読めない文字がある。けれど案内板の人型は欠けていない。

乃々香は、進む前にピクトグラムを見るようになっていた。

文字は読まない。絵だけを見る。

そう決めると、少しだけ通路の形が分かる気がした。

[next: kiosk_area_0]

---

# scene: water_corridor_scene_1
status: draft
background: water_corridor
ambience: silent

[text]
正面へ進むと、床に水が溜まっていた。

浅い。靴底が濡れる程度だ。だが、通路の奥へ行くほど水位は少しずつ上がっている。

天井から雫が落ちる。規則正しく、同じ間隔で。

遠くで、水をかく音がした。

人はいない。

乃々香は引き返した。水泳ピクトグラムは、道ではなく警告だった。

[next: safe_second_path_1]

---

# scene: safe_second_path_1
status: draft
background: maze_corridor
ambience: silent

[text]
右へ進むと、通路は乾いていた。

壁には相変わらず読めない文字がある。けれど案内板の人型は欠けていない。

乃々香は、進む前にピクトグラムを見るようになっていた。

文字は読まない。絵だけを見る。

そう決めると、少しだけ通路の形が分かる気がした。

[next: kiosk_area_1]

---

# scene: kiosk_area_0
status: draft
background: kiosk
ambience: silent

[text]
通路の先に、キオスクがあった。

今度はシャッターが半分だけ開いている。店員はいない。客もいない。

棚には新聞のようなもの、雑誌のようなもの、菓子のような袋が並んでいる。文字はどれも読めない。

乃々香は、急に気づいた。

お腹が空いていない。  
喉も渇いていない。

どれだけ歩いたか分からないのに、足も痛くない。

それが、少しも安心にならなかった。

[next: choice_kiosk_0]

---

# scene: choice_kiosk_0
status: draft
background: kiosk
ambience: silent

[choice]
prompt: キオスクでどうするか。

- label: 何も取らず、先を急ぐ
  next: rush_past_kiosk_0
  score: +0

- label: 使わないが、水を一本買うつもりで小銭を置く
  next: keep_culture_hint_0
  score: +1

- label: 棚の商品を勝手に持っていく
  next: kiosk_loop_warning_1
  score: -1

# scene: rush_past_kiosk_0
status: draft
background: maze_corridor
ambience: silent

[text]
乃々香はキオスクを通り過ぎた。

必要なものはない。喉は渇かない。腹も減らない。

だが、必要がないから捨てていい、という考えが一瞬浮かんだことが怖かった。

食べること。払うこと。店の前で立ち止まること。  
そういう形がなくなると、自分も少しずつ迷路に近づく。

[next: cafe_choice_0]

---

# scene: keep_culture_hint_0
status: draft
background: kiosk
ambience: silent

[text]
乃々香は財布から小銭を出し、レジ横の皿に置いた。

水は飲まないかもしれない。そもそも喉は渇いていない。

それでも、買うという形を残したかった。

勝手に取る生活を始めたら、戻れなくなる気がした。

レジの奥で、読み取れない文字のレシートが一枚出た。

その端にだけ、小さな五体満足の人型が印刷されている。

[next: cafe_choice_0]

---

# scene: kiosk_area_1
status: draft
background: kiosk
ambience: silent

[text]
通路の先に、キオスクがあった。

今度はシャッターが半分だけ開いている。店員はいない。客もいない。

棚には新聞のようなもの、雑誌のようなもの、菓子のような袋が並んでいる。文字はどれも読めない。

乃々香は、急に気づいた。

お腹が空いていない。  
喉も渇いていない。

どれだけ歩いたか分からないのに、足も痛くない。

それが、少しも安心にならなかった。

[next: choice_kiosk_1]

---

# scene: choice_kiosk_1
status: draft
background: kiosk
ambience: silent

[choice]
prompt: キオスクでどうするか。

- label: 何も取らず、先を急ぐ
  next: rush_past_kiosk_1
  score: +0

- label: 使わないが、水を一本買うつもりで小銭を置く
  next: keep_culture_hint_1
  score: +1

- label: 棚の商品を勝手に持っていく
  next: kiosk_loop_warning_2
  score: -1

# scene: rush_past_kiosk_1
status: draft
background: maze_corridor
ambience: silent

[text]
乃々香はキオスクを通り過ぎた。

必要なものはない。喉は渇かない。腹も減らない。

だが、必要がないから捨てていい、という考えが一瞬浮かんだことが怖かった。

食べること。払うこと。店の前で立ち止まること。  
そういう形がなくなると、自分も少しずつ迷路に近づく。

[next: cafe_choice_1]

---

# scene: keep_culture_hint_1
status: draft
background: kiosk
ambience: silent

[text]
乃々香は財布から小銭を出し、レジ横の皿に置いた。

水は飲まないかもしれない。そもそも喉は渇いていない。

それでも、買うという形を残したかった。

勝手に取る生活を始めたら、戻れなくなる気がした。

レジの奥で、読み取れない文字のレシートが一枚出た。

その端にだけ、小さな五体満足の人型が印刷されている。

[next: cafe_choice_1]

---

# scene: kiosk_area_2
status: draft
background: kiosk
ambience: silent

[text]
通路の先に、キオスクがあった。

今度はシャッターが半分だけ開いている。店員はいない。客もいない。

棚には新聞のようなもの、雑誌のようなもの、菓子のような袋が並んでいる。文字はどれも読めない。

乃々香は、急に気づいた。

お腹が空いていない。  
喉も渇いていない。

どれだけ歩いたか分からないのに、足も痛くない。

それが、少しも安心にならなかった。

[next: choice_kiosk_2]

---

# scene: choice_kiosk_2
status: draft
background: kiosk
ambience: silent

[choice]
prompt: キオスクでどうするか。

- label: 何も取らず、先を急ぐ
  next: rush_past_kiosk_2
  score: +0

- label: 使わないが、水を一本買うつもりで小銭を置く
  next: keep_culture_hint_2
  score: +1

- label: 棚の商品を勝手に持っていく
  next: loop_three_bad
  score: -1

# scene: rush_past_kiosk_2
status: draft
background: maze_corridor
ambience: silent

[text]
乃々香はキオスクを通り過ぎた。

必要なものはない。喉は渇かない。腹も減らない。

だが、必要がないから捨てていい、という考えが一瞬浮かんだことが怖かった。

食べること。払うこと。店の前で立ち止まること。  
そういう形がなくなると、自分も少しずつ迷路に近づく。

[next: cafe_choice_2]

---

# scene: keep_culture_hint_2
status: draft
background: kiosk
ambience: silent

[text]
乃々香は財布から小銭を出し、レジ横の皿に置いた。

水は飲まないかもしれない。そもそも喉は渇いていない。

それでも、買うという形を残したかった。

勝手に取る生活を始めたら、戻れなくなる気がした。

レジの奥で、読み取れない文字のレシートが一枚出た。

その端にだけ、小さな五体満足の人型が印刷されている。

[next: cafe_choice_2]

---

# scene: kiosk_loop_warning_1
status: draft
background: kiosk
ambience: silent

[text]
乃々香は棚の袋を一つ取った。

必要ない。  
けれど、誰もいないのだから構わない気がした。

袋を持って店を出ると、通路が少し暗くなった。

次の角を曲がる。  
またキオスクがあった。

同じ棚。同じ袋。同じ半開きのシャッター。

ただ、今度はレジ横の皿に、腕のない人型のシールが貼られている。

戻された。

一度目。

乃々香は袋を棚へ戻した。

[next: cafe_choice_1]

# scene: kiosk_loop_warning_2
status: draft
background: kiosk
ambience: silent

[text]
乃々香は棚の袋を一つ取った。

次の角を曲がる。  
またキオスクがあった。

同じ棚。同じ袋。同じ半開きのシャッター。  
同じ照明。  
同じ高さの案内板。

前よりも、違いが少ない。

レジ横の皿に、腕のない人型のシールが貼られている。

二度目。

乃々香は袋を棚へ戻した。

[next: cafe_choice_2]

# scene: cafe_choice_0
status: draft
background: cafe
ambience: silent

[text]
カフェは、地下二階の連絡通路のような場所にあった。

営業しているはずがない。客はいない。店員もいない。

それでも照明は点き、カウンターには紙カップが積まれている。

コーヒーマシンのボタンを押せば、たぶん湯気が出る。

乃々香は、ここで暮らせるのではないかと思ってしまった。

[next: choice_cafe_0]

---

# scene: choice_cafe_0
status: draft
background: cafe
ambience: silent

[choice]
prompt: カフェでどうするか。

- label: 座って休み、迷路内で待つ方法を考える
  next: normal_waiting_path
  score: +0

- label: 動画を見直し、脱出条件を探す
  next: true_video_review
  score: +1

- label: もう一度適当に通路を選ぶ
  next: loop_one_from_cafe
  score: -2

# scene: cafe_choice_1
status: draft
background: cafe
ambience: silent

[text]
カフェは、地下二階の連絡通路のような場所にあった。

営業しているはずがない。客はいない。店員もいない。

それでも照明は点き、カウンターには紙カップが積まれている。

コーヒーマシンのボタンを押せば、たぶん湯気が出る。

乃々香は、ここで暮らせるのではないかと思ってしまった。

[next: choice_cafe_1]

---

# scene: choice_cafe_1
status: draft
background: cafe
ambience: silent

[choice]
prompt: カフェでどうするか。

- label: 座って休み、迷路内で待つ方法を考える
  next: normal_waiting_path
  score: +0

- label: 動画を見直し、脱出条件を探す
  next: true_video_review
  score: +1

- label: もう一度適当に通路を選ぶ
  next: loop_two_from_cafe
  score: -2

# scene: cafe_choice_2
status: draft
background: cafe
ambience: silent

[text]
カフェは、地下二階の連絡通路のような場所にあった。

営業しているはずがない。客はいない。店員もいない。

それでも照明は点き、カウンターには紙カップが積まれている。

コーヒーマシンのボタンを押せば、たぶん湯気が出る。

乃々香は、ここで暮らせるのではないかと思ってしまった。

[next: choice_cafe_2]

---

# scene: choice_cafe_2
status: draft
background: cafe
ambience: silent

[choice]
prompt: カフェでどうするか。

- label: 座って休み、迷路内で待つ方法を考える
  next: normal_waiting_path
  score: +0

- label: 動画を見直し、脱出条件を探す
  next: true_video_review
  score: +1

- label: もう一度適当に通路を選ぶ
  next: loop_three_bad
  score: -2

# scene: loop_one_from_cafe
status: draft
background: crossroad
ambience: silent

[text]
適当に選んだ通路は、すぐに同じカフェの前へ戻った。

店内の椅子は同じ位置にある。  
カウンターの紙カップも減っていない。

ただ、入口の案内板に細いひびが入っていた。

一度目。

乃々香は、もう適当には歩けないと理解した。

[next: cafe_choice_1]

# scene: loop_two_from_cafe
status: draft
background: crossroad
ambience: silent

[text]
適当に選んだ通路は、また同じカフェの前へ戻った。

今度はカフェだけではない。  
隣の通路も、その向こうの案内板も、同じ高さ、同じ幅、同じ白さに見えた。

二度目。

あと一度戻されたら終わりだと、動画は言っていた。

[next: cafe_choice_2]

# scene: normal_waiting_path
status: draft
background: cafe
ambience: silent

[text]
乃々香は紙カップを一つ取り、コーヒーを入れた。

香りはある。味も、たぶんある。

けれど、喉は渇いていない。

それでも乃々香は、カウンター席に座った。  
座る、飲む、考える。  
その順番を守ることにした。

迷路から出る方法はまだ分からない。  
でも、ここで暮らすことはできるかもしれない。

その考えが救いなのか、諦めなのか、判断できなかった。

[next: ending_normal]

---

# scene: true_video_review
status: draft
background: cafe
ambience: silent

[text]
乃々香は動画を最初から見直した。

安っぽい字幕。軽い効果音。  
けれど、その中に必要なことはほとんど書いてあった。

[document]
『文字は読もうとするな』  
『絵だけ見ろ』  
『欠けた人型の方へ行くな』  
『水泳マークは水』  
『最後は絶対振り返るな』

[text]
最後。

乃々香はその言葉で、最初の階段を思い出した。

俯いていた。  
動画を聞いていた。  
最後の一段でぶつかった。  
振り返った。

入るときにしたことを、出るときにはしてはいけない。

[next: final_stairs]

---

# scene: loop_three_bad
status: draft
background: crossroad
ambience: silent

[text]
適当に進めば、どこかに出る。

そう思って選んだ通路は、すぐに同じ十字路へ戻った。

三度目だった。

左の人型には、頭がなかった。  
右の人型には、足がなかった。  
正面の人型には、胴がなかった。

五体満足の絵は、どこにもない。

そのことを理解したあとも、通路は何も変わらなかった。

ただ、少しずつ、違いが消えていった。

[next: ending_bad]

---

# scene: final_stairs
status: draft
background: stairs_up
ambience: silent

[text]
上り階段は、唐突に現れた。

古い地下通路の奥。低い天井の先。読めない案内板の下。

ピクトグラムは一つだけだった。

人型は五体満足。  
階段を上がっている。

ただし、横の文字は読めない。

乃々香はスマホをポケットに入れた。

画面を見ない。  
足元だけを見ない。  
顔を上げる。

一段目を上がる。

背後で声がした。

[voice]
「ごめんなさい」

[next: choice_final_stairs]

---

# scene: choice_final_stairs
status: draft
background: stairs_up
ambience: silent

[choice]
prompt: 背後から声がする。

- label: 振り返る
  next: ending_bad_lookback
  score: -2

- label: 俯いて足元だけを見て上がる
  next: ending_normal_almost
  score: +0

- label: 顔を上げたまま、振り返らずに上がる
  next: ending_true
  score: +2

# scene: ending_bad_lookback
status: draft
background: bad_end_corridor
ambience: silent

[text]
乃々香は振り返った。

背後には誰もいなかった。

けれど、階段もなかった。

あるのは、同じ高さの天井、同じ白いタイル、同じ間隔の蛍光灯だった。

最初にここへ入ったときと同じだった。  
ただ、もう一度目ではない。

案内板の人型は、どれも欠けている。

出口を見つけたと思った場所で振り返ったから、迷路はもう一度、乃々香を選ばせなくした。

[next: ending_bad]

# scene: ending_bad
status: draft
background: bad_end_corridor
ambience: silent

[text]
景色の差が消えていった。

さっきまで水の染みがあった壁は、次の通路では何もない白いタイルになっていた。  
古いシャッターの並ぶ通路も、改札跡のある広場も、いつの間にか同じ幅の廊下に戻っていた。

蛍光灯は同じ間隔で並んでいる。  
床のタイルも同じ。  
案内板も同じ高さに掛かっている。

左へ曲がっても、正面へ進んでも、右へ折れても、違いがなかった。

スマホの画面は点いている。通信はない。  
保存していた動画だけが、まだ再生できた。

[voice]
「ごめんなさい、ごめんなさい、ごめんなさい」

[text]
乃々香は動画を止めた。

足音は止まらなかった。

喉は渇かない。  
腹も減らない。  
眠くもならない。  
足も痛まない。

まだ歩ける。

それが分かったとき、乃々香はようやく理解した。

迷路は、出口のない場所ではなかった。

出口を選べなくなった場所だった。

その先にも、同じ明るさの、同じ幅の、同じ通路が続いていた。

[ending]
ending: bad
title: BAD END
subtitle: まだ歩いている

---

# scene: ending_normal
status: draft
background: cafe
ambience: silent

[text]
カフェは、地下二階の連絡通路を曲がった先にあった。

朝かどうかは分からない。スマホの時計は、何度見ても同じ時刻を示している。

それでも乃々香は、朝と決めた時間にカフェへ行くことにした。

コーヒーを入れる。飲む必要はない。喉は渇かない。

キオスクでは、新聞のようなものを買う。読むことはできない。文字は、漢字とひらがなとカタカナを混ぜたような形のまま、意味にならない。

それでも小銭を置く。レシートを財布にしまう。

迷路の中では、お腹は空かない。喉も渇かない。眠らなくても、体は動く。

だからこそ、乃々香は食べる時間を決めた。飲む時間を決めた。ベンチに座る時間を決めた。見つけた通路をメモする時間を決めた。

生活を失わないために。

いつか誰かが来るかもしれない。

同じ階段を降りて、同じ動画を見て、同じ声を聞き、同じように振り返ってしまう誰か。  
あるいは、自分を探してくれる誰か。

その人が来たとき、乃々香は言うつもりだった。

振り返らないで。  
文字は読まないで。  
欠けた人型の方へ行かないで。

それまで、ここで待つ。

カフェの照明は、今日も消えない。

[ending]
ending: normal
title: NORMAL END
subtitle: 待合

---

# scene: ending_normal_almost
status: draft
background: cafe
ambience: silent

[text]
乃々香は足元だけを見て階段を上がった。

一段。  
もう一段。  
さらに一段。

背後の声には振り返らなかった。

けれど、顔を上げることもできなかった。

階段を上がりきった先にあったのは、駅の外でも、いつもの改札でもない。  
あのカフェだった。

紙カップが積まれている。照明は消えない。

脱出には届かなかった。  
だが、完全に迷路へ飲み込まれたわけでもなかった。

乃々香はカウンター席に座った。

次に誰かが来るまで、ここで待つしかない。

[ending]
ending: normal
title: NORMAL END
subtitle: 待合

---

# scene: ending_true
status: draft
background: station_stairs
ambience: silent

[text]
乃々香は、顔を上げたまま階段を上がった。

背後で声がした。

[voice]
「ごめんなさい」

[text]
振り返らない。

もう一段。

[voice]
「ごめんなさい」

[text]
振り返らない。

最後の一段で、肩に何かが触れた気がした。

それでも、乃々香は前だけを見て上がった。

次の瞬間、駅の音が戻ってきた。

構内放送。電車の振動。誰かの話し声。  
目の前には、いつもの地下通路があった。

乃々香は階段の上に立っていた。

スマホを見る。

保存済みの動画は、まだ残っている。

タイトルだけが変わっていた。

[document]
『都市伝説を集めてみた　パート23』

[text]
サムネイルには、見覚えのないピクトグラムが映っている。

五体満足の人型だった。

[ending]
ending: true
title: TRUE END
subtitle: 上り階段
