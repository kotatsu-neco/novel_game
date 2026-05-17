// Japanese layout rules for horizontal sound novel text.
// v02: JLREQ-inspired practical kinsoku rules for pagination/page-head safety.

export const NO_LINE_START_CHARS = new Set(Array.from(
  "、。，．,.！？!?」』）】〕〉》ぁぃぅぇぉゃゅょっァィゥェォャュョッヵヶーゝゞヽヾ々…"
));

export const NO_LINE_END_CHARS = new Set(Array.from(
  "「『（【〔〈《"
));

export const STRONG_BREAK_AFTER_CHARS = new Set(Array.from("。．.!！？?」』）】"));
export const WEAK_BREAK_AFTER_CHARS = new Set(Array.from("、，,"));

export function normalizeInlineCommands(text) {
  return String(text ?? "")
    .replaceAll("[r]", "\n")
    .replaceAll("[p]", "\n");
}

export function splitManualPages(text) {
  return String(text ?? "").split("[p]");
}

export function isNoLineStartChar(ch) {
  return NO_LINE_START_CHARS.has(ch);
}

export function isNoLineEndChar(ch) {
  return NO_LINE_END_CHARS.has(ch);
}

export function isPunctuationOnly(text) {
  const chars = Array.from(String(text ?? "").trim());
  return chars.length > 0 && chars.every((ch) => isNoLineStartChar(ch));
}

export function isEllipsisFragment(text) {
  const trimmed = String(text ?? "").trim();
  if (!trimmed) return false;
  // A single ellipsis glyph should not be isolated as a page/line.
  if (trimmed === "…") return true;
  // Odd-length ellipsis runs are risky because Japanese prose commonly uses "……".
  if (/^…+$/.test(trimmed) && Array.from(trimmed).length % 2 === 1) return true;
  return false;
}

export function startsWithEllipsisFragment(text) {
  const trimmed = String(text ?? "").trimStart();
  if (!trimmed) return false;
  return trimmed.startsWith("…") && !trimmed.startsWith("……");
}

export function endsWithOddEllipsis(text) {
  const trimmed = String(text ?? "").trimEnd();
  const match = trimmed.match(/…+$/);
  if (!match) return false;
  return Array.from(match[0]).length % 2 === 1;
}

export function isWeakPageStart(text) {
  const trimmed = String(text ?? "").trimStart();
  if (!trimmed) return false;
  if (trimmed.startsWith("……")) return false;
  const first = Array.from(trimmed)[0];
  return isNoLineStartChar(first);
}

export function isWeakPageEnd(text) {
  const trimmed = String(text ?? "").trimEnd();
  if (!trimmed) return false;
  const chars = Array.from(trimmed);
  return isNoLineEndChar(chars[chars.length - 1]);
}

export function violatesPageSplit(leftText, rightText) {
  const left = String(leftText ?? "");
  const right = String(rightText ?? "");
  if (!right.trim()) return false;
  if (!left.trim()) return false;
  if (isWeakPageStart(right)) return true;
  if (isWeakPageEnd(left)) return true;
  if (isPunctuationOnly(right)) return true;
  if (isEllipsisFragment(right)) return true;
  if (startsWithEllipsisFragment(right)) return true;
  if (endsWithOddEllipsis(left)) return true;
  return false;
}

export function preferredSplitIndex(chars, maxIndex) {
  const safeMax = Math.max(1, Math.min(maxIndex, chars.length));
  const nearFloor = Math.max(1, safeMax - 28);

  const findBackward = (predicate, floor = nearFloor) => {
    for (let i = safeMax; i >= floor; i -= 1) {
      const prev = chars[i - 1];
      const next = chars[i];
      if (!prev) continue;
      if (predicate(prev) && !isNoLineStartChar(next || "") && !isNoLineEndChar(prev)) {
        return i;
      }
    }
    return -1;
  };

  let candidate = findBackward((ch) => STRONG_BREAK_AFTER_CHARS.has(ch));
  if (candidate > 0) return candidate;

  candidate = findBackward((ch) => WEAK_BREAK_AFTER_CHARS.has(ch));
  if (candidate > 0) return candidate;

  // Use manual line breaks before character-level fallback.
  candidate = findBackward((ch) => ch === "\n", Math.max(1, safeMax - 60));
  if (candidate > 0) return candidate;

  return safeMax;
}

export function safeSplitIndex(chars, maxIndex) {
  if (chars.length <= maxIndex) return chars.length;

  let split = preferredSplitIndex(chars, maxIndex);
  split = Math.max(1, Math.min(split, maxIndex));

  while (split > 1) {
    const left = chars.slice(0, split).join("");
    const right = chars.slice(split).join("");
    if (!violatesPageSplit(left, right)) return split;
    split -= 1;
  }

  return Math.max(1, split);
}

export function mergePunctuationOnlyPages(pages) {
  const result = [];
  for (const page of pages) {
    if (isPunctuationOnly(page) && result.length > 0) {
      result[result.length - 1] += page;
    } else {
      result.push(page);
    }
  }
  return result;
}

export function describeRuleViolation(leftText, rightText) {
  if (isWeakPageStart(rightText)) return "right page starts with prohibited character";
  if (isWeakPageEnd(leftText)) return "left page ends with opening bracket";
  if (isPunctuationOnly(rightText)) return "right page is punctuation only";
  if (isEllipsisFragment(rightText)) return "right page is ellipsis fragment";
  if (startsWithEllipsisFragment(rightText)) return "right page starts with ellipsis fragment";
  if (endsWithOddEllipsis(leftText)) return "left page ends with odd ellipsis";
  return "";
}
