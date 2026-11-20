// news-image-20261120 — "THE WORLD", Friday 20 November 2026.
// A newspaper front page summing up the day's world news: Anthropic's
// record IPO, the Shenzhen peace declaration, Asia's market plunge,
// Britain's drone pledge for Ukraine, and the COP31 draft. This program
// copies the front-page image (entry.png, 1024x1024 PNG) to the output
// directory, byte for byte, and checks the copy matches the original.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const sourcePath = fileURLToPath(new URL("./entry.png", import.meta.url));
const targetPath = join(outDir, "entry.png");

function sha256(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(sourcePath, targetPath);
if (sha256(sourcePath) !== sha256(targetPath)) {
  throw new Error("output verification failed: entry.png copy does not match source");
}
