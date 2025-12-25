import {FoodParser} from "../src/parsers/FoodParser"

describe("FoodParser", () => {
  const parser = new FoodParser();

  test("extracts simple foods", () => {
    const result = parser.parse("2 eggs + toast for breakfast");
    expect(result.length).toBeGreaterThan(0);
  });

  test("detects skipped meals", () => {
    const result = parser.parse("Skipped dinner today");
    expect(result.length).toBe(0);
  });

  test("handles quantities", () => {
    const result = parser.parse("2 eggs");
    expect(result[0].quantity).toBe(2);
  });
});
