import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Issue vs resell",
};

export default function IssueVsResell() {
  return (
    <main id="main" className="page">
      <div className="wrap">
        <p className="crumb">
          <Link href="/">Eight currencies</Link> / Issue vs resell
        </p>
        <p className="kicker">The only distinction that matters</p>
        <h1>If you can mint it, you are the issuer. If you cannot, you are a dealer.</h1>
        <p className="lede">
          Lawyers will add ten pages. The economic test is this. Who promises to
          pay a dollar, a euro, a yen, when the token comes back?
        </p>

        <h2>Issuance</h2>
        <p>
          You create tokens against incoming fiat and destroy them on redemption.
          The holder’s claim is on you, or on a trust you set up. Reserves sit
          in your name or in a trustee’s. That is a bank, an EMI, a funds-transfer
          firm, a GENIUS Act permitted issuer, a BSP sandbox name. It is not a
          Shopify plugin.
        </p>

        <h2>Resale</h2>
        <p>
          Someone else already did the mint. You buy USDC from Circle’s rail, or
          USDT in the market, or JPYSC from SBI, and you sell that same token to
          a customer. You may hold a float. You may make a spread. You do not
          promise par against your own balance sheet except as a dealer’s
          inventory risk. When the customer redeems at the issuer, the issuer
          burns. You were never the minter.
        </p>
        <p style={{ marginTop: 12 }}>
          MiCA writes this down: a third party may offer an e-money token to the
          public only with the issuer’s written consent. The GENIUS Act writes
          the US version: from July 2028, a digital asset service provider may
          only offer coins from permitted issuers to US persons. Japan splits it
          into two registrations — issuer versus electronic-payment-instrument
          handler.
        </p>

        <h2>The fake reseller</h2>
        <p>
          Taking customer pesos and crediting a token you deployed is issuance,
          even if you “hedge” with USDT in a binance account. Wrapping someone
          else’s coin into your own ERC-20 and calling the wrapper “receipts”
          is usually still an offer of a new token. Running an omnibus wallet
          labelled “USDT balance” while you actually run a delayed net
          settlement against your own pocket is e-money. Regulators have seen
          all three.
        </p>

        <h2>What to do in practice</h2>
        <ol className="steps">
          <li>
            If the product needs a local-currency coin that does not exist yet
            (TRY, VND, public THB, statutory KRW), you are waiting on a law, a
            sandbox, or a bank partner. You are not launching next month.
          </li>
          <li>
            If the product is “customers in that country can buy USDT/USDC,”
            you want the local VASP/CASP/exchange licence, or a contract with
            someone who has it. That is resale.
          </li>
          <li>
            If the product is “we mint EURC-style euro tokens,” you want an EMI
            or a bank in the EU, or a GENIUS Act PPSI for dollars, or a Japanese
            funds-transfer / trust-bank wrapper for yen.
          </li>
        </ol>

        <p className="note">
          <Link href="/">Back to the eight currencies.</Link>
        </p>
      </div>
    </main>
  );
}
