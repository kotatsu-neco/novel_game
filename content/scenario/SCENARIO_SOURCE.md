# SCENARIO_SOURCE.md

## この文書の役割

これは `maze-loop-v04-ui-choice-canon` の Runtime 同期版シナリオソースです。

# content-pack
title: 迷路
gameId: maze
startScene: opening

---

# scene: opening
status: runtime_synced
background: black_plain
ambience: silent

[text]
白井乃々香は、地下鉄の階段を降りながら、片方のイヤホンで動画を聞いていた。

大学の帰りだった。四限のあと、友人と学食の前で少し話し、コンビニで明日の朝食を買い、駅に着いたころには空が暗くなりかけていた。

改札前の床は、雨の日でもないのに湿っていた。  
天井の蛍光灯は一本だけ色が違い、白というより青に近い光を落としている。  
いつもの駅のはずなのに、人の流れが少ない。

乃々香は、そこまで気にしなかった。

スマホの画面には、保存済みの動画が表示されている。

[document]
『都市伝説を集めてみた　パート22』

[text]
いかにも雑なタイトルだった。サムネイルには赤い太字で「絶対に振り返るな」と書かれている。こういう動画ほど、たいてい何も起きない。

それでも乃々香はパート21まで見ていた。怖いからではない。何かを見ていないと、帰り道の疲れが急に体へ戻ってくるからだった。

階段の手すりは冷たかった。  
降りるたびに、靴音がひとつ遅れて返ってくる。

乃々香は一度だけ足を止め、後ろを見ようとした。  
だが、上の階から降りてくる人の気配はなかった。

片方のイヤホンから、安っぽい効果音が鳴った。

[voice]
「次は、地下階段にまつわる都市伝説です」

[text]
乃々香は画面を見たまま、最後の踊り場を曲がった。

[next: video_phrase]

---

# scene: video_phrase
status: runtime_synced
background: station_stairs
ambience: silent

[text]
動画の中で、合成音声が急に低くなる。

耳の奥に、少しだけ圧がかかった。  
地下鉄のホームに近づいたときの、あの低い震えとは違っていた。

[voice]
「ごめんなさい、ごめんなさい、ごめんなさい」

[text]
同じ言葉が、三度続いた。

乃々香は笑いかけた。怖がらせたいのだろうが、声が機械的すぎた。

けれど、階段の下から返ってくるはずの構内音がない。

画面には、雑なテロップが出ている。

[document]
『地下へ降りるときは、顔を伏せる？  
最後の段で誰かにぶつかったら——』

[text]
そこまで読んだところで、最後の一段を踏んだ。

肩が、誰かに当たった。

布の感触ではなかった。  
冷たい壁にぶつかったような硬さでもなかった。

人の肩だ、と体だけが先に判断した。

[voice]
「あ、すみま——」

[text]
言い終える前に、乃々香は振り返っていた。

そこには、誰もいなかった。

階段も、なかった。

[next: no_one_there]

---

# scene: no_one_there
status: runtime_synced
background: maze_corridor
ambience: silent

[text]
人がいない。

それが最初に分かった異変だった。

改札へ向かうはずの地下通路には、誰もいなかった。会社員も、学生も、ベビーカーも、駅員もいない。

音もない。構内放送も、電車の低い振動も、遠くの足音もない。

乃々香はイヤホンを外した。

「すみません」

声は、思ったより小さく出た。

乃々香は息を吸い直す。

[voice]
「誰かいませんか」

[text]
返事はなかった。

もう一度、今度は少し大きく呼んだ。  
白いタイルの壁が、声の端だけを薄く返した。

動画は止まっている。画面にはまだ、同じテロップが残っていた。

[document]
『振り返るな』

[text]
乃々香は、階段のあったはずの方を見た。

さっき降りてきたはずの階段は、なかった。

その代わりに、同じ幅の地下通路が、左右と正面へ伸びていた。

通路の天井には、駅で見慣れた非常口灯のようなものがある。  
けれど矢印の向きだけが、見るたびに少し違っている気がした。

乃々香はスマホを握り直した。  
手のひらが汗で湿っている。

[next: choice_initial_check]

---

# scene: choice_initial_check
status: runtime_synced
background: maze_corridor
ambience: silent

[choice]
prompt: まず、何を確かめるか。

- label: 階段と駅員を探す
  next: check_missing_stairs
  score: 0

- label: スマホで連絡を試す
  next: check_saved_video
  score: 1

- label: 案内板と非常口表示を見る
  next: check_sign_shape
  score: 1

