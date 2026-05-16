export function runValidator(scenario) {
  const errors = [];
  if (!scenario || typeof scenario !== "object") errors.push("scenario must be object");
  if (!scenario.startScene) errors.push("startScene is required");
  if (!Array.isArray(scenario.scenes)) errors.push("scenes must be array");

  if (errors.length) return { ok: false, errors };

  const ids = new Set();
  for (const scene of scenario.scenes) {
    if (!scene.id) errors.push("scene id is required");
    if (ids.has(scene.id)) errors.push(`duplicate scene id: ${scene.id}`);
    ids.add(scene.id);
    if (!scene.background) errors.push(`scene ${scene.id}: background is required`);
    if (!Array.isArray(scene.steps)) errors.push(`scene ${scene.id}: steps must be array`);
    checkConditionBlock(errors, `scene ${scene.id}.requires`, scene.requires);
    checkConditionBlock(errors, `scene ${scene.id}.assumes`, scene.assumes);
  }

  const checkNext = (from, next) => {
    if (next && !ids.has(next)) errors.push(`${from}: next scene not found: ${next}`);
  };

  const allowedTypes = new Set(["text", "voice", "document", "title", "choice", "jump", "endingCheck", "ending", "pageBreak", "conditionalText"]);
  const endings = new Set();

  for (const scene of scenario.scenes) {
    for (const [index, step] of (scene.steps || []).entries()) {
      const label = `${scene.id}[${index}]`;
      if (!allowedTypes.has(step.type)) errors.push(`${label}: unknown step type: ${step.type}`);

      if (["text", "voice", "document", "title"].includes(step.type)) {
        const hasText = typeof step.text === "string";
        const hasPages = Array.isArray(step.pages) && step.pages.every((page) => typeof page === "string");
        if (!hasText && !hasPages) errors.push(`${label}: ${step.type} requires text or pages`);
        if (hasText && hasPages) errors.push(`${label}: use either text or pages, not both`);
        if (step.type === "voice" && hasText && !(step.text.startsWith("「") && step.text.endsWith("」"))) {
          errors.push(`${label}: voice must use 「」`);
        }
        if (step.type === "document" && hasText && !(step.text.startsWith("『") && step.text.endsWith("』"))) {
          errors.push(`${label}: document must use 『』`);
        }
      }

      if (step.type === "conditionalText") {
        if (!Array.isArray(step.cases) || step.cases.length === 0) {
          errors.push(`${label}: conditionalText must have cases`);
        }
        for (const [caseIndex, item] of (step.cases || []).entries()) {
          const caseLabel = `${label}.cases[${caseIndex}]`;
          checkConditionBlock(errors, `${caseLabel}.if`, item.if || item.when || item.condition);
          if (typeof item.text !== "string" && !Array.isArray(item.pages)) {
            errors.push(`${caseLabel}: case must have text or pages`);
          }
        }
      }

      if (step.type === "jump") checkNext(label, step.next);

      if (step.type === "choice") {
        if (!Array.isArray(step.choices) || step.choices.length === 0) {
          errors.push(`${label}: choice must have choices`);
        }
        if ("timeLimitMs" in step && (!(Number(step.timeLimitMs) > 0))) {
          errors.push(`${label}: timeLimitMs must be positive number`);
        }
        if (step.timeoutNext) checkNext(`${label}.timeoutNext`, step.timeoutNext);
        if (step.timeoutChoiceLabel && !(step.choices || []).some((choice) => choice.label === step.timeoutChoiceLabel)) {
          errors.push(`${label}: timeoutChoiceLabel does not match any choice label`);
        }
        if (step.timeLimitMs && !step.timeoutNext && !step.timeoutChoiceLabel) {
          errors.push(`${label}: timed choice requires timeoutNext or timeoutChoiceLabel`);
        }
        for (const [choiceIndex, choice] of (step.choices || []).entries()) {
          const choiceLabel = `${label}.choices[${choiceIndex}]`;
          checkNext(choiceLabel, choice.next);
          if (!choice.label) errors.push(`${choiceLabel}: choice label is required`);
          if ("score" in choice && typeof choice.score !== "number") {
            errors.push(`${choiceLabel}: score must be number`);
          }
          if ("set" in choice && (typeof choice.set !== "object" || Array.isArray(choice.set) || choice.set === null)) {
            errors.push(`${choiceLabel}: set must be object`);
          }
        }
      }

      if (step.type === "endingCheck") {
        if ("rules" in step && !Array.isArray(step.rules)) {
          errors.push(`${label}: rules must be array`);
        }
        for (const [ruleIndex, rule] of (step.rules || []).entries()) {
          const ruleLabel = `${label}.rules[${ruleIndex}]`;
          if (!rule.next) errors.push(`${ruleLabel}: next is required`);
          checkNext(ruleLabel, rule.next);
          if (!rule.default) {
            checkConditionBlock(errors, `${ruleLabel}.if`, rule.if || rule.when || rule.condition);
          }
        }
        if (step.fallback) checkNext(`${label}.fallback`, step.fallback);
      }

      if (step.type === "ending") {
        if (!step.ending) errors.push(`${label}: ending id is required`);
        if (!step.title) errors.push(`${label}: ending title is required`);
        if (!step.subtitle) errors.push(`${label}: ending subtitle is required`);
        if (step.ending) endings.add(step.ending);
      }
    }
  }

  checkNext("startScene", scenario.startScene);
  for (const requiredEnding of ["bad", "normal", "true"]) {
    if (!endings.has(requiredEnding)) errors.push(`ending not found: ${requiredEnding}`);
  }

  return { ok: errors.length === 0, errors };
}

function checkConditionBlock(errors, label, condition) {
  if (condition === undefined || condition === null) return;
  if (typeof condition !== "object" || Array.isArray(condition)) {
    errors.push(`${label}: condition must be object`);
    return;
  }
  if (condition.all) {
    if (!Array.isArray(condition.all)) errors.push(`${label}.all: must be array`);
    for (const [index, child] of (condition.all || []).entries()) checkConditionBlock(errors, `${label}.all[${index}]`, child);
    return;
  }
  if (condition.any) {
    if (!Array.isArray(condition.any)) errors.push(`${label}.any: must be array`);
    for (const [index, child] of (condition.any || []).entries()) checkConditionBlock(errors, `${label}.any[${index}]`, child);
    return;
  }
  if (condition.not) {
    checkConditionBlock(errors, `${label}.not`, condition.not);
    return;
  }

  const key = condition.flag || condition.key || condition.state;
  if (!key) errors.push(`${label}: condition must have flag/key/state or all/any/not`);

  const operators = ["equals", "notEquals", "exists", "in", "notIn", "gte", "gt", "lte", "lt", "truthy"];
  if (!operators.some((operator) => operator in condition)) {
    errors.push(`${label}: condition must have an operator`);
  }
  if ("in" in condition && !Array.isArray(condition.in)) errors.push(`${label}.in: must be array`);
  if ("notIn" in condition && !Array.isArray(condition.notIn)) errors.push(`${label}.notIn: must be array`);
}
