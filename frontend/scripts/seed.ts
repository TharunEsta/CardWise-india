import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { banks, cards, guides } from "../lib/data";

const output = {
  banks,
  cards,
  guides
};

writeFileSync(join(process.cwd(), "supabase", "seed-output.json"), JSON.stringify(output, null, 2));
console.log(`Seed snapshot written with ${banks.length} banks and ${cards.length} cards.`);
