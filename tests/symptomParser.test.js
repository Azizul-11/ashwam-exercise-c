import { SymptomParser } from "../src/parsers/SymptomParser.js";

describe("SymptomParser", () => {
  const parser = new SymptomParser();

  test("detects basic symptom", () => {
    const result = parser.parse("Had headache in the morning");
    expect(result.length).toBeGreaterThan(0);
  });

  test("handles negation", () => {
    const result = parser.parse("No headache today");
    expect(result[0].negated).toBe(true);
  });

  test("extracts severity", () => {
    const result = parser.parse("Back pain 6/10 at night");
    expect(result[0].severity).toBe(6);
  });
});
