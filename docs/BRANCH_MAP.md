# BRANCH_MAP.md

## 分岐1 鈴をどう扱うか

| 選択肢 | score | 状態 |
|---|---:|---|
| 白布に包む | +1 | bell_wrap |
| そのまま持つ | 0 | bell_pocket |
| 鈴を鳴らして確かめる | -1 | bell_ring |

## 分岐2 絵馬の前でどうするか

| 選択肢 | score | 状態 |
|---|---:|---|
| 名前を読まず、鈴を置く | +1 | ema_place_bell |
| 書かれた名前を小声で読む | -1 | ema_read_name |
| 絵馬を外して裏を見る | 0 | ema_remove |

## 分岐3 呼び声にどう反応するか

| 選択肢 | score | 状態 |
|---|---:|---|
| 振り返らない | +1 | voice_no_turn |
| 鳥居まで走る | 0 | voice_run |
| 返事をする | BAD強制 | voice_answer |

## エンディング

| 条件 | END |
|---|---|
| voice_answer | BAD |
| score >= 2 | TRUE |
| score >= 0 | NORMAL |
| score < 0 | BAD |
