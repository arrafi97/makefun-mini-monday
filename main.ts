// make.fun Mini entry: "Monday, Reviewed in One Line"
// A tiny Node 22 program (standard library only, no network). It writes a
// single line, under 200 characters, reviewing Monday to
// <output>/entry.txt and reports its length.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review: Monday treated like a bad guest — uninvited, all day,
// no snacks, and it left the inbox worse than it found it. One star,
// would not attend again: the review format does the joke.
const LINE =
  "Monday, reviewed: showed up uninvited, stayed all day, brought no snacks, and left me with 47 unread emails. One star — would not attend again.";

// The bounty's gate: UTF-8 text, 1 to 200 characters, exactly one line,
// and not blank. Count code points, not UTF-16 units, so the em dash
// counts as one character.
function checkLine(text: string): number {
  const n = [...text].length;
  if (text.trim() === "" || n < 1 || n > 200 || text.includes("\n")) {
    throw new Error(`line must be one line of 1-200 characters, got ${n}`);
  }
  return n;
}

const chars = checkLine(LINE);

// Write the line. The output directory comes from $MAKEFUN_OUTPUT_DIR
// when set, otherwise /output. The file holds exactly the line — no
// trailing newline — so two runs always produce byte-identical files.
// A trailing newline would change the byte count, so there is none.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");
console.log(`wrote entry.txt (${chars} chars)`);
