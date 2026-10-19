// Sayfa geçişlerinde önceden yüklenen parça dosyaları (örneğin __next.projeler.$d$slug.__PAGE__.txt)
// Windows'ta Next 16.3.8 statik çıktısında iç içe klasörlere yazılıyor, tarayıcı ise tek parça adla istiyor.
// Bu betik o klasörleri tek dosyalara açar. Linux ve macOS'ta dosyalar zaten düz yazıldığı için bir şey yapmaz.
import { readdirSync, renameSync, rmSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
let moved = 0;

function filesIn(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? filesIn(join(dir, entry.name)) : [join(dir, entry.name)],
  );
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const path = join(dir, entry.name);
    if (!entry.name.startsWith("__next.")) {
      walk(path);
      continue;
    }
    for (const file of filesIn(path)) {
      renameSync(file, join(dir, `${entry.name}.${relative(path, file).split(sep).join(".")}`));
      moved++;
    }
    rmSync(path, { recursive: true });
  }
}

walk(OUT);
console.log(moved ? `${moved} geçiş dosyası düz adlara taşındı` : "Geçiş dosyaları zaten düz");
