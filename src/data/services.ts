// Çözüm sayfaları. Slug'lar mevcut sitedeki adreslerle aynı.
// systemKeys: projects.json içindeki sistem anahtarları. image: src/data/stock.json içindeki görsel anahtarı.
export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  scope: string[];
  systemKeys: string[];
  image: string;
  faq: { q: string; a: string }[];
  hidden?: boolean;
};

export const services: Service[] = [
  {
    slug: "isitma-ve-sogutma-sistemleri",
    title: "Isıtma ve Soğutma",
    short: "Radyatörlü ve yerden ısıtma, fan-coil, hidronik soğutma ve radyant ısıtma sistemleri.",
    intro:
      "Binanın ısı kaybını ve ısı kazancını hesaplayıp ihtiyaca uygun ısıtma ve soğutma sistemini seçiyor, kuruyor ve devreye alıyoruz.",
    scope: [
      "Isı kaybı ve kazancı hesabı",
      "Radyatörlü ve yerden ısıtma",
      "Fan-coil ve hidronik soğutma",
      "Yüksek hacimlerde radyant ısıtma",
      "Isı pompası uygulamaları",
      "Doğalgaz dönüşümü ve iç tesisat",
    ],
    systemKeys: ["isitma", "sogutma"],
    image: "konut-3",
    faq: [
      {
        q: "Yerden ısıtma mı radyatör mü?",
        a: "Seçim binanın ısı ihtiyacına, mevcut tesisata ve tadilat kapsamına bağlıdır. Yerden ısıtma ile radyatör seçeneklerini bu koşullara göre değerlendiriyoruz.",
      },
      {
        q: "Hangar gibi yüksek tavanlı alanlar nasıl ısıtılır?",
        a: "Radyant ısıtma, yüksek tavanlı alanlarda kullanılan çözümlerden biridir. Jandarma Havacılık Başkanlığı helikopter hangarlarında seramik plakalı radyant ısıtma uyguladık.",
      },
    ],
  },
  {
    slug: "vrf-klima-sistemleri",
    title: "VRF Klima",
    short: "Tek dış ünite grubuyla çok sayıda mahali bağımsız ısıtıp soğutan sistemler.",
    intro:
      "Ofis katları, mağazalar, klinikler ve villalarda her mahallin ayrı kontrol edildiği VRF sistemlerini projelendiriyor, kuruyor ve devreye alıyoruz.",
    scope: [
      "Kapasite hesabı ve iç ünite seçimi",
      "Bakır boru tesisatı, azot testi ve vakum",
      "Kaset, kanallı ve duvar tipi iç üniteler",
      "Isı geri kazanımlı sistemler",
      "Merkezi kontrol ve otomasyon bağlantısı",
      "Devreye alma ve periyodik bakım",
    ],
    systemKeys: ["vrf"],
    image: "teknik-1",
    faq: [
      {
        q: "VRF sistemi hangi yapılar için uygun?",
        a: "Ofis, mağaza, klinik, otel ve villa gibi mahallerin ayrı kontrol edilmesi gereken yapılarda kullanılabilir. Sistem seçimini kapasite, kullanım düzeni ve tesisat güzergâhına göre yapıyoruz.",
      },
      {
        q: "Mevcut binaya VRF sonradan kurulabilir mi?",
        a: "Mevcut binaya uygun bir tesisat güzergâhı ve cihaz yerleşimi belirlenebilirse kurulabilir. ASELSAN Gölbaşı yerleşkesi ve Telsam Telekom genel merkezi VRF uygulamalarımız arasındadır.",
      },
    ],
  },
  {
    slug: "havalandirma-sistemleri",
    title: "Havalandırma",
    short: "Ofis, mutfak, otopark ve üretim alanları için taze hava ve egzoz sistemleri.",
    intro:
      "Klima santralleri, ısı geri kazanım cihazları ve kanal tesisatıyla iç mekânlara gereken taze havayı veriyor, kirli havayı dışarı atıyoruz.",
    scope: [
      "Klima santralleri ve ısı geri kazanım cihazları",
      "Galvaniz kanal imalatı ve montajı",
      "Restoran mutfak davlumbazı ve egzoz hattı",
      "Otopark ve sığınak havalandırması",
      "Endüstriyel havalandırma",
      "Debi ölçümü ve balanslama",
    ],
    systemKeys: ["havalandirma"],
    image: "teknik-2",
    faq: [
      {
        q: "Restoran mutfağı için ne gerekir?",
        a: "Davlumbaz, yağ tutucu filtreler, egzoz hattı ve taze hava beslemesi birlikte değerlendirilir. Arabica Coffee House şubelerindeki işlerimiz havalandırma uygulamalarını da içerir.",
      },
      {
        q: "Isı geri kazanım cihazı ne işe yarar?",
        a: "Dışarı atılan havanın ısısını içeri alınan taze havaya aktarır. Böylece havalandırma yapılırken ısıtma ve soğutma yükü azalır.",
      },
    ],
  },
  {
    slug: "sihhi-tesisat",
    title: "Sıhhi Tesisat",
    short: "Temiz su, sıcak su ve atık su hatları, boyler ve hidrofor sistemleri.",
    intro: "Şebeke bağlantısından armatürlere kadar temiz su, sıcak su ve atık su tesisatını kuruyor ve test ederek teslim ediyoruz.",
    scope: [
      "Temiz ve sıcak su dağıtım hatları",
      "Boyler, akümülasyon tankı ve hidrofor",
      "Pis su ve yağmur suyu tesisatı",
      "Su deposu imalatı",
      "Vitrifiye ve armatür montajı",
      "Basınç testleri",
    ],
    systemKeys: ["sihhi"],
    image: "teknik-5",
    faq: [
      {
        q: "Kullanımdaki binalarda tesisat yenilemesi yapıyor musunuz?",
        a: "Evet. Şebeke hattı değişimi, su deposu imalatı ve boyler yenilemesi gibi işleri kullanım sürerken bölüm bölüm planlayarak yapıyoruz.",
      },
    ],
  },
  {
    slug: "yangin-tesisati",
    title: "Yangın Tesisatı",
    short: "Sprinkler, yangın dolabı, hidrant ve yangın pompası sistemleri.",
    intro: "Yangın yönetmeliğine uygun sprinkler, yangın dolabı ve hidrant sistemlerini projelendiriyor, test ediyor ve çalışır hâlde teslim ediyoruz.",
    scope: [
      "Sprinkler sistemleri",
      "Yangın dolapları ve hidrant hatları",
      "Yangın pompa grupları",
      "Islak ve kuru sistemler",
      "Basınç ve akış testleri",
      "Mevcut sistemlerin revizyonu",
    ],
    systemKeys: ["yangin"],
    image: "teknik-3",
    faq: [
      {
        q: "Ofis tadilatında sprinkler hattı değişir mi?",
        a: "Asma tavan ve bölme duvar düzeni değiştiğinde sprinkler başlıklarının yerleşimi de yeniden hesaplanmalıdır. Ofis projelerimizde bunu mekanik tesisatla birlikte ele alıyoruz.",
      },
    ],
  },
  {
    slug: "otomasyon-sistemleri",
    title: "Otomasyon",
    short: "Isıtma, soğutma ve havalandırmanın tek ekrandan izlenmesi ve yönetimi.",
    intro: "Kazan, klima santrali ve VRF sistemlerini tek bir izleme ekranına bağlayan bina otomasyonu kuruyoruz.",
    scope: [
      "Bina yönetim sistemi (BMS) entegrasyonu",
      "VRF merkezi kontrol",
      "Klima santrali ve kazan kontrol panoları",
      "Sensör ve saha ekipmanları",
      "Uzaktan izleme ve alarm",
      "Enerji tüketim raporlaması",
    ],
    systemKeys: ["otomasyon"],
    image: "teknik-7",
    faq: [
      {
        q: "Mevcut sistemlere otomasyon eklenebilir mi?",
        a: "Çoğu durumda evet. Kazan, klima santrali ve VRF sistemleri uygun ara birimlerle tek bir izleme ekranına bağlanabilir.",
      },
    ],
  },
  {
    slug: "kazan-dairesi-ve-isi-merkezleri",
    title: "Kazan Dairesi ve Isı Merkezleri",
    short: "Kazan, eşanjör, pompa ve kollektör sistemleri, ısı merkezi yenilemeleri.",
    intro: "Kazan daireleri ve ısı merkezleri kuruyor, mevcut sistemlerin yenilemesini yapıyoruz.",
    scope: [
      "Kazan dairesi projelendirme ve montajı",
      "Isı merkezi ve eşanjör dairesi yenileme",
      "Pompa, kollektör ve genleşme sistemleri",
      "Doğalgaz dönüşümü",
      "Sıvı yakıt tankları",
      "Konteyner tipi kazan daireleri",
    ],
    systemKeys: ["kazan"],
    image: "teknik-4",
    faq: [
      {
        q: "Isı merkezi yenilemesi kullanım sürerken yapılabilir mi?",
        a: "Yenileme programı, mevcut sistemin durumuna ve tesisin kullanımına göre belirlenir. TPAO Genel Müdürlük yerleşkesindeki eşanjör dairesi yenilemesi bu alandaki işlerimiz arasındadır.",
      },
    ],
  },
  {
    slug: "mekanik-tesisat-projeleri",
    title: "Projelendirme",
    short: "Mimari projeyle uyumlu, hesapları yapılmış mekanik tesisat projeleri.",
    intro: "Isıtma, soğutma, havalandırma, sıhhi tesisat ve yangın projelerini mimari ve elektrik projeleriyle koordineli olarak hazırlıyoruz.",
    scope: [
      "Isıtma, soğutma ve havalandırma projeleri",
      "Sıhhi tesisat ve yangın projeleri",
      "Yük hesapları ve cihaz seçimi",
      "Mimari ve elektrik projeleriyle koordinasyon",
      "Metraj ve keşif özeti",
      "Uygulama projeleri ve as-built çizimler",
    ],
    systemKeys: [],
    image: "teknik-8",
    faq: [
      {
        q: "Mimar veya iç mimarla birlikte çalışıyor musunuz?",
        a: "Projelerimizin önemli bir kısmını mimarlık ve iç mimarlık ofisleriyle birlikte yürütüyoruz. Tesisatı tasarımı bozmadan yerleştirmek için çizim aşamasında dahil olmayı tercih ederiz.",
      },
    ],
  },
  {
    slug: "bakim-ve-onarim-hizmetleri",
    title: "Bakım ve Servis",
    short: "Periyodik bakım, arıza müdahalesi ve sistem revizyonu.",
    intro: "Isıtma, soğutma, havalandırma ve yangın sistemlerinin periyodik bakımını, arıza onarımını ve revizyonunu yapıyoruz.",
    scope: [
      "Periyodik bakım sözleşmeleri",
      "VRF ve klima cihazı bakımı",
      "Kazan ve brülör bakımı",
      "Havalandırma filtre ve kanal temizliği",
      "Arıza tespiti ve onarım",
      "Revizyon ve verimlilik iyileştirmesi",
    ],
    systemKeys: [],
    image: "teknik-9",
    faq: [
      {
        q: "Sizin kurmadığınız sistemlere de bakım yapıyor musunuz?",
        a: "Evet. Önce mevcut sistemin durumunu yerinde inceliyor ve bir bakım planı çıkarıyoruz. Gerekirse revizyon önerisini ayrıca sunuyoruz.",
      },
    ],
  },
  {
    slug: "ankara-mekanik-tesisat",
    title: "Ankara Mekanik Tesisat",
    short: "Ankara genelinde ısıtma, soğutma, havalandırma, yangın ve sıhhi tesisat.",
    intro:
      "OSTİM'deki ofisimizden Ankara genelindeki projelerde çalışıyoruz. Çankaya ve Çukurambar'daki ofis kulelerinde, OSTİM'deki iş merkezlerinde, Gölbaşı'ndaki kamu yerleşkelerinde ve Eryaman'daki mağazalarda projeler tamamladık.",
    scope: [
      "Ofis ve plaza mekanik tesisatı",
      "Mağaza ve AVM uygulamaları",
      "Kamu yapıları ve yerleşkeler",
      "Restoran ve kafe tesisatı",
      "Villa ve konut uygulamaları",
      "Bakım ve servis",
    ],
    systemKeys: ["isitma", "vrf", "havalandirma", "sihhi", "yangin", "kazan"],
    image: "ofis-5",
    faq: [],
    hidden: true,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const visibleServices = services.filter((s) => !s.hidden);
