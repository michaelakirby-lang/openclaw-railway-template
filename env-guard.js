const fs = require("fs");

const badPathFile = "/data/.env";

// 1. Strip bad PATH from /data/.env (if it exists)
if (fs.existsSync(badPathFile)) {
  const raw = fs.readFileSync(badPathFile, "utf8");

  const cleaned = raw
    .split("\n")
    .filter(line => !line.startsWith("PATH="))
    .join("\n");

  fs.writeFileSync(badPathFile, cleaned);
}

// 2. Build a SAFE PATH for runtime
const systemPath = "/usr/local/bin:/usr/bin:/bin";
const nodeBinPath = "/app/node_modules/.bin";

// 3. Merge safely (avoid duplicates)
const currentPath = process.env.PATH || "";

const mergedPath = [
  nodeBinPath,
  systemPath,
  currentPath
]
  .filter(Boolean)
  .join(":");

// 4. Apply fixed PATH
process.env.PATH = mergedPath;

// 5. Optional debug (helpful for Railway logs)
console.log("[env-guard] PATH set to:", process.env.PATH);
