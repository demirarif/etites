import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/Blocks";
import { formatDate, getPost, posts } from "@/data/blog";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  return pageMetadata({
    title: p.title,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
    type: "article",
    publishedTime: p.date,
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  return (
    <>
      <PageHero title={p.title} crumbs={[{ href: "/blog", label: "Blog" }]}>
        <div className="post-card__meta">
          <span>{p.topic}</span>
          {p.date && <time dateTime={p.date}>{formatDate(p.date)}</time>}
          <span>{p.readMinutes} dakika</span>
        </div>
      </PageHero>
      <article className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="prose readable">
            <p>
              <strong>{p.excerpt}</strong>
            </p>
            {p.body.map((b, i) => (
              <div key={i}>
                {b.h && <h2>{b.h}</h2>}
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
