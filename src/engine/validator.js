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
    if (!Array.isArray(scene.steps)) errors.push(`scene ${scene.id}: steps must be array`);
  }

  const checkNext = (from, next) => {
    if (next && !ids.has(next)) errors.push(`${from}: next scene not found: ${next}`);
  };

  for (const scene of scenario.scenes) {
    for (const step of scene.steps || []) {
      if (step.type === "jump") checkNext(scene.id, step.next);
      if (step.type === "choice") {
        if (!Array.isArray(step.choices) || step.choices.length === 0) {
          errors.push(`${scene.id}: choice must have choices`);
        }
        for (const choice of step.choices || []) {
          checkNext(scene.id, choice.next);
          if (!choice.label) errors.push(`${scene.id}: choice label is required`);
        }
      }
    }
  }

  checkNext("startScene", scenario.startScene);
  return { ok: errors.length === 0, errors };
}
