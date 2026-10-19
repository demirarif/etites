import { readFileSync, writeFileSync } from "node:fs";

const data = JSON.parse(readFileSync(new URL("../public/maps/office-data.json", import.meta.url), "utf8"));
const office = data.elements.find((way) => way.tags?.name === "Astor Business Center");
if (!office?.bounds) throw new Error("Astor Business Center konumu bulunamadı");

const lat = (office.bounds.minlat + office.bounds.maxlat) / 2;
const lon = (office.bounds.minlon + office.bounds.maxlon) / 2;
const width = 1200;
const height = 780;
const scale = height / 0.0067;
const project = (point) => [width / 2 + (point.lon - lon) * Math.cos(lat * Math.PI / 180) * scale, height / 2 - (point.lat - lat) * scale];
const path = (way) => way.geometry.map((point, index) => `${index ? "L" : "M"}${project(point).map((n) => n.toFixed(1)).join(",")}`).join(" ");
const escape = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
const ways = data.elements.filter((way) => way.geometry?.length > 1);
const layers = [];

for (const way of ways.filter((way) => way.tags?.landuse || way.tags?.leisure === "park")) {
  const green = /forest|grass|meadow|recreation_ground/.test(way.tags.landuse ?? "") || way.tags.leisure === "park";
  layers.push(`<path d="${path(way)} Z" fill="${green ? "#dfe5e0" : "#e9ebeb"}"/>`);
}
for (const way of ways.filter((way) => way.tags?.building)) {
  const isOffice = way.id === office.id;
  layers.push(`<path d="${path(way)} Z" fill="${isOffice ? "#d4c2ac" : "#dde1e2"}" stroke="${isOffice ? "#a88b67" : "#cdd3d5"}" stroke-width="${isOffice ? 2 : 1}"/>`);
}

const roads = ways.filter((way) => way.tags?.highway && !/construction|proposed/.test(way.tags.highway));
const roadWidth = (road) => /primary|secondary|tertiary/.test(road.tags.highway) ? 25 : /footway|path|steps/.test(road.tags.highway) ? 4 : /service/.test(road.tags.highway) ? 8 : 15;
for (const road of roads) layers.push(`<path d="${path(road)}" fill="none" stroke="#cdd3d5" stroke-width="${roadWidth(road) + 3}" stroke-linecap="round" stroke-linejoin="round"/>`);
for (const road of roads) layers.push(`<path d="${path(road)}" fill="none" stroke="#fafbfb" stroke-width="${roadWidth(road)}" stroke-linecap="round" stroke-linejoin="round"/>`);

const named = new Map();
for (const road of roads.filter((road) => road.tags.name && roadWidth(road) > 8)) {
  const points = road.geometry.map(project);
  const length = points.slice(1).reduce((sum, point, i) => sum + Math.hypot(point[0] - points[i][0], point[1] - points[i][1]), 0);
  if (length < 180 || (named.get(road.tags.name)?.length ?? 0) > length) continue;
  named.set(road.tags.name, { road, length, points });
}
for (const [name, { road, points }] of named) {
  const point = points[Math.floor(points.length / 2)];
  if (point[0] < 80 || point[0] > width - 80 || point[1] < 50 || point[1] > height - 50) continue;
  if (Math.hypot(point[0] - width / 2, point[1] - height / 2) < 130) continue;
  const start = points[0];
  const end = points.at(-1);
  let angle = Math.atan2(end[1] - start[1], end[0] - start[0]) * 180 / Math.PI;
  if (angle > 90) angle -= 180;
  if (angle < -90) angle += 180;
  layers.push(`<text x="${point[0].toFixed(1)}" y="${point[1].toFixed(1)}" transform="rotate(${angle.toFixed(1)} ${point[0].toFixed(1)} ${point[1].toFixed(1)})" text-anchor="middle" font-family="Arial,sans-serif" font-size="${/1953|Havalandırmacılar/.test(road.tags.name) ? 24 : 20}" fill="#657078" stroke="#fafbfb" stroke-width="4" paint-order="stroke">${escape(name)}</text>`);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><title>Astor Business Center çevresi, Ankara</title><desc>OpenStreetMap verilerinden hazırlanan Etites ofis konum haritası. Harita verisi OpenStreetMap katkıda bulunanlar, ODbL 1.0.</desc><rect width="${width}" height="${height}" fill="#f0f2f2"/>${layers.join("")}</svg>`;
writeFileSync(new URL("../public/maps/office-map.svg", import.meta.url), svg);
console.log(`Harita hazır: ${ways.length} yol ve yapı, merkez ${lat.toFixed(6)}, ${lon.toFixed(6)}.`);