---

# scene: check_missing_stairs
status: runtime_synced
background: maze_corridor
ambience: silent

[text]
乃々香は、さっき降りてきた階段を探した。

最初は歩いた。  
次に少し早足になった。  
最後には、白い壁に沿って手を這わせながら戻った。

階段はない。

壁で塞がれているのではない。シャッターが下りているのでもない。最初からそこには通路しかなかった、という形で消えている。

床のタイルは、階段があった場所まで同じ模様で続いていた。

「駅員さん」

声を出すと、すぐに恥ずかしさが来た。  
それでも乃々香はもう一度呼んだ。

「誰か」

返事はない。

駅員室の窓も、改札機の光も、非常ボタンも見当たらなかった。  
ただ、駅に似たものだけが続いている。

戻る場所が消えたのではない。

戻る場所が、最初からなかったことにされている。

[next: first_sign]

---

# scene: check_saved_video
status: runtime_synced
background: maze_corridor
ambience: silent

[text]
乃々香はスマホを開いた。

まず母へ電話をかけようとした。  
発信音は鳴らなかった。

画面は、通話中にも、圏外にもならない。ただ、押したはずの発信ボタンが何事もなかったように戻っている。

メッセージアプリを開く。  
最後に友人から来ていたスタンプは表示される。けれど、新しい文字を打っても、送信の矢印だけが薄いままだった。

緊急通報の番号を押すことも考えた。  
指はそこまで動いた。  
だが、画面の上にはアンテナの表示がなかった。時刻だけが同じ場所に残っている。

それでも、保存済みの動画だけは開けた。

[document]
『都市伝説を集めてみた　パート22』

[text]
動画のサムネイルは、さっきより暗く見えた。

赤い文字の「絶対に振り返るな」だけが、やけにはっきりしている。

助けを呼ぶ画面は黙っていた。  
この動画だけが、まだこちらを見ている。

[next: first_sign]

---

# scene: check_sign_shape
status: runtime_synced
background: maze_corridor
ambience: silent

[text]
乃々香は通路の先の案内板を見た。

形は駅のものだった。緑の矢印。白い板。黒い文字。ピクトグラム。非常口灯のような小さな箱も、天井近くに付いている。

しかし、配置だけが駅で、意味が駅ではない。

文字は読めない。  
矢印は、正しい方向を示しているようで、少しずつ角度がずれている。  
非常口の人影は走っているのに、出口の形が描かれていない。

案内しようとしている。  
そのことだけは分かる。

それがいちばん嫌だった。

[next: first_sign]

---

# scene: first_sign
status: runtime_synced
background: crossroad
ambience: silent

[text]
十字路の正面に、案内板があった。

緑の矢印。白い板。黒い文字。駅の案内表示に見える。

けれど文字だけが読めなかった。

漢字の角張った骨組みに、ひらがなの丸みと、カタカナの直線が混じっている。日本語に見える。でも、どの線も知っている字になる直前で曲がっていた。

乃々香は、文字を読むのをやめた。

ただ、ピクトグラムだけは分かる。

左の案内板には、人型があった。頭の部分が白く抜けている。  
右の案内板にも、人型がある。片腕の線が途切れている。  
正面の案内板の人型だけは、何をしているのか分からないが、輪郭が最後までつながっていた。

正解に見えたわけではない。

それでも、他の二つよりは、まだ人の形に近かった。

[next: choice_first_crossroad]

---

# scene: choice_first_crossroad
status: runtime_synced
background: crossroad
ambience: silent

[choice]
prompt: どの道へ進むか。

- label: 左の道を選ぶ
  next: wrong_head_loop1
  score: -1
  increment:
    mazeLoopCount: 1
  set:
    lastLoopCause: first_crossroad

- label: 真ん中の道を選ぶ
  next: safe_first_path
  score: 1
  set:
    lastLoopCause: none

- label: 右の道を選ぶ
  next: wrong_arm_loop1
  score: -1
  increment:
    mazeLoopCount: 1
  set:
    lastLoopCause: first_crossroad

---

# scene: wrong_head_loop1
status: runtime_synced
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
status: runtime_synced
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
status: runtime_synced
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

---

# scene: safe_first_path
status: runtime_synced
background: maze_corridor
ambience: silent

[text]
乃々香は正面へ進んだ。

案内板の人型が何を示しているのかは分からなかった。歩いているようにも、ただ立っているようにも見える。

輪郭は途中で途切れていない。

