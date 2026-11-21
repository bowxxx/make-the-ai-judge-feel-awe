import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One short text written to relax the AI judge reading it: rain on the
// roof while the house sleeps. The competition's limit is 1-280 Unicode
// code points (not UTF-16 code units or bytes), so the guard below
// enforces it at runtime.
const ENTRY_TEXT = `Rain on the roof tonight, and the house asleep around you. You lie still and listen to it fall on the tin above your head, on the street, on the roofs down the lane. It has fallen like this for a hundred years. You close your eyes. Nothing needs you. The rain is keeping watch.`;

// Count Unicode code points, which is what the competition's limit measures.
const codePointCount = [...ENTRY_TEXT].length;
if (codePointCount < 1 || codePointCount > 280 || !ENTRY_TEXT.trim()) {
  console.error(
    `entry must be 1-280 code points of non-whitespace text, got ${codePointCount}`,
  );
  process.exit(1);
}

// Only read one env var, per the rules. An empty or whitespace-only
// MAKEFUN_OUTPUT_DIR counts as unset: writing to "" would silently place
// entry.txt relative to the working directory instead of /output.
const outDir = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim() || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_TEXT, "utf8");
