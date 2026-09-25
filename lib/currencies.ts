import type { Currency, Status } from "./types";

export const AS_OF = "25 September 2026";

export const STATUS_LABEL: Record<Status, string> = {
  "issue-licensed": "Issuance has a license",
  "issue-pending": "Law not finished",
  sandbox: "Sandbox / wholesale only",
  "trade-only": "Trade existing coins, do not mint",
  "issue-blocked": "Fiat-pegged issuance not in the law",
};

export const currencies: Currency[] = [
  {
    slug: "usd",
    code: "USD",
    name: "US dollar",
    place: "United States",
    status: "issue-licensed",
    verdict:
      "Federal issuer law is on the books. You may not mint a payment stablecoin in the US unless you are a permitted issuer. Reselling someone else’s coin is a separate, licensed distribution business, and from July 2028 US platforms may only offer coins from permitted issuers.",
    regulated:
      "Yes. The GENIUS Act (P.L. 119-27) was signed on 18 July 2025. It regulates payment stablecoins: tokens used for payment or settlement that the issuer must redeem at a fixed amount. Implementing rules are still being written. The Fed proposed capital, reserve and two-day redemption rules on 24 September 2026. Treasury proposed the offer-and-sale rules on 18 August 2026 (comments to 19 October 2026). The main issuer restrictions are expected to apply on 18 January 2027, or 120 days after final federal rules, whichever is first.",
    issue: {
      answer: "Yes, if you become a permitted payment stablecoin issuer.",
      body: "Only a permitted payment stablecoin issuer (PPSI) may issue in the United States. That is an insured bank or credit union (or a subsidiary), or a nonbank approved by the OCC or a certified state regime. You hold 1:1 permitted reserves (cash, insured deposits, short T-bills, Treasury-backed repos, government money funds, central-bank reserves). You publish a redemption policy. Executives certify reserve reports; a registered public accountant examines them. The Fed’s September 2026 proposal would generally require redemption within two business days and an operational-capital charge that steps down as outstanding grows. Interest or yield on the coin itself is banned.",
      steps: [
        "Pick the charter: bank/subsidiary, OCC nonbank, or qualifying state issuer.",
        "File the application the relevant agency is writing now (Fed, FDIC, OCC, NCUA, or state).",
        "Build 1:1 permitted reserves, redemption ops, BSA/AML, and monthly public reserve reports.",
        "Mint only against received dollars. Burn on redemption. Do not treat secondary inventory as “issuance” unless you reacquired and re-issued the tokens.",
      ],
    },
    resell: {
      answer: "Yes, as a distributor, not as the issuer — with a hard cutover in 2028.",
      body: "Buying USDC or USDT from the issuer or the market and selling it to customers is not minting. Today that business sits under existing money-transmitter, BSA, and (where relevant) state BitLicense / exchange rules. The GENIUS Act then overlays a product filter: from 18 July 2028 a digital asset service provider may not offer or sell a payment stablecoin to a person in the United States unless it was issued by a PPSI (or a foreign issuer that Treasury treats as comparable and that can comply with US orders). Treasury’s August 2026 proposal treats advertising, soliciting US persons, market-making newly issued coins, and distributing newly issued coins as “offer or sale.”",
      catch:
        "If you take customer dollars and credit a token you created, that is issuance. If you only move Circle’s or Tether’s token, you are a reseller. After July 2028, reselling an unlicensed foreign coin (Tether, unless it becomes a comparable foreign issuer) is the part that breaks.",
    },
    watch: [
      "18 January 2027 — expected start of the issuer prohibition.",
      "19 October 2026 — Treasury offer/sale comment deadline.",
      "18 July 2028 — platforms may only offer PPSI (or comparable foreign) coins to US persons.",
    ],
    sources: [
      {
        title: "CRS, GENIUS Act of 2025 (P.L. 119-27) overview, IN12553",
        url: "https://www.congress.gov/crs-product/IN12553",
        date: "20 Aug 2026",
      },
      {
        title: "GENIUS Act compiled text, 12 U.S.C. 5901 et seq.",
        url: "https://www.govinfo.gov/content/pkg/COMPS-18221/pdf/COMPS-18221.pdf",
        date: "20 May 2026",
      },
      {
        title: "Treasury proposed rule on issuance, offer and sale, 91 Fed. Reg. 53367",
        url: "https://www.govinfo.gov/content/pkg/FR-2026-08-18/pdf/2026-16796.pdf",
        date: "18 Aug 2026",
      },
      {
        title: "Federal Reserve GENIUS Act proposals (reserves, bank-subsidiary applications)",
        url: "https://crypto.news/fed-proposes-genius-act-rules-for-stablecoin-reserves/",
        date: "24 Sep 2026",
      },
    ],
  },
  {
    slug: "eur",
    code: "EUR",
    name: "Euro",
    place: "European Union / EEA",
    status: "issue-licensed",
    verdict:
      "MiCA is live. A euro (or dollar) stablecoin offered in the Union is an e-money token. Only a bank or an e-money institution may issue it. Other firms may offer that same token to the public only with the issuer’s written consent, and usually need a CASP licence to deal it.",
    regulated:
      "Yes, fully. Markets in Crypto-Assets Regulation (EU) 2023/1114. Titles III and IV (asset-referenced tokens and e-money tokens) applied from 30 June 2024. An e-money token (EMT) is a crypto-asset that purports to hold stable value by referencing a single official currency. It is deemed electronic money. A token referencing a Member State currency is deemed offered to the public in the Union. As of late September 2026 the ESMA register shows on the order of two dozen authorised EMT issuers; the ART issuer register is empty.",
    issue: {
      answer: "Yes. Become a credit institution or an electronic-money institution, then notify a white paper.",
      body: "Article 48: you may not offer an EMT to the public or seek admission to trading in the Union unless you are the issuer, authorised as a credit institution or EMI, and have notified and published a crypto-asset white paper. You issue at par on receipt of funds and redeem at par, in funds, at any time, free of charge (Article 49). Holders have a claim on the issuer. At least 30% of received funds sit in separate credit-institution accounts; the rest in secure, low-risk, highly liquid instruments (Article 54). No interest on the token (Article 50). Significant EMTs move to EBA supervision.",
      steps: [
        "Authorise as an EU/EEA credit institution or EMI (home NCA — ACPR, DNB, CSSF, etc.).",
        "Notify the crypto-asset white paper at least 40 working days before the offer (Article 48(6), 51).",
        "Issue 1:1 against received euros (or the peg currency). Redeem at par on demand.",
        "If the token is “significant,” extra own-funds, liquidity and EBA oversight apply.",
      ],
    },
    resell: {
      answer: "Yes, with the issuer’s written consent, plus a CASP (and often a payment-institution) licence.",
      body: "Article 48, second subparagraph: other persons may offer the EMT to the public or seek admission to trading upon the issuer’s written consent, and must comply with Articles 50 and 53. That is the statutory reseller path — you are not the minter. To exchange, custody or transfer the token for customers you need CASP authorisation (Title V) or an Article 60 notification if you are already a bank, EMI or MiFID firm. EBA ended the dual-authorisation grace for CASPs transacting EMTs on 2 March 2026; EMT payment activity can also need a payment-institution licence. Unauthorised EMTs (Tether’s USDT is the working example) have been pulled from most EEA venues.",
      catch:
        "Consent of the issuer is not optional if you are offering that EMT to the EU public. Listing an unauthorised dollar coin for EU retail is the thing MiCA was written to stop. Reverse solicitation is narrow.",
    },
    watch: [
      "ESMA EMT register — who is actually authorised this month.",
      "Home-NCA EMI / bank pipeline (Qivalis euro coin still pending DNB as of Sep 2026).",
      "Payment-institution overlay on top of CASP for EMT transfers.",
    ],
    sources: [
      {
        title: "MiCA Article 48 — offer to the public of e-money tokens (ESMA rulebook)",
        url: "https://www.esma.europa.eu/publications-and-data/interactive-single-rulebook/mica/article-48-requirements-offer-public-or",
        date: "retrieved Sep 2026",
      },
      {
        title: "MiCA Article 49 — issuance and redeemability of e-money tokens",
        url: "https://www.springlex.eu/en/packages/mica/mica-regulation/article-49/",
        date: "retrieved Sep 2026",
      },
      {
        title: "ESMA-derived EMT issuer list (CASP Tracker)",
        url: "https://casptracker.eu/e-money-token-list-under-mica/",
        date: "24 Sep 2026",
      },
    ],
  },
  {
    slug: "jpy",
    code: "JPY",
    name: "Yen",
    place: "Japan",
    status: "issue-licensed",
    verdict:
      "Yen stablecoins are electronic payment instruments under the Payment Services Act. Banks, funds-transfer firms and trust banks may issue. A separate Japanese registration is required to handle (including resell) those instruments. Foreign coins come in only if designated and distributed by a licensed Japanese handler.",
    regulated:
      "Yes, since 1 June 2023. The 2022 PSA amendment defined fiat-pegged, par-redeemable coins as electronic payment instruments (EPIs). Four types exist in the statute. Type 1: funds-transfer style (JPYC, launched 27 October 2025). Type 3: specified trust beneficiary rights (JPYSC, SBI Shinsei Trust Bank, 24 June 2026). Type 4: foreign trust-type coins designated by FSA (Ripple’s RLUSD, same day, via SBI VC Trade). A 2025 PSA amendment created a lighter intermediary category and took effect 1 June 2026. FSA lifted the ¥1 million per-transaction cap on Type 1 funds-transfer issuers on 24 August 2026.",
    issue: {
      answer: "Yes, but only as a bank, a registered funds-transfer provider, or a trust bank.",
      body: "Issuance and redemption of EPIs is treated as funds-transfer business. JPYC Inc. registered as a funds-transfer provider (August 2025) and issues Type 1. SBI Shinsei Trust Bank issues Type 3 JPYSC; holders have a trust-law claim on yen held in segregated accounts, with no transaction cap. FSA’s working view has been that banks should not issue permissionless Type 1 coins; bank product is tokenised deposits, and the three megabanks have been building a yen coin for FY2026 commercial use. You mint against yen. You redeem at par through the licensed channel.",
      steps: [
        "Choose the wrapper: funds-transfer registration (Type 1), trust-bank specified trust (Type 3), or bank tokenised deposit.",
        "Register with FSA. Build AML, redemption, and reserve (trust coins: demand deposits / short JGBs as the 2025 amendment allows).",
        "Issue only through the registered channel. Permissionless on-chain transfer is the product; the issuer is still a Japanese licensed person.",
      ],
    },
    resell: {
      answer: "Yes, as an Electronic Payment Instruments Service Provider — you do not mint.",
      body: "Circulation is a different registration from issuance. A Japanese EPI service provider (and, since 1 June 2026, a lighter intermediary that only brokers) may handle, exchange and distribute EPIs, including designated foreign Type 4 coins. That is the reseller: SBI VC Trade distributing RLUSD or USDC is the template. You buy from the issuer or the market, you sell to Japanese customers under FSA rules, the foreign issuer remains the minter. Type 4 coins need FSA designation and equivalent home-state regulation plus information-sharing.",
      catch:
        "You cannot skip the Japanese handler and sell a raw offshore USDT book into Japan as a payment instrument. Crypto-asset exchanges (CAESP) are a different licence; fiat-redeemable coins are EPIs, not crypto assets, once they meet the statutory test.",
    },
    watch: [
      "Megabank yen coin commercial launch in FY2026.",
      "Which foreign coins FSA actually designates as Type 4 besides RLUSD.",
      "How the June 2026 intermediary category is used in practice.",
    ],
    sources: [
      {
        title: "So & Sato — stablecoins and tokenised deposits under Japanese law",
        url: "https://innovationlaw.jp/stablecoin-tokenized-deposit-lending/",
        date: "7 Aug 2026",
      },
      {
        title: "JPYC launch as Type 1 EPI; JPYSC and RLUSD 24 June 2026",
        url: "https://stablecoininsider.org/ripples-rlusd-goes-live-in-japan-after-jfsa-approval-as-first-type-4-electronic-payment-instrument/",
        date: "25 Jun 2026",
      },
      {
        title: "FSA lifts ¥1m Type 1 transaction cap",
        url: "https://www.techtimes.com/articles/325431/20260825/japan-lifts-stablecoin-cap-fsas-dedicated-division-unlocks-institutional-yen-payments.htm",
        date: "25 Aug 2026",
      },
    ],
  },
  {
    slug: "try",
    code: "TRY",
    name: "Lira",
    place: "Türkiye",
    status: "trade-only",
    verdict:
      "Read as Turkish lira. There is no licence to mint a TRY-pegged payment stablecoin. Licensed crypto platforms may list and trade existing coins (USDT). Using crypto as payment is banned. The Digital Turkish Lira is a CBDC project, not a private coin.",
    regulated:
      "Partly. Law No. 7518 (in force 2 July 2024) put crypto-asset service providers under the Capital Markets Board (CMB/SPK). Communiqués III-35/B.1 and III-35/B.2 (Official Gazette 13 March 2025) set establishment, capital and operating rules. Full operating licences were targeted for 30 June 2026. There is still no statutory definition of a stablecoin comparable to MiCA’s EMT. Chambers (2026) expects a TRY coin, if it comes, to sit under CBRT payments law, not CMB. CBRT’s 16 April 2021 regulation still bans using crypto-assets, directly or indirectly, as a means of payment, and bars payment and e-money institutions from intermediating flows to crypto platforms.",
    issue: {
      answer: "Not as a defined, licensable activity today.",
      body: "CMB licenses platforms, custodians and similar CASPs. CBRT licenses payment and e-money institutions under Law 6493 — that is prepaid e-money, not an on-chain TRY stablecoin, and those firms are specifically walled off from crypto-platform flows. No CMB or CBRT communiqué currently authorises a private party to mint a par-redeemable TRY token for payments. Doing it anyway would sit across unlicensed e-money issuance, the payment ban, and unlicensed crypto-asset activity. CBRT is building a Digital Turkish Lira (second-phase report November 2025; sandbox invitations 2025); that is the state’s coin, not yours.",
      steps: [
        "Do not mint a TRY coin and call it e-money without CBRT authorisation under Law 6493 — and even then, e-money institutions cannot plug into crypto platforms.",
        "If the product is a traded crypto-asset, you are in CMB space, which does not currently grant an issuer charter for a payment stablecoin.",
        "Watch CBRT payments-law work. Until a communiqué exists, there is no application form.",
      ],
    },
    resell: {
      answer: "Yes for trading on a CMB-licensed CASP. No for merchant payments.",
      body: "Turkish residents may hold and trade USDT and similar coins through CMB-licensed KVHS/CASPs. That is resale: the foreign issuer mints and redeems; the Turkish platform is the broker/custodian. MASAK General Communiqué No. 29 (28 June 2025) caps stablecoin withdrawals at about USD 3,000/day and USD 50,000/month (doubled where full Travel Rule applies) and imposes 48–72 hour withdrawal holds. You cannot use those coins at checkout. You cannot have a payment or e-money institution sit in the middle of the on/off ramp.",
      catch:
        "A “we buy USDT and sell it to Turkish customers as a payment balance” model is the 2021 ban. A “we list USDT on a licensed exchange” model is the 2024–26 CMB regime.",
    },
    watch: [
      "CMB remaining authorisation-certificate and custody-contract deadlines (extended March 2026).",
      "Any CBRT secondary text on private TRY tokens.",
      "Digital lira MVP timing (talk of 2027 consumer availability; payment ban not repealed).",
    ],
    sources: [
      {
        title: "Chambers, Blockchain & Crypto-Assets 2026 — Türkiye",
        url: "https://practiceguides.chambers.com/practice-guides/blockchain-crypto-assets-2026/turkey",
        date: "11 Jun 2026",
      },
      {
        title: "CMB Communiqué III-35/B.1 (crypto-asset service providers)",
        url: "https://cryptoslate.com/crypto-laws/turkey-cmb-communique-iii-35-b-1-crypto-asset-service-provider-rules/",
        date: "13 Mar 2025 / updated 2026",
      },
      {
        title: "MASAK General Communiqué No. 29 — stablecoin withdrawal limits",
        url: "https://www.limanlegal.com/makaleler/kripto-para-hukuku/kripto-varlik-hizmet-saglayicilari-7518-sayili-kanun-ve-spk-tebligleriyle-kurulan-yeni-rejim",
        date: "28 Jun 2025",
      },
    ],
  },
  {
    slug: "thb",
    code: "THB",
    name: "Thai baht",
    place: "Thailand",
    status: "sandbox",
    verdict:
      "You can resell USDT on an SEC-licensed digital-asset platform. You cannot generally mint a baht coin for the public yet. Bank of Thailand is writing a 1:1 wholesale THB stablecoin framework; public hearing is due before end-2026.",
    regulated:
      "Split. The SEC licenses digital-asset exchanges, brokers and dealers under the Emergency Decree on Digital Asset Businesses. Those venues already list foreign stablecoins. A THB-backed payment coin is a Bank of Thailand problem. In 2021 BoT said baht coins used for payments look like e-money. In 2024 it opened a Programmable Payment Sandbox (expanded December 2025) so licensed institutions can test baht-backed coins under supervision. Governor Vitai Ratanakorn (June 2026) said a 1:1 baht-backed coin, reserves in segregated accounts at licensed institutions, redeemable on demand, first for interbank settlement, then maybe retail. Formal rules targeted late 2026 or early 2027.",
    issue: {
      answer: "Not for the public. Sandbox / future BoT rules only, and likely only licensed financial institutions.",
      body: "There is no general “issue a THB stablecoin” licence on the SEC side. BoT’s design study was nearing completion in June 2026: full reserve, segregated, redeemable, wholesale-first. Private issuance is contemplated for regulated institutions, not a random company. Until the hearing and the regulation, minting a baht token and selling it as money is the old e-money / unlicensed-payments problem.",
      steps: [
        "If you are a BoT-supervised institution, the sandbox is the current door.",
        "Wait for the 2026 public hearing and the 2026/27 regulation before treating THB issuance as a product.",
        "Do not run an unlicensed baht-denominated payment token in parallel with the sandbox.",
      ],
    },
    resell: {
      answer: "Yes, on an SEC-licensed digital-asset operator, with tightening transfer rules.",
      body: "Licensed Thai exchanges already let customers buy and sell USDT against baht. That is resale of a foreign-issued coin. SEC consultation No. 191/2569 (11 September 2026, comments to 25 September 2026) would require same-owner verified wallets, ban third-party wallet transfers on the regulated rail, and cap deposits and withdrawals at 5 million baht (~USD 150k) per person per operator per day, with exemptions for Travel-Rule transfers between Thai operators, BoT-authorised business use, and market makers. BoT had flagged abnormal USDT volumes used to skip banking disclosure (July 2026).",
      catch:
        "Reselling USDT as a traded digital asset is the live path. Reselling it as a silent baht payment gateway is what BoT has been shutting down.",
    },
    watch: [
      "SEC stablecoin-transfer consultation closed 25 September 2026 — watch the final notice.",
      "BoT public hearing on the THB coin, due before year-end 2026.",
      "Who BoT lets into the sandbox as an actual issuer.",
    ],
    sources: [
      {
        title: "Bangkok Post — SEC proposes 5 million baht daily stablecoin transfer cap",
        url: "https://www.bangkokpost.com/business/investment/3320378/sec-proposes-changes-to-stablecoin-transfer-rules",
        date: "16 Sep 2026",
      },
      {
        title: "BoT governor on 1:1 baht-backed stablecoin, wholesale first",
        url: "https://www.thaiexaminer.com/thai-news-foreigners/2026/06/29/bank-of-thailand-pushes-a-baht-backed-stablecoin-but-warns-against-forex-trading-and-payment-gateways/",
        date: "29 Jun 2026",
      },
      {
        title: "SECID 1206 consultation principles (same-owner rule, 5m baht cap)",
        url: "https://www.cryptotimes.io/2026/09/13/thailand-sec-proposes-5-million-baht-daily-cap-on-stablecoin-transfers-under-same-owner-rule/",
        date: "13 Sep 2026",
      },
    ],
  },
  {
    slug: "vnd",
    code: "VND",
    name: "Vietnamese dong",
    place: "Vietnam",
    status: "issue-blocked",
    verdict:
      "The five-year crypto pilot explicitly excludes digital forms of fiat money as something you can issue. A VND-pegged stablecoin is not the permitted product. Licensed platforms may, once licensed, list foreign coins and quote them in dong.",
    regulated:
      "A pilot, not a finished stablecoin statute. Resolution 05/2025/NQ-CP (9 September 2025) runs five years. The Law on Digital Technology Industry (71/2025/QH15) took effect 1 January 2026. Decree 284/2026/ND-CP (in force 1 September 2026) sets administrative fines. Article 3 of the Resolution: crypto assets do not include securities, digital forms of fiat money, or other financial assets. Article 5: issuance must be based on real-world assets excluding securities or fiat money, by a Vietnamese LLC or JSC, offered only to foreign investors through a Ministry of Finance-licensed service provider. First CASP licences were still expected in 2026; the market is not a live open exchange yet. AML amendments adding crypto red flags take effect 1 December 2026.",
    issue: {
      answer: "No. Fiat-backed VND tokens are carved out of the pilot.",
      body: "You cannot take the Resolution 05 issuance path and put dong in the reserve. The underlying cannot be fiat money. The offer cannot go to Vietnamese retail. A company that minted a VND stablecoin would be issuing a digital form of legal tender that the Resolution says is not a crypto-asset under the pilot — i.e. the wrong legal box, with Decree 284 penalties for unlawful offering. There is no SBV e-money-on-chain charter published as a substitute.",
      steps: [
        "Do not file a VND stablecoin as a Resolution 05 issuance. The underlying-asset test fails.",
        "RWA tokens (not fiat, not securities) can be issued by a Vietnamese company to foreign investors through a licensed CASP, with a prospectus 15 days prior.",
        "A true VND payment token would need a later State Bank / payments law. It does not exist in this package.",
      ],
    },
    resell: {
      answer: "Not yet as a live business. When CASPs are licensed, foreign coins may be listed and traded in dong — not used as a second currency.",
      body: "SSC officials have said BTC, ETH, USDT and USDC will be listed and traded in Vietnamese dong on licensed platforms so that supervision, tax and AML stick. Domestic investors who already hold crypto may participate; foreigners trade more freely. All secondary trading must go through the licensed CASP. That is resale of a foreign-issued coin, quoted in VND. It is not a licence to mint. Service-provider licensing is heavy (charter capital on the order of VND 10 trillion, 65% domestic, bank/securities/tech mix).",
      catch:
        "There are no generally licensed Vietnamese CASPs to contract with as of this desk’s date. “We will resell USDT in Vietnam” is a 2026 licence, not a 2026 storefront.",
    },
    watch: [
      "First Ministry of Finance CASP licences (promised for 2026).",
      "Whether SBV writes a separate VND token / e-money-on-chain rule.",
      "Decree 284 enforcement once platforms exist.",
    ],
    sources: [
      {
        title: "Resolution 05/2025/NQ-CP — Articles 3, 5, 6 (English compilation)",
        url: "https://thuvienphapluat.vn/van-ban/Tien-te-Ngan-hang/Resolution-05-2025-NQ-CP-pilot-implementation-of-crypto-asset-market-676472.aspx",
        date: "9 Sep 2025",
      },
      {
        title: "Viet An Law summary of issuance conditions (no fiat underlying)",
        url: "https://vietanlaw.com/resolution-05-2025-nq-cp-vietnams-crypto-asset-market-program/",
        date: "29 Sep 2025",
      },
      {
        title: "Vietnam News — SSC on listing USDT/USDC in dong; domestic access limits",
        url: "https://bizhub.vietnamnews.vn/viet-nam-restricts-domestic-access-in-pilot-crypto-market-post405657.html",
        date: "19 Jun 2026",
      },
      {
        title: "Decree 284/2026/ND-CP administrative sanctions on crypto-assets",
        url: "https://english.luatvietnam.vn/decree-no-284-2026-nd-cp-dated-july-16-2026-of-the-government-prescribing-the-sanctioning-of-administrative-violations-regarding-crypto-assets-and-t-440680-doc1.html",
        date: "16 Jul 2026 / in force 1 Sep 2026",
      },
    ],
  },
  {
    slug: "php",
    code: "PHP",
    name: "Philippine peso",
    place: "Philippines",
    status: "sandbox",
    verdict:
      "Issuing a peso coin is a BSP problem (e-money + VASP), and the only live example is Coins.ph’s PHPC sandbox. Reselling USDT is what licensed VASPs already do. New VASP licences are frozen.",
    regulated:
      "Yes, but split across two agencies and a moratorium. Bangko Sentral ng Pilipinas licenses Virtual Asset Service Providers (Circular 1108 / 2021) and Electronic Money Issuers. The SEC licenses crypto-asset service providers (Memorandum Circulars 4 and 5, 2025). BSP has kept a moratorium on new VASP licences (extended from 1 September 2025). As of the 15 July 2026 TRISD directory, a short roster of bank and non-bank VASPs is authorised (Coins.ph, Maya, PDAX, UnionBank, GoTyme, and a handful of others). Memorandum M-2026-023 (5 June 2026) makes VASPs diligence every listed token, including redemption, liquidity and reserves for asset-backed coins, and bans privacy coins.",
    issue: {
      answer: "Only with BSP permission. The working template is EMI + VASP inside the regulatory sandbox.",
      body: "Coins.ph (Betur, Inc.) is both a VASP and an EMI. PHPC is a 1:1 peso token, reserves in Philippine-bank cash and cash equivalents, issued on Polygon, piloted under BSP’s Regulatory Sandbox Framework. The white paper says Coins.ph is the issuer and must reimburse remaining PHPC 100% at the end of sandbox testing. That is issuance: mint against pesos, burn on redemption. There is no open “anyone with a corp” charter. A 2026 BSP draft would push EMI floats toward 50% held in trust. New VASPs cannot join the roster while the moratorium holds.",
      steps: [
        "Be (or partner with) an existing BSP VASP. New applications are not being taken.",
        "Hold EMI authority if the token is peso e-money in substance.",
        "Enter the BSP sandbox. Do not mint a public PHP coin outside it.",
        "1:1 peso reserves in PH banks. Redeem at par. Plan for 100% wind-down if the sandbox ends.",
      ],
    },
    resell: {
      answer: "Yes, if you are already a licensed VASP (or you become a customer of one).",
      body: "Licensed VASPs buy and sell USDT/USDC against pesos every day. Coins.ph has described itself as a regulated gateway for remittance firms moving dollar stablecoins in and out, converting to pesos for the end user. That is resale of a foreign-issued coin. M-2026-023 requires a lifecycle look at the issuer, backing and redemption before you list an asset-backed token. You do not mint. You cannot stand up a new VASP to do this while the freeze lasts. A September 2026 draft would also freeze new Operator of Payment System registrations for a year and treat VASPs as high-risk merchants.",
      catch:
        "If the customer sends pesos and you credit a token you created, BSP will read that as e-money issuance plus virtual-asset activity — PHPC’s box — not as “resale.”",
    },
    watch: [
      "Whether PHPC graduates from sandbox to a standing product.",
      "VASP moratorium reassessment.",
      "Final EMI trust-float circular.",
    ],
    sources: [
      {
        title: "PHPC white paper — Coins.ph as issuer, BSP sandbox, 100% peso reserves",
        url: "https://www.coins.ph/en-ph/phpc-whitepaper",
        date: "retrieved 2026",
      },
      {
        title: "BitPinas regulation tracker — Circular 1108, SEC MC 4/5, M-2026-023",
        url: "https://bitpinas.com/learn-how-to-guides/philippine-crypto-regulation-tracker/",
        date: "23 Sep 2026",
      },
      {
        title: "BSP Memorandum M-2026-023 token listing rules",
        url: "https://fintechnews.ph/71779/crypto/bsp-crypto-token-listing-rules-vasp/",
        date: "16 Jun 2026",
      },
    ],
  },
  {
    slug: "krw",
    code: "KRW",
    name: "Won",
    place: "South Korea",
    status: "issue-pending",
    verdict:
      "You can resell USDT on a licensed VASP. You cannot yet rely on a statute that lets a company mint a won stablecoin. The Digital Asset Basic Act is still stuck on who may issue — banks at 51%, or a wider set.",
    regulated:
      "VASPs are regulated. Won stablecoin issuance is not, as a finished law. The Virtual Asset User Protection Act already licenses virtual-asset service providers. The Digital Asset Basic Act (DABA), introduced 10 June 2025, would add a won-pegged stablecoin regime. It has missed multiple target dates. Bank of Korea wants issuance limited to consortia in which banks hold at least 51%. The Financial Services Commission has said issuer structure is “not finalized” and has pushed back on a bank-only gate. The National Assembly Budget Office published merchant-fee savings estimates in September 2026 while warning about deposit flight. Target remains second half of 2026. It is not law.",
    issue: {
      answer: "Not under a standing statute. Bank consortia are preparing; one custodian has a pilot token.",
      body: "BDACS launched KRW1 with won reserves at Woori Bank (reported as a PoC in 2025, with later Visa/Rain distribution talk in September 2026). That is a product ahead of the statute, not a completed issuer charter you can copy. Hana Bank–Dunamu and a Shinhan-led bank coalition have been lining up won-coin vehicles. Until DABA (or a sandbox designation that actually authorises issuance) lands, minting a par-redeemable KRW token for the public is a legal gap. FSC published draft AML expectations for future issuers in February 2026; that is preparation, not a licence.",
      steps: [
        "Do not treat KRW1’s existence as a general licence.",
        "If you are a bank, the consortium route is what BOK is arguing for.",
        "If you are not a bank, FSC’s wider-eligibility argument is the only political path, and it has not won yet.",
        "Sandbox / innovative-financial-service designations (e.g. Project Hangang) are for testing, not a retail mint.",
      ],
    },
    resell: {
      answer: "Yes, through a licensed Korean VASP.",
      body: "Korean exchanges already sell dollar stablecoins to KYC’d customers under the existing virtual-asset regime (Travel Rule, AML). That is resale of a foreign-issued coin. Won-denominated cards or merchant rails that sit on KRW1 are distribution experiments around a pilot token, not a second mint. Cross-border stablecoin transfers will also have to live with the Foreign Exchange Transactions Act once DABA exists.",
      catch:
        "Issuing your own KRW token and “letting a bank hold the reserves” is still issuance. Buying USDT and selling it on Upbit is resale. The first is waiting on DABA. The second is a VASP licence you either have or do not.",
    },
    watch: [
      "DABA reintroduction and the 51% bank-ownership fight.",
      "Whether KRW1 is folded into the eventual statute or has to re-paper.",
      "FSC vs BOK public line on non-bank issuers.",
    ],
    sources: [
      {
        title: "Chambers, Blockchain & Crypto-Assets 2026 — South Korea (DABA still in committee)",
        url: "https://practiceguides.chambers.com/practice-guides/blockchain-crypto-assets-2026/south-korea",
        date: "11 Jun 2026",
      },
      {
        title: "FSC: won-stablecoin issuance structure ‘not finalized’",
        url: "https://en.bloomingbit.io/feed/news/103549",
        date: "6 Jan 2026",
      },
      {
        title: "National Assembly Budget Office on won stablecoins and merchant fees",
        url: "https://www.coindesk.com/business/2026/09/08/stablecoins-could-save-south-korean-merchants-up-to-usd3-8-billion-a-year-budget-office-says",
        date: "8 Sep 2026",
      },
      {
        title: "KRW1 / BDACS — product exists ahead of the statute",
        url: "https://www.bitrue.com/blog/krw1-stablecoin-launch-south-korea",
        date: "16 Sep 2026",
      },
    ],
  },
];

export function bySlug(slug: string) {
  return currencies.find((c) => c.slug === slug);
}