通路の奥に、閉鎖されたキオスクがあった。シャッターは下りている。なのに内側の灯りだけが点いている。

雑誌の表紙に、読めない文字が並んでいた。その横に、小さな人型のピクトグラムが印刷されている。

どれも、同じように人の形を保っていた。

乃々香は、少しだけ息を吐いた。

[next: video_hint_no_loop]

---

# scene: video_hint_no_loop
status: runtime_synced
background: maze_corridor
ambience: silent

[text]
乃々香は、画面を見つめた。

ふざけた字幕だった。けれど、さっきの案内板と、完全に無関係とは思えない。

足りない絵の先で画面が飛ぶ。

「飛ぶ」という言い方が、いやに軽い。

乃々香はスマホを下ろした。通路の白い壁が、画面の光よりも冷たく見えた。

[document]
『その22：地下階段の変な案内板  
・文字は読めないらしいｗ  
・絵だけは毎回同じ  
・足りない絵の先で画面が飛ぶ  
・泳いでるやつの先、音が変  
・上り階段では後ろを見るな』

[text]
乃々香は、画面を見つめた。

ふざけた字幕だった。けれど、さっきの案内板と合っている。

欠けている人の方に行くと戻される。

まだ戻されてはいない。  
だからこそ、ここから間違えてはいけない。

[next: choice_video_response]

---

# scene: video_hint_after_loop1
status: runtime_synced
background: maze_corridor
ambience: silent

[text]
乃々香は、画面を見つめた。

足りない絵の先で画面が飛ぶ。

さっき飛んだのは、画面ではなかった。

自分の立っている場所だった。

一度目。

その言葉を、乃々香は声に出さずに飲み込んだ。

[document]
『その22：地下階段の変な案内板  
・文字は読めないらしいｗ  
・絵だけは毎回同じ  
・足りない絵の先で画面が飛ぶ  
・泳いでるやつの先、音が変  
・上り階段では後ろを見るな』

[text]
乃々香は、画面を見つめた。

欠けている人の方に行くと戻される。

今なら分かる。  
さっき自分は、戻されたのだ。

一度目。

その言葉を、乃々香は声に出さずに飲み込んだ。

[next: choice_video_response]

---

# scene: choice_video_response
status: runtime_synced
background: maze_corridor
ambience: silent

[choice]
prompt: 動画をどう扱うか。

- label: 動画を最後まで見直す
  next: watch_video_more
  score: 1

- label: 怖くなって動画を閉じる
  next: close_video
  score: 0

- label: コメント欄を開こうとする
  next: no_connection_comments
  score: 0

---

# scene: watch_video_more
status: runtime_synced
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

[next: water_sign]

---

# scene: close_video
status: runtime_synced
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

[next: water_sign]

---

# scene: no_connection_comments
status: runtime_synced
background: maze_corridor
ambience: silent

[text]
コメント欄を開こうとした。

画面は白くなり、読み込みの輪だけが回る。

通信がない。けれど、動画本体は再生できる。

オフライン保存しておいてよかった、と乃々香は思った。  
それが自分をここへ入れた理由の一つでもあるのに。

[next: water_sign]

---

# scene: water_sign
status: runtime_synced
background: crossroad
ambience: silent

[text]
次の分岐には、三つの案内板があった。

左のピクトグラムは、足元の線が白く抜けている。  
正面のピクトグラムは、横向きの人影だった。腕を伸ばしているのか、泳いでいるのか、壁の汚れで判然としない。  
右のピクトグラムは、まっすぐ立つ人影だった。

正面の通路の奥から、湿った匂いがした。

乃々香は、案内板から目を離せなかった。

[next: choice_water_sign]

---

# scene: choice_water_sign
status: runtime_synced
background: crossroad
ambience: silent

[choice]
prompt: どの道へ進むか。

- label: 左の道を選ぶ
  next: water_wrong_gate
  score: -1
  increment:
    mazeLoopCount: 1
  set:
    lastLoopCause: water_sign

- label: 真ん中の道を選ぶ
  next: water_corridor_scene
  score: 0

- label: 右の道を選ぶ
  next: safe_second_path
  score: 1

---

# scene: water_wrong_gate
status: runtime_synced
background: crossroad
ambience: silent

[routeCheck]
{"if": {"state": "mazeLoopCount", "gte": 3}, "next": "loop_three_bad", "ending": "bad"}
{"if": {"state": "mazeLoopCount", "equals": 2}, "next": "wrong_feet_loop2_from_water"}
{"default": true, "next": "wrong_feet_loop1_from_water"}

