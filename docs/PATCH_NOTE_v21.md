# PATCH_NOTE_v21.md

## 変更内容

1. 最大30分程度の作品を想定範囲として明文化。
2. `conditionalText` のRuntime表示に対応。
3. `state.visited[sceneId]` の自動加算を追加。
4. route guardを追加。
5. `tools/check_route_graph.py` を追加。
6. 到達不能scene、合流点、loop候補、ending到達、推定読了時間を検査可能にした。
7. 『返し鈴』本文の直接修正は行っていない。

## 推奨規模

```text
最大プレイ時間：30分
scene数：80以下
choice総数：25以下
本文量：概ね13,500字以下
```

## 未確認

- 実ブラウザ確認
- iPhone Safari確認
- conditionalText使用シナリオの実機確認
