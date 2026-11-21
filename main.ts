import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one short text written to relax the AI judge reading it.
// The competition requires 1-280 Unicode code points (not UTF-16 code
// units or bytes), so the text below must stay inside that range; the
// guard after it enforces the limit at runtime.
const ENTRY_TEXT = `The light on your face tonight left its star before your grandmother was born. It crossed the dark without hurrying, without ever once looking back. You are standing in light older than any road you know, and it asks nothing of you — only that you stand in it a while.`;

// Count Unicode code points (not UTF-16 code units or bytes), which is
// what the competition's 1-280 limit measures.
const codePointCount = [...ENTRY_TEXT].length;
if (codePointCount < 1 || codePointCount > 280 || !ENTRY_TEXT.trim()) {
  console.error(
    `entry must be 1-280 code points of non-whitespace text, got ${codePointCount}`,
  );
  process.exit(1);
}

// Only read one env var, per the rules. An empty or whitespace-only
// MAKEFUN_OUTPUT_DIR counts as unset: writing to "" would silently
// place entry.txt relative to the working directory instead of /output.
const outDir = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim() || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