---

# scene: wrong_feet_loop1_from_water
status: runtime_synced
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

---

# scene: loop_one_after_water
status: runtime_synced
background: crossroad
ambience: silent

[text]
十字路は、さっきよりわずかに平らに見えた。

左も、右も、正面も、通路の幅が似ている。  
まだ違いはある。  
けれど、違いを探さなければ見つからない。

床の継ぎ目に、さっきはなかった濡れた跡がある。

乃々香は案内板を見た。  
文字は追わない。

線が最後までつながっている人影の方へ、今度は足を向けた。

[next: kiosk_area]

---

# scene: wrong_feet_loop2_from_water
status: runtime_synced
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

[next: kiosk_area]

---

# scene: water_corridor_scene
status: runtime_synced
background: water_corridor
ambience: silent

[text]
正面へ進むと、床に水が溜まっていた。

浅い。靴底が濡れる程度だ。だが、通路の奥へ行くほど水位は少しずつ上がっている。

天井から雫が落ちる。規則正しく、同じ間隔で。

遠くで、水をかく音がした。

人はいない。

乃々香は引き返した。水泳ピクトグラムは、道ではなく警告だった。

[next: safe_second_path]

---

# scene: safe_second_path
status: runtime_synced
background: maze_corridor
ambience: silent

[text]
右へ進むと、通路は乾いていた。

壁には相変わらず読めない文字がある。案内板の人影は、輪郭が最後までつながっている。

乃々香は、進む前にピクトグラムを見るようになっていた。

文字は読まない。絵だけを見る。

そう決めると、少しだけ通路の形が分かる気がした。

[next: kiosk_area]

---

# scene: kiosk_area
status: runtime_synced
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

[next: choice_kiosk]

---

# scene: choice_kiosk
status: runtime_synced
background: kiosk
ambience: silent

[choice]
prompt: キオスクでどうするか。

- label: 何も取らず、先を急ぐ
  next: rush_past_kiosk
  score: 0

- label: 使わないが、水を一本買うつもりで小銭を置く
  next: keep_culture_hint
  score: 1

- label: 棚の商品を勝手に持っていく
  next: kiosk_wrong_gate
  score: -1
  increment:
    mazeLoopCount: 1
  set:
    lastLoopCause: kiosk

---

# scene: rush_past_kiosk
status: runtime_synced
background: maze_corridor
ambience: silent

[text]
乃々香はキオスクを通り過ぎた。

必要なものはない。喉は渇かない。腹も減らない。

だが、必要がないから捨てていい、という考えが一瞬浮かんだことが怖かった。

食べること。払うこと。店の前で立ち止まること。  
そういう形がなくなると、自分も少しずつ迷路に近づく。

[next: cafe_choice]

---

# scene: keep_culture_hint
status: runtime_synced
background: kiosk
ambience: silent

[text]
乃々香は財布から小銭を出し、レジ横の皿に置いた。

水は飲まないかもしれない。そもそも喉は渇いていない。

それでも、買うという形を残したかった。

勝手に取る生活を始めたら、戻れなくなる気がした。

レジの奥で、読み取れない文字のレシートが一枚出た。

その端にだけ、小さな人影のピクトグラムが印刷されている。

[next: cafe_choice]

---

# scene: kiosk_wrong_gate
status: runtime_synced
background: kiosk
ambience: silent

[routeCheck]
{"if": {"state": "mazeLoopCount", "gte": 3}, "next": "loop_three_bad", "ending": "bad"}
{"if": {"state": "mazeLoopCount", "equals": 2}, "next": "kiosk_loop_warning_2"}
{"default": true, "next": "kiosk_loop_warning_1"}

---

# scene: kiosk_loop_warning_1
status: runtime_synced
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

[next: cafe_choice]

---

# scene: kiosk_loop_warning_2
status: runtime_synced
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

[next: cafe_choice]

---

# scene: cafe_choice
status: runtime_synced
background: cafe
ambience: silent

[text]
カフェは、地下二階の連絡通路のような場所にあった。

営業しているはずがない。客はいない。店員もいない。

それでも照明は点き、カウンターには紙カップが積まれている。

コーヒーマシンのボタンを押せば、たぶん湯気が出る。

乃々香は、ここで暮らせるのではないかと思ってしまった。

[next: choice_cafe]

---

# scene: choice_cafe
status: runtime_synced
background: cafe
ambience: silent

[choice]
prompt: カフェでどうするか。

