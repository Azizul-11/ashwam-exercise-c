export class FoodParser {
  constructor() {
    this.foodLexicon = [
      "egg", "toast", "dal", "chawal", "dahi", "banana", "almond",
      "paneer", "salad", "coffee", "oats", "milk", "sushi", "pizza",
      "rajma", "idli", "sambar", "chai", "chips", "khichdi",
      "poha", "chicken", "wrap", "paratha", "curd", "yogurt",
      "berries", "biryani", "dosa", "chutney", "avocado",
      "pasta", "rice", "fish", "cookie", "tea", "shake"
    ];

    this.mealKeywords = {
      breakfast: ["breakfast", "morning"],
      lunch: ["lunch", "afternoon"],
      dinner: ["dinner", "night"],
      snack: ["snack"]
    };
  }

  parse(text) {
    const lowerText = text.toLowerCase();
    const foods = [];

    if (lowerText.includes("skipped")) {
      return foods;
    }

    for (const food of this.foodLexicon) {
      const regex = new RegExp(`\\b${food}s?\\b`, "i");

      if (regex.test(lowerText)) {
        foods.push({
          name: food,
          quantity: this.extractQuantity(lowerText, food),
          unit: null,
          meal: this.detectMeal(lowerText),
          confidence: 0.7
        });
      }
    }

    return foods;
  }

  extractQuantity(text, food) {
    const regex = new RegExp(`(\\d+)\\s+${food}s?`, "i");
    const match = text.match(regex);
    return match ? Number(match[1]) : null;
  }

  detectMeal(text) {
    for (const [meal, keywords] of Object.entries(this.mealKeywords)) {
      for (const word of keywords) {
        if (text.includes(word)) {
          return meal;
        }
      }
    }
    return "unknown";
  }
}
