export class SymptomParser {
  constructor() {
    this.symptomLexicon = [
      "cramp",
      "bloating",
      "headache",
      "migraine",
      "pain",
      "back pain",
      "stomach pain",
      "gas",
      "dizzy",
      "dizziness",
      "fatigue",
      "nausea",
      "fever",
      "sore throat",
      "sleepy",
      "tired"
    ];

    this.timeHints = {
      morning: ["morning", "subah"],
      afternoon: ["afternoon", "noon"],
      evening: ["evening", "shaam"],
      night: ["night", "raat"],
      after_meal: ["after lunch", "after dinner", "after eating"]
    };
  }

  parse(text) {
    const lowerText = text.toLowerCase();
    const symptoms = [];

    for (const symptom of this.symptomLexicon) {
      if (lowerText.includes(symptom)) {
        const negated = this.isNegated(lowerText, symptom);
        const severity = this.extractSeverity(lowerText);
        const timeHint = this.detectTimeHint(lowerText);

        symptoms.push({
          name: symptom,
          severity,
          time_hint: timeHint,
          negated,
          confidence: negated ? 0.9 : 0.8
        });
      }
    }

    return symptoms;
  }

  isNegated(text, symptom) {
    const negationRegex = new RegExp(`no\\s+${symptom}`);
    return negationRegex.test(text);
  }

  extractSeverity(text) {
    const match = text.match(/(\d+)\s*\/\s*10/);
    return match ? Number(match[1]) : null;
  }

  detectTimeHint(text) {
    for (const [key, values] of Object.entries(this.timeHints)) {
      for (const v of values) {
        if (text.includes(v)) {
          return key;
        }
      }
    }
    return null;
  }
}
