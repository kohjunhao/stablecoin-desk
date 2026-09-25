import Link from "next/link";
import { AS_OF, STATUS_LABEL, currencies } from "@/lib/currencies";

export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="wrap">
          <p className="kicker">As of {AS_OF}</p>
          <h1>Can you mint it, or can you only sell someone else’s coin?</h1>
          <p className="lede">
            Eight currencies. Same two questions for each. Issuing means you create
            and redeem the token. Reselling means a licensed issuer mints it, and
            you sell that inventory to customers. Most “stablecoin businesses”
            are the second thing and do not know it.
          </p>
          <p className="note">
            Lira is read as Turkish lira (TRY). Won is South Korean won (KRW).
            This is a desk memo, not a licence opinion.
          </p>
        </div>
      </section>

      <section className="page" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="pair">
            <article>
              <h3>Issue</h3>
              <p>
                Customer sends fiat. You mint a token you control. Customer sends
                the token back. You burn it and pay fiat. You are on the hook for
                reserves and par redemption. That is an issuer licence.
              </p>
            </article>
            <article>
              <h3>Resell</h3>
              <p>
                Circle, Tether, a trust bank or an EMI mints and redeems. You buy
                the coin and sell it on. You need an exchange / VASP / CASP /
                money-transmitter licence. You do not become the issuer by
                holding inventory.
              </p>
            </article>
          </div>
          <p className="note">
            <Link href="/issue-vs-resell">The distinction, with the usual fake-resale tricks.</Link>
          </p>

          <ol className="list">
            {currencies.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`}>
                  <span className="code">{c.code}</span>
                  <span>
                    <h2>
                      {c.name}
                      {c.slug === "try" || c.slug === "krw" ? ` (${c.code})` : ""}
                    </h2>
                    <p className="note" style={{ marginTop: 4 }}>
                      {c.verdict}
                    </p>
                  </span>
                  <span className={`status status-${c.status}`}>{STATUS_LABEL[c.status]}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
