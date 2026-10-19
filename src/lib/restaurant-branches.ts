type RestaurantProject = { slug: string; title: string };

export type RestaurantBranch = {
  name: string;
  count: number;
  unit: "şube" | "mekân";
};

export function restaurantBrand(project: RestaurantProject) {
  if (project.slug.startsWith("caffe-di-toee-")) return "Caffè Di Toeè";
  if (project.slug.startsWith("let-s-make-coffee")) return "Let's Make Coffee";
  return project.title.split(", ")[0];
}

/** Yalnız Etites'in proje kayıtlarındaki lokasyonları sayar. Markanın toplam şube sayısı değildir. */
export function restaurantBranches(projects: readonly RestaurantProject[], arabicaCount = 0): RestaurantBranch[] {
  const brands = new Map<string, RestaurantBranch>();
  if (arabicaCount > 0) brands.set("Arabica Coffee House", { name: "Arabica Coffee House", count: arabicaCount, unit: "şube" });

  for (const project of projects) {
    const name = restaurantBrand(project);
    const existing = brands.get(name);
    if (existing) existing.count += 1;
    else brands.set(name, { name, count: 1, unit: name === "Kuzu Effect" ? "mekân" : "şube" });
  }

  return [...brands.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "tr"));
}
