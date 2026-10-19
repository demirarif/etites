import type { ShownImg } from "./media";

export function imageLabel(img: ShownImg) {
  if (img.kind === "stock") return "Temsili görsel";
  if (img.kind === "public") return "Kurum görseli";
  if (img.kind === "brand") return "Marka görseli";
  return null;
}
