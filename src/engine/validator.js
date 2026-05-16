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
  }

  const checkNext = (from, next) => {
    if (next && !ids.has(next)) errors.push(`${from}: next scene not found: ${next}`);
  };

  const allowedTypes = new Set(["text", "voice", "document", "title", "choice", "jump", "endingCheck", "ending", "pageBreak"]);
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

      if (step.type === "jump") checkNext(label, step.next);

      if (step.type === "choice") {
        if (!Array.isArray(step.choices) || step.choices.length === 0) {
          errors.push(`${label}: choice must have choices`);
        }
        for (const [choiceIndex, choice] of (step.choices || []).entries()) {
          const choiceLabel = `${label}.choices[${choiceIndex}]`;
          checkNext(choiceLabel, choice.next);
          if (!choice.label) errors.push(`${choiceLabel}: choice label is required`);
          if ("score" in choice && typeof choice.score !== "number") {
            errors.push(`${choiceLabel}: score must be number`);
          }
        }
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
