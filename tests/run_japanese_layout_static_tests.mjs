import {
  isEllipsisFragment,
  startsWithEllipsisFragment,
  endsWithOddEllipsis,
  violatesPageSplit,
  safeSplitIndex,
  isNoLineStartChar,
  isWeakPageStart
} from "../src/engine/japaneseLayoutRules.js";

const failures = [];
function check(label, value) {
  if (!value) failures.push(label);
}

check("ellipsis fragment single", isEllipsisFragment("…"));
check("ellipsis pair not fragment", !isEllipsisFragment("……"));
check("single ellipsis start is weak", startsWithEllipsisFragment("…それでも"));
check("pair ellipsis start allowed", !startsWithEllipsisFragment("……それでも"));
check("weak page start allows pair ellipsis", !isWeakPageStart("……それでも"));
check("weak page start rejects comma", isWeakPageStart("、続き"));
check("odd ellipsis end", endsWithOddEllipsis("そう…"));
check("not odd ellipsis end", !endsWithOddEllipsis("そう……"));
check("no line start comma", isNoLineStartChar("、"));
check("split violation punctuation", violatesPageSplit("これは", "、続き"));
check("split violation single ellipsis", violatesPageSplit("それ", "…でも"));
const chars = Array.from("これはテストです。……それでも進む。");
const split = safeSplitIndex(chars, 12);
check("safeSplit positive", split > 0);
check("safeSplit bounded", split <= 12);

if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, checked: 13 }, null, 2));
