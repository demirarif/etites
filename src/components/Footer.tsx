import Link from "next/link";
import { brand, nav, site } from "@/data/site";
import { socialIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="site-footer" className="ftr">
      <div className="wrap">
        <div className="ftr__top">
          <div className="ftr__brand">
            <Link href="/" className="ftr__logo" aria-label="Etites İklimlendirme anasayfa">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={brand.white} alt="Etites İklimlendirme" width={brand.w} height={brand.h} />
            </Link>
            <p>Mekanik tesisat ve iklimlendirme</p>
          </div>

          <div className="ftr__office">
            <address className="ftr__contact">
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.line3}
              </span>
            </address>
          </div>

          <div className="ftr__direct">
            <a className="ftr__phone" href={site.phoneHref}>{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span className="ftr__hours">{site.hours}</span>
          </div>
        </div>

        <div className="ftr__links">
          <nav className="ftr__nav" aria-label="Alt menü">
            <ul>
              {nav.filter((n) => n.href !== "/").map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </nav>
          <div className="social">
            {site.social.map((s) => {
              const Icon = socialIcon[s.key];
              return (
                <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        <div className="ftr__bottom">
          <span>© {year} {site.legalName}</span>
          <nav className="ftr__legal" aria-label="Gizlilik ve çerezler">
            <Link href="/kisisel-verilerin-korunmasi">KVKK ve gizlilik</Link>
            <Link href="/cerez-ayarlari">Çerez ayarları</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
