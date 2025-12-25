import fs from "fs";
import readline from "readline";
import { Command } from "commander";
import { LightParsePipeline } from "./pipeline/LightParsePipeline.js";

const program = new Command();

program
  .requiredOption("--in <inputFile>", "Input JSONL file path")
  .requiredOption("--out <outputFile>", "Output JSONL file path");

program.parse(process.argv);

const options = program.opts();

async function run() {
  const inputPath = options.in;
  const outputPath = options.out;

  const pipeline = new LightParsePipeline();

  const inputStream = fs.createReadStream(inputPath, { encoding: "utf-8" });
  const outputStream = fs.createWriteStream(outputPath, { encoding: "utf-8" });

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (!line.trim()) continue;

    let entry;
    try {
      entry = JSON.parse(line);
    } catch (err) {
      continue;
    }

    const result = pipeline.run(entry);
    outputStream.write(JSON.stringify(result) + "\n");
    const foodPreview =
  result.foods.length > 0
    ? result.foods.map(f => `${f.name}${f.quantity ? `(${f.quantity})` : ""}`).join(", ")
    : "none";

const symptomPreview =
  result.symptoms.length > 0
    ? result.symptoms.map(s => `${s.name}${s.negated ? " (negated)" : ""}`).join(", ")
    : "none";

console.log(`\n[${result.entry_id}]`);
console.log(`  Foods: ${foodPreview}`);
console.log(`  Symptoms: ${symptomPreview}`);

  }

  outputStream.end();
}

run().catch((err) => {
  console.error("Error running parser:", err);
  process.exit(1);
});
