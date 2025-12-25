import { FoodParser } from "../parsers/FoodParser.js";
import { SymptomParser } from "../parsers/SymptomParser.js";

export class LightParsePipeline {
  constructor() {
    this.foodParser = new FoodParser();
    this.symptomParser = new SymptomParser();
  }

  run(entry) {
    const foods = this.foodParser.parse(entry.text);
    const symptoms = this.symptomParser.parse(entry.text);

    return {
      entry_id: entry.entry_id,
      foods,
      symptoms,
      parse_errors: [],
      parser_version: "v1",
    };
  }
}
