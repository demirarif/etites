import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { ArrowRight } from "@/components/Icons";
import { formatDate, posts } from "@/data/blog";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  path: "/blog",
  description: "Isıtma, soğutma, VRF, havalandırma ve mekanik tesisat üzerine yazılar.",
});

export default function BlogPage() {
  return (
    <>
      <PageHero title="Blog" />
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 980 }}>
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="post-card">
              <div className="post-card__meta">
                <span>{p.topic}</span>
                {p.date && <time dateTime={p.date}>{formatDate(p.date)}</time>}
                <span>{p.readMinutes} dakika</span>
              </div>
              <h2 className="post-card__title">{p.title}</h2>
              <p className="post-card__excerpt">{p.excerpt}</p>
              <span className="textlink">
                Yazıyı oku <ArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
