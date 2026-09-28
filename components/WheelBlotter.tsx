"use client";

import { useMemo, useState } from "react";
import type { BlotterData, BlotterTrade } from "@/lib/xrp-wheel";

const FILTERS = ["all", "puts", "calls", "after"] as const;
const EXIT: Record<string, string> = {
  delta35: "15Δ → 35Δ",
  expiry_itm: "Friday ITM",
  expiry_otm: "Expired OTM",
  take_profit: "Call 50% TP",
  open_end: "Still open",
};

function pct(x: number) {
  return `${(x * 100).toFixed(0)}%`;
}

function px(n: number) {
  return n >= 1 ? n.toFixed(2) : n.toFixed(3);
}

function rowClass(t: BlotterTrade) {
  if (t.afterConvert) return "blot-row after";
  if (t.exit === "delta35" && t.cp === "P") return "blot-row hit";
  return "blot-row";
}

export function WheelBlotter({ data }: { data: BlotterData }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");

  const rows = useMemo(() => {
    return data.trades.filter((t) => {
      if (filter === "puts") return t.cp === "P";
      if (filter === "calls") return t.cp === "C";
      if (filter === "after") return t.afterConvert;
      return true;
    });
  }, [data.trades, filter]);

  return (
    <div>
      <section className="iv-box">
        <h2>How IV is made</h2>
        <p>
          There is no Deribit XRP implied-vol surface in this book. Every premium
          is Black-Scholes on a synthetic IV.
        </p>
        <p>
          ATM 7-day IV is 0.65 times 7-day XRP realized vol plus 0.35 times 30-day
          XRP realized vol, times a BTC vol-risk premium, times a small weekly term
          bump. Floor 30 percent, cap 250 percent.
        </p>
        <p>
          BTC premium: when Deribit BTC DVOL and 30-day BTC realized vol both exist,
          VRP is a 10-day EMA of DVOL / RV, clipped 0.90–1.40. Otherwise 1.12. That
          is “crypto options usually trade above realized,” borrowed from BTC because
          XRP DVOL is thin historically.
        </p>
        <p>
          The sold wing is ATM plus skew: puts add 6 percent times
          ((0.5 − delta) / 0.4)^1.35. A 15-delta put sits about 5 vol points above
          ATM. Calls add 10 percent times the same shape.
        </p>
        <p>
          Fill is conservative: the worse of Black-Scholes at (wing IV minus 2 vol
          points) and mid times one minus a tenor/delta half-spread. The table’s
          “IV sold” is that wing IV. “IV bid” is wing minus 2 points.
        </p>
      </section>

      <p className="chart-cap">
        {data.nPuts} puts, {data.nCalls} calls. {data.nAfterConvert} puts were sold
        the same day a 15-delta put had already converted at 35-delta — those rows
        are washed red. The put that actually hit 35-delta is washed ochre (exit
        15Δ → 35Δ).
      </p>

      <div className="year-row" role="tablist" aria-label="Blotter filter">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            className={filter === f ? "year-btn on" : "year-btn"}
            onClick={() => setFilter(f)}
          >
            {f === "all"
              ? `All ${data.nTrades}`
              : f === "puts"
                ? `Puts ${data.nPuts}`
                : f === "calls"
                  ? `Calls ${data.nCalls}`
                  : `Resold after take ${data.nAfterConvert}`}
          </button>
        ))}
      </div>

      <div className="blot-wrap">
        <table className="blot">
          <thead>
            <tr>
              <th>Sold</th>
              <th>Type</th>
              <th>Δ</th>
              <th>Strike</th>
              <th>Spot</th>
              <th>Qty</th>
              <th>IV sold</th>
              <th>ATM IV</th>
              <th>RV 7d</th>
              <th>BTC VRP</th>
              <th>Exit</th>
              <th>Closed</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className={rowClass(t)}>
                <td>{t.open}</td>
                <td>{t.cp === "P" ? "Put" : "Call"}</td>
                <td>{Math.round(t.delta * 100)}</td>
                <td>{px(t.k)}</td>
                <td>{px(t.spot)}</td>
                <td>{t.qty.toFixed(3)}</td>
                <td>{pct(t.ivWing)}</td>
                <td>{pct(t.ivAtm)}</td>
                <td>{pct(t.rv7)}</td>
                <td>{t.vrp.toFixed(2)}×</td>
                <td>
                  {t.afterConvert ? "New put after take · " : ""}
                  {EXIT[t.exit ?? ""] ?? t.exit}
                </td>
                <td>{t.close ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
