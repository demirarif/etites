import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/Blocks";
import { ArrowRight } from "@/components/Icons";
import { site } from "@/data/site";
import { arabica, getProject, stats } from "@/lib/projects";
import { pageMetadata } from "@/lib/metadata";
import styles from "./about.module.css";

export const metadata: Metadata = pageMetadata({
  title: "Hakkımızda",
  path: "/hakkimizda",
  description: "Ankara OSTİM'de mekanik tesisat ve iklimlendirme firması. Isıtma, soğutma, havalandırma, yangın ve sıhhi tesisat.",
});

export default function AboutPage() {
  const application = getProject("turk-oftalmoloji-dernegi-havalandirma-ve-acik-tavan-uygulamasi");
  const photo = application?.images[0];

  return (
    <>
      <section className={styles.intro} aria-labelledby="about-title">
        <div className="wrap">
          <div className={styles.introGrid}>
            <div className={styles.introText}>
              <h1 id="about-title" className="h1">Hakkımızda</h1>
              <p className="lead">
                {site.name}, Ankara OSTİM&apos;de faaliyet gösteren bir mekanik tesisat ve iklimlendirme firmasıdır.
              </p>
              <p>
                Isıtma, soğutma, havalandırma, VRF klima, sıhhi tesisat, yangın tesisatı ve bina otomasyonu sistemlerinde
                projelendirme, uygulama ve bakım hizmeti veriyoruz.
              </p>
            </div>
            {application && photo && (
              <figure className={styles.application}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  srcSet={`${photo.thumb} 760w, ${photo.src} ${photo.w}w`}
                  sizes="(max-width: 900px) 100vw, 45vw"
                  width={photo.w}
                  height={photo.h}
                  alt="Türk Oftalmoloji Derneği uygulamasında açık tavandaki havalandırma kanalları"
                  fetchPriority="high"
                />
                <figcaption>
                  <div>
                    <span>Türk Oftalmoloji Derneği</span>
                    <span>Havalandırma ve açık tavan uygulaması</span>
                  </div>
                  <Link href={`/projeler/${application.slug}`} aria-label="Türk Oftalmoloji Derneği projesini inceleyin">
                    <ArrowRight />
                  </Link>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      <div className={`wrap ${styles.details}`}>
        <section className={styles.detail} aria-labelledby="about-history">
          <h2 id="about-history" className="h2">Proje geçmişimiz</h2>
          <div className={styles.detailText}>
            <p>
              {stats.since} yılında Et ve Süt Kurumu&apos;nun Bingöl Et Kombinası için soğutma sistemi uygulaması gerçekleştirdik.
              Bugüne kadar {stats.cities} ilde ve {stats.countries} ülkede, 260&apos;tan fazla projede çalıştık.
            </p>
            <p>
              Kamu kurumları ve savunma sanayii yerleşkelerinden ofislere, mağazalara, fabrikalara ve konutlara kadar farklı
              yapılarda çalışıyoruz. Arabica Coffee House&apos;un {arabica.branchCount} şubesinde mekanik tesisat uygulaması yaptık.
            </p>
            <Link href="/projeler" className="textlink">Projeleri inceleyin <ArrowRight /></Link>
          </div>
        </section>

        <section className={styles.detail} aria-labelledby="about-process">
          <h2 id="about-process" className="h2">Çalışma biçimimiz</h2>
          <div className={styles.detailText}>
            <p>
              Çalışmayı yerinde keşif ve projelendirmeyle başlatıyor, montaj ve devreye almayla tamamlıyoruz. Mimarlık ve iç
              mimarlık ofisleriyle birlikte yürüttüğümüz projelerde tesisatı, tavan, duvar ve cephe kararlarıyla birlikte ele alıyoruz.
            </p>
            <p>
              Teslim sonrasında periyodik bakım, servis ve revizyon hizmeti veriyoruz.
            </p>
          </div>
        </section>
      </div>
      <CtaBand />
    </>
  );
}
