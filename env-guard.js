const fs = require("fs");

const badPath = "/data/.env";

if (fs.existsSync(badPath)) {
  const raw = fs.readFileSync(badPath, "utf8");

  const cleaned = raw
    .split("\n")
    .filter(line => !line.startsWith("PATH="))
    .join("\n");

  fs.writeFileSync(badPath, cleaned);
}

process.env.PATH = "/usr/local/bin:/usr/bin:/bin";