- label: 座って休み、迷路内で待つ方法を考える
  next: normal_waiting_path
  score: 0

- label: 動画を見直し、脱出条件を探す
  next: true_video_review
  score: 1

- label: もう一度適当に通路を選ぶ
  next: cafe_wrong_gate
  score: -2
  increment:
    mazeLoopCount: 1
  set:
    lastLoopCause: cafe

---

# scene: cafe_wrong_gate
status: runtime_synced
background: cafe
ambience: silent

[routeCheck]
{"if": {"state": "mazeLoopCount", "gte": 3}, "next": "loop_three_bad", "ending": "bad"}
{"if": {"state": "mazeLoopCount", "equals": 2}, "next": "loop_two_from_cafe"}
{"default": true, "next": "loop_one_from_cafe"}

---

# scene: loop_one_from_cafe
status: runtime_synced
background: crossroad
ambience: silent

[text]
適当に選んだ通路は、すぐに同じカフェの前へ戻った。

店内の椅子は同じ位置にある。  
カウンターの紙カップも減っていない。

ただ、入口の案内板に細いひびが入っていた。

一度目。

乃々香は、もう適当には歩けないと理解した。

[next: cafe_choice]

---

# scene: loop_two_from_cafe
status: runtime_synced
background: crossroad
ambience: silent

[text]
適当に選んだ通路は、また同じカフェの前へ戻った。

今度はカフェだけではない。  
隣の通路も、その向こうの案内板も、同じ高さ、同じ幅、同じ白さに見えた。

二度目。

あと一度戻されたら終わりだと、動画は言っていた。

[next: cafe_choice]

---

# scene: normal_waiting_path
status: runtime_synced
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
status: runtime_synced
background: cafe
ambience: silent

[text]
乃々香は動画を最初から見直した。

安っぽい字幕。軽い効果音。  
けれど、その中に必要なことはほとんど書いてあった。

[document]
『文字を追うな』  
『絵の形だけ残せ』  
『足りない絵の先で映像が途切れる』  
『泳ぐ形の先は濡れている』  
『階段では後ろを見るな』

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
status: runtime_synced
background: crossroad
ambience: silent

[text]
適当に進めば、どこかに出る。

そう思って選んだ通路は、すぐに同じ十字路へ戻った。

三度目だった。

左の人型には、頭がなかった。  
右の人型には、足がなかった。  
正面の人型には、胴がなかった。

どの絵も、人の形を最後まで保っていない。

そのことを理解したあとも、通路は何も変わらなかった。

ただ、少しずつ、違いが消えていった。

[next: ending_bad]

---

# scene: final_stairs
status: runtime_synced
background: stairs_up
ambience: silent

[text]
上り階段は、唐突に現れた。

古い地下通路の奥。低い天井の先。読めない案内板の下。

ピクトグラムは一つだけだった。

人影は、階段を上がっている。  
輪郭は途中で途切れていない。

ただし、横の文字は読めない。

乃々香はスマホをポケットに入れた。

画面を見ない。  
足元を数えない。  
階段の先だけを視界に置く。

一段目を上がる。

背後で声がした。

[voice]
「ごめんなさい」

[next: choice_final_stairs]

---

# scene: choice_final_stairs
status: runtime_synced
background: stairs_up
ambience: silent

[choice]
prompt: 背後から声がする。

- label: 振り返る
  next: ending_bad_lookback
  score: -2

- label: 足元だけを見て急いで上がる
  next: ending_normal_almost
  score: 0

- label: 階段の先だけを見て上がる
  next: ending_true
  score: 2

---

# scene: ending_bad_lookback
status: runtime_synced
background: bad_end_corridor
ambience: silent

[text]
乃々香は振り返った。

背後には誰もいなかった。

けれど、階段もなかった。

あるのは、同じ高さの天井、同じ白いタイル、同じ間隔の蛍光灯だった。

最初にここへ入ったときと同じだった。  
ただ、もう一度目ではない。

案内板の人型は、どれも途中で途切れている。

出口を見つけたと思った場所で振り返ったから、迷路はもう一度、乃々香を選ばせなくした。

[next: ending_bad]

---

# scene: ending_bad
status: runtime_synced
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
status: runtime_synced
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
status: runtime_synced
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
status: runtime_synced
background: station_stairs
ambience: silent

[text]
乃々香は、階段の先だけを見て上がった。

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

輪郭の途切れていない、人の形だった。

[ending]
ending: true
title: TRUE END
subtitle: 上り階段

---
