// Blog içerikleri. Menüde yok. Ana sayfanın altından girilir.
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  // Yalnız doğrulanmış bir yayın tarihi varsa eklenir.
  date?: string;
  readMinutes: number;
  topic: string;
  body: { h?: string; p: string }[];
};

export const posts: Post[] = [
  {
    slug: "vrf-mi-merkezi-sistem-mi",
    title: "VRF mi, merkezi sistem mi? Ofis katları için seçim rehberi",
    excerpt:
      "Ofis katlarında sistem seçimini kapasite, kullanım saatleri, mevcut tesisat ve tadilat kapsamı belirler. VRF ve merkezi sistem için değerlendirme başlıkları.",
    readMinutes: 1,
    topic: "VRF Klima",
    body: [
      {
        p: "Bir ofis katında binanın merkezi ısıtma ve soğutma altyapısından yararlanmak veya kata özel bir VRF sistemi kurmak değerlendirilebilir. Seçim için katın kullanımını ve mevcut altyapıyı birlikte incelemek gerekir.",
      },
      {
        h: "Kullanım saatleri farklıysa",
        p: "Toplantı odaları, yönetici odaları ve açık ofis farklı saatlerde kullanılabilir. VRF'de mahallerin ayrı kontrolü değerlendirilebilir. Merkezi sistem için de bina işletmesinin çalışma saatleri ve mevcut kontrol düzeni incelenmelidir.",
      },
      {
        h: "Tadilat ve kiracı değişimi",
        p: "Bölme duvarlar değiştiğinde cihaz yerleşimi ve tesisat güzergâhı da yeniden değerlendirilir. VRF ve fan-coil seçenekleri için mevcut boruların, tavan boşluğunun ve servis erişiminin yeni plana uygunluğu kontrol edilmelidir.",
      },
      {
        h: "Taze hava ihtiyacı",
        p: "Isıtma ve soğutma seçimi, taze hava ihtiyacının ayrıca değerlendirilmesini gerektirir. Havalandırma sistemi, kullanıcı sayısı ve mahal özellikleri dikkate alınarak iklimlendirmeyle birlikte projelendirilmelidir.",
      },
      {
        h: "Karar için keşif",
        p: "Katın büyüklüğü, cephe yönü, mevcut altyapı ve kullanım düzeni keşifte değerlendirilir. Kurulum kapsamı, bakım ihtiyacı ve işletme koşulları bu bilgilerle karşılaştırılabilir.",
      },
    ],
  },
  {
    slug: "restoran-mutfak-egzozu",
    title: "Restoran mutfağında egzoz: davlumbazdan çatıya",
    excerpt:
      "Mutfak havalandırmasında davlumbaz, filtre, egzoz hattı ve taze hava beslemesi birlikte değerlendirilir.",
    readMinutes: 1,
    topic: "Havalandırma",
    body: [
      {
        p: "Restoran mutfağında oluşan ısı, nem, yağ buharı ve koku havalandırma tasarımında dikkate alınır. Pişirme ekipmanı, mutfağın yerleşimi ve egzoz güzergâhı birlikte incelenir.",
      },
      {
        h: "Davlumbaz ve filtreler",
        p: "Davlumbaz ve yağ tutucu filtreler, pişirme ekipmanının türüne ve yerleşimine göre seçilir. Temizlik ve bakım erişimi de tasarımda değerlendirilir.",
      },
      {
        h: "Egzoz kanalı ve fan",
        p: "Egzoz hattının güzergâhı, çıkış noktası ve temizlik erişimi belirlenir. Kanal ve fan seçimi, gereken debi ve hattın basınç kaybına göre yapılır.",
      },
      {
        h: "Taze hava beslemesi",
        p: "Taze hava beslemesi egzoz debisiyle birlikte hesaplanır. Mutfak ile komşu alanlar arasındaki hava akışı ve basınç dengesi bu hesapta dikkate alınır.",
      },
    ],
  },
  {
    slug: "yerden-isitma-dogru-uygulama",
    title: "Yerden ısıtmada doğru uygulama: villalar ve rezidanslar için",
    excerpt:
      "Yerden ısıtma uygulamasında ısı kaybı hesabı, boru yerleşimi ve kollektör dengelemesi birlikte ele alınır.",
    readMinutes: 1,
    topic: "Isıtma",
    body: [
      {
        p: "Yerden ısıtmanın projelendirilmesinde mahallin ısı ihtiyacı, döşeme yapısı ve zemin kaplaması değerlendirilir. Uygulama bu koşullara göre hazırlanan projeyi izlemelidir.",
      },
      {
        h: "Boru aralığı ve döşeme",
        p: "Boru aralığı ve devre yerleşimi, mahallin ısı kaybı ve zemin özelliklerine göre belirlenir. Uygulamada projedeki güzergâh ve devre uzunlukları esas alınır.",
      },
      {
        h: "Kollektör ve dengeleme",
        p: "Kollektörde her devrenin debisi proje değerlerine göre ayarlanır. Devrelerin dengelenmesi ve çalışma kontrolü, devreye alma işlemlerinin parçasıdır.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
}
