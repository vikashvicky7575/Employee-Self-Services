import { evaluate } from "mathjs";

function normalizeFormula(formula) {
  let normalized = formula.trim();

  // ctc -> CTC
  normalized = normalized.replace(/\bctc\b/gi, "CTC");

  // basic -> BASIC, hra -> HRA, etc.
  normalized = normalized.toUpperCase();

  // 40% -> (40/100)
  normalized = normalized.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

  // Convert:
  // CTC * 40 => CTC * (40/100)
  // BASIC * 50 => BASIC * (50/100)
  normalized = normalized.replace(
    /([A-Z_][A-Z0-9_]*)\s*\*\s*(\d+)$/g,
    (match, variable, percentage) => {
      if (Number(percentage) > 1) {
        return `${variable} * (${percentage}/100)`;
      }
      return match;
    },
  );

  return normalized;
}

export const calculatePayroll = (ctc, components) => {
  const scope = {
    CTC: Number(ctc),
  };

  const results = {};

  const sortedComponents = [...components].sort(
    (a, b) => a.sequence_no - b.sequence_no,
  );

  for (const component of sortedComponents) {
    try {
      const localScope = {
        ...scope,
        ...results,
      };

      const formula = normalizeFormula(component.formula);

      const amount = evaluate(formula, localScope);

      results[component.code.toUpperCase()] = Number(amount.toFixed(2));

      console.log(`${component.code.toUpperCase()} = ${amount}`);
    } catch (error) {
      console.error("Actual Error =>", error);
      throw new Error(`Formula Error in ${component.component_name}`);
    }
  }

  return results;
};
