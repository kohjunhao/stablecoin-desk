import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AS_OF, STATUS_LABEL, bySlug, currencies } from "@/lib/currencies";

export function generateStaticParams() {
  return currencies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = bySlug(slug);
  if (!c) return {};
  return {
    title: `${c.code} — ${c.name}`,
    description: c.verdict,
  };
}

export default async function CurrencyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = bySlug(slug);
  if (!c) notFound();

  const i = currencies.findIndex((x) => x.slug === c.slug);
  const prev = currencies[i - 1];
  const next = currencies[i + 1];

  return (
    <main id="main" className="page">
      <div className="wrap">
        <p className="crumb">
          <Link href="/">Eight currencies</Link> / {c.code}
        </p>
        <p className="kicker">
          {c.place} · {STATUS_LABEL[c.status]}
        </p>
        <h1>
          {c.code}
          <span style={{ color: "var(--muted)" }}> {c.name}</span>
        </h1>
        <p className="lede">{c.verdict}</p>
        <p className="note">As of {AS_OF}.</p>

        <h2>Is it regulated?</h2>
        <p>{c.regulated}</p>

        <h2>How a company issues</h2>
        <p className="answer">{c.issue.answer}</p>
        <p>{c.issue.body}</p>
        <ol className="steps">
          {c.issue.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <h2>Can a company resell?</h2>
        <p className="answer">{c.resell.answer}</p>
        <p>{c.resell.body}</p>
        <p className="catch">{c.resell.catch}</p>

        <h2>Watch</h2>
        <ul className="watch">
          {c.watch.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>Sources</h2>
        <ul className="sources">
          {c.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} rel="noreferrer">
                {s.title}
              </a>
              <span className="date">{s.date}</span>
            </li>
          ))}
        </ul>

        <hr className="rule" />
        <p className="note">
          {prev ? <Link href={`/${prev.slug}`}>← {prev.code}</Link> : <span />}
          {"  "}
          {next ? <Link href={`/${next.slug}`}>{next.code} →</Link> : null}
        </p>
      </div>
    </main>
  );
}
