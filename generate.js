const fg = require("fast-glob");
const path = require("node:path");
const fs = require("node:fs");

generate(
  fg.sync("luts/**/*.png", {
    cwd: path.join(__dirname, "src", "assets"),
  }),
  path.join(__dirname, "src", "assets", "luts.ts"),
);
generate(
  fg.sync("images/**/*.jpg", {
    cwd: path.join(__dirname, "src", "assets"),
  }),
  path.join(__dirname, "src", "assets", "images.ts"),
);

function generate(entries, file) {
  entries = entries.map((entry, index) => {
    return {
      variable: `asset${String(index + 1).padStart(3, "0")}`,
      path: `./${entry}`,
      name: path.parse(entry).name,
    };
  });

  const lines = [];
  lines.push(`// This file is generated, do not edit.`);
  lines.push(``);
  for (const entry of entries) {
    lines.push(`import ${entry.variable} from "${entry.path}";`);
  }
  lines.push(``);
  lines.push(`import { type ImageAsset } from "./types";`);
  lines.push(``);
  lines.push(`export const assets: readonly ImageAsset[] = [`);
  for (const entry of entries) {
    lines.push(`  { name: "${entry.name}", url: ${entry.variable} },`);
  }
  lines.push(`];`);
  lines.push(``);

  fs.writeFileSync(file, lines.join("\n"));
}
