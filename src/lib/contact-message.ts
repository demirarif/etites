export const CONTACT_TYPES = [
  { key: "teklif", label: "Teklif", hint: "Projeniz için fiyat ve sistem önerisi" },
  { key: "kesif", label: "Keşif", hint: "Uygulama alanını yerinde inceleyelim" },
  { key: "bakim", label: "Bakım", hint: "Periyodik bakım veya bakım sözleşmesi" },
  { key: "ariza", label: "Arıza", hint: "Çalışmayan bir sistem için servis" },
] as const;

export type ContactType = (typeof CONTACT_TYPES)[number]["key"];

export function contactMessage(type: ContactType, data: FormData): { message: string } | { error: string } {
  const value = (name: string) => String(data.get(name) ?? "").trim();
  const name = value("ad");
  const phone = value("telefon");
  const body = value("mesaj");
  if (!name || !phone || !body) return { error: "Ad soyad, telefon ve mesaj alanlarını doldurun." };

  const digits = phone.replace(/\D/g, "");
  if (!/^[+\d\s().-]+$/.test(phone) || digits.length < 10 || digits.length > 15) {
    return { error: "Telefon numaranızı alan koduyla birlikte kontrol edin." };
  }

  const label = CONTACT_TYPES.find((item) => item.key === type)!.label;
  const details = [
    `Ad soyad: ${name}`,
    value("firma") && `Firma / kurum: ${value("firma")}`,
    `Telefon: ${phone}`,
    value("eposta") && `E-posta: ${value("eposta")}`,
  ];

  if (type === "teklif" || type === "kesif") {
    details.push(value("il") && `Proje yeri: ${value("il")}`);
    details.push(value("alan") && `Yaklaşık alan: ${value("alan")} m²`);
  }

  return { message: [`${label} talebi`, "", ...details.filter(Boolean), "", body].join("\n") };
}
