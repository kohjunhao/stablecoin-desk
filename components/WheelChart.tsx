"use client";

import { useMemo, useState } from "react";
import type { WheelData, WheelTake } from "@/lib/xrp-wheel";

const YEARS = ["all", "2021", "2022", "2023", "2024", "2025", "2026"] as const;
const W = 860;
const H = 420;
const PAD = { l: 52, r: 16, t: 18, b: 32 };

function parseDay(d: string) {
  return Date.parse(d + "T00:00:00Z");
}

function fmtPx(n: number) {
  if (n >= 1) return n.toFixed(2);
  return n.toFixed(3);
}

export function WheelChart({ data }: { data: WheelData }) {
  const [year, setYear] = useState<(typeof YEARS)[number]>("all");
  const [sel, setSel] = useState<WheelTake | null>(null);

  const inner = useMemo(() => {
    const spotsF = year === "all" ? data.spot : data.spot.filter((p) => p.d.startsWith(year));
    const takesF = year === "all" ? data.takes : data.takes.filter((t) => t.d.startsWith(year));
    const t0 = parseDay(spotsF[0].d);
    const t1 = parseDay(spotsF[spotsF.length - 1].d);
    const sMin = Math.min(...spotsF.map((p) => p.s));
    const sMax = Math.max(...spotsF.map((p) => p.s));
    const y0 = Math.log(sMin * 0.92);
    const y1 = Math.log(sMax * 1.08);
    const innerW = W - PAD.l - PAD.r;
    const innerH = H - PAD.t - PAD.b;
    const xAt = (d: string) => PAD.l + ((parseDay(d) - t0) / Math.max(t1 - t0, 1)) * innerW;
    const yAt = (s: number) => PAD.t + ((y1 - Math.log(Math.max(s, 1e-8))) / (y1 - y0)) * innerH;
    const path = spotsF
      .map((p, i) => `${i ? "L" : "M"}${xAt(p.d).toFixed(1)},${yAt(p.s).toFixed(1)}`)
      .join(" ");
    const yTicks = [0.25, 0.5, 1, 2, 3].filter((v) => v >= sMin * 0.8 && v <= sMax * 1.2);
    const xTicks =
      year === "all"
        ? ["2021", "2022", "2023", "2024", "2025", "2026"].map((y) => {
            const hit = spotsF.find((p) => p.d.startsWith(y)) ?? spotsF[0];
            return { label: y, x: xAt(hit.d) };
          })
        : ["01-01", "04-01", "07-01", "10-01"].flatMap((md) => {
            const d = `${year}-${md}`;
            const hit = spotsF.find((p) => p.d >= d);
            if (!hit || !hit.d.startsWith(year)) return [];
            const m = hit.d.slice(5, 7);
            const label = { "01": "Jan", "04": "Apr", "07": "Jul", "10": "Oct" }[m] ?? m;
            return [{ label, x: xAt(hit.d) }];
          });
    return { spots: spotsF, takes: takesF, path, xAt, yAt, yTicks, xTicks, sMin, sMax };
  }, [data, year]);

  function nearestTake(clientX: number, svg: SVGSVGElement) {
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * W;
    let best: WheelTake | null = null;
    let bestD = 18;
    for (const t of inner.takes) {
      const dx = Math.abs(inner.xAt(t.d) - x);
      if (dx < bestD) {
        bestD = dx;
        best = t;
      }
    }
    return best;
  }

  return (
    <div>
      <div className="year-row" role="tablist" aria-label="Year">
        {YEARS.map((y) => (
          <button
            key={y}
            type="button"
            role="tab"
            aria-selected={year === y}
            className={year === y ? "year-btn on" : "year-btn"}
            onClick={() => {
              setYear(y);
              setSel(null);
            }}
          >
            {y === "all" ? "2021–26" : y}
          </button>
        ))}
      </div>

      <p className="chart-cap">
        {inner.takes.length} conversion{inner.takes.length === 1 ? "" : "s"} in this window.
        Red dots: 15-delta put marked 35-delta, book bought XRP. Squares: Friday expiry, still ITM
        ({data.nExpiry} in the full sample).
      </p>

      <div className="chart-shell">
        <svg
          className="chart-svg"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="XRP price with put conversion marks"
          onPointerMove={(e) => {
            const hit = nearestTake(e.clientX, e.currentTarget);
            if (hit) setSel(hit);
          }}
          onClick={(e) => {
            const hit = nearestTake(e.clientX, e.currentTarget);
            if (hit) setSel(hit);
          }}
        >
          <line
            x1={PAD.l}
            x2={PAD.l}
            y1={inner.yAt(inner.sMax)}
            y2={inner.yAt(inner.sMin)}
            className="axis"
          />
          <line
            x1={PAD.l}
            x2={W - PAD.r}
            y1={H - PAD.b}
            y2={H - PAD.b}
            className="axis"
          />
          {inner.yTicks.map((v) => (
            <g key={v}>
              <text x={PAD.l - 8} y={inner.yAt(v) + 4} textAnchor="end" className="tick">
                {v >= 1 ? v.toFixed(0) : v}
              </text>
            </g>
          ))}
          {inner.xTicks.map((t) => (
            <text key={t.label} x={t.x} y={H - 8} textAnchor="middle" className="tick">
              {t.label}
            </text>
          ))}
          <path d={inner.path} className="price-line" />
          {sel ? (
            <line
              x1={inner.xAt(sel.d)}
              x2={inner.xAt(sel.d)}
              y1={PAD.t}
              y2={H - PAD.b}
              className="hover-rule"
            />
          ) : null}
          {inner.takes.map((t) => {
            const x = inner.xAt(t.d);
            const y = inner.yAt(t.s);
            const on = sel?.d === t.d && sel.kind === t.kind && sel.k === t.k;
            if (t.kind === "expiry") {
              const s = on ? 7 : 5;
              return (
                <rect
                  key={`${t.d}-exp`}
                  x={x - s / 2}
                  y={y - s / 2}
                  width={s}
                  height={s}
                  className={on ? "mark-exp on" : "mark-exp"}
                />
              );
            }
            return (
              <circle
                key={`${t.d}-${t.k}`}
                cx={x}
                cy={y}
                r={on ? 5 : 3.4}
                className={on ? "mark on" : "mark"}
              />
            );
          })}
        </svg>
      </div>

      <div className="take-readout" aria-live="polite">
        {sel ? (
          <>
            <p className="answer">
              {sel.d} · spot ${fmtPx(sel.s)}
              {sel.k != null ? ` · strike $${fmtPx(sel.k)}` : ""}
            </p>
            <p>
              {sel.kind === "delta35"
                ? "The 15-delta put marked 35-delta. Book bought the XRP (same notional) and closed the put."
                : "Friday expiry, put still in the money. Book took the XRP at the strike."}
              {sel.q != null ? ` Size ${sel.q} XRP.` : ""}
            </p>
          </>
        ) : (
          <p className="muted">Click a red mark. That day is a conversion into spot.</p>
        )}
      </div>

      <h2>Every take</h2>
      <ol className="take-list">
        {inner.takes.map((t) => (
          <li key={`${t.d}-${t.kind}-${t.k}`}>
            <button
              type="button"
              className={sel?.d === t.d && sel.k === t.k ? "take-row on" : "take-row"}
              onClick={() => setSel(t)}
            >
              <span>{t.d}</span>
              <span>${fmtPx(t.s)}</span>
              <span>{t.kind === "delta35" ? "15Δ → 35Δ" : "Friday ITM"}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
