import { LightParsePipeline } from "../src/pipeline/LightParsePipeline.js";

describe("LightParsePipeline", () => {
  test("includes foods and symptoms", () => {
    const pipeline = new LightParsePipeline();

    const entry = {
      entry_id: "e_test",
      text: "2 eggs for breakfast. Headache 6/10 at night.",
    };

    const result = pipeline.run(entry);

    expect(result.foods.length).toBeGreaterThan(0);
    expect(result.symptoms.length).toBeGreaterThan(0);
    expect(result.entry_id).toBe("e_test");
  });
});
