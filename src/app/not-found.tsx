import { ButtonLink } from "@/components/Button";
import { PageHero } from "@/components/Blocks";

export default function NotFound() {
  return (
    <PageHero title="Sayfa bulunamadı" lead="Aradığınız sayfa taşınmış ya da kaldırılmış olabilir.">
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
        <ButtonLink href="/">Anasayfa</ButtonLink>
        <ButtonLink href="/projeler" variant="ghost">
          Projeler
        </ButtonLink>
      </div>
    </PageHero>
  );
}
