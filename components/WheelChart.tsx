"use client";

import { useMemo, useState } from "react";
import type { WheelData, WheelMark } from "@/lib/xrp-wheel";

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
  const [sel, setSel] = useState<WheelMark | null>(null);

  const inner = useMemo(() => {
    const spotsF = year === "all" ? data.spot : data.spot.filter((p) => p.d.startsWith(year));
    const marks: WheelMark[] = [
      ...(year === "all" ? data.takes : data.takes.filter((t) => t.d.startsWith(year))).map(
        (t) => ({ ...t, side: "put" as const }),
      ),
      ...(year === "all" ? data.covers : data.covers.filter((t) => t.d.startsWith(year))).map(
        (t) => ({ ...t, side: "call" as const }),
      ),
    ].sort((a, b) => a.d.localeCompare(b.d) || a.side.localeCompare(b.side));
    const t0 = parseDay(spotsF[0].d);
    const t1 = parseDay(spotsF[spotsF.length - 1].d);
    const sMin = Math.min(...spotsF.map((p) => p.s));
    const sMax = Math.max(...spotsF.map((p) => p.s));
    const y0 = Math.log(sMin * 0.92);
    const y1 = Math.log(sMax * 1.08);
    const innerW = W - PAD.l - PAD.r;
    const innerH = H - PAD.t - PAD.b;
    const xAt = (d: string, side?: "put" | "call") => {
      const base = PAD.l + ((parseDay(d) - t0) / Math.max(t1 - t0, 1)) * innerW;
      if (side === "put") return base - 3.5;
      if (side === "call") return base + 3.5;
      return base;
    };
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
            const mth = hit.d.slice(5, 7);
            const label = { "01": "Jan", "04": "Apr", "07": "Jul", "10": "Oct" }[mth] ?? mth;
            return [{ label, x: xAt(hit.d) }];
          });
    const nPut = marks.filter((m) => m.side === "put").length;
    const nCall = marks.filter((m) => m.side === "call").length;
    return { marks, path, xAt, yAt, yTicks, xTicks, sMin, sMax, nPut, nCall };
  }, [data, year]);

  function nearestMark(clientX: number, clientY: number, svg: SVGSVGElement) {
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * W;
    const y = ((clientY - rect.top) / rect.height) * H;
    let best: WheelMark | null = null;
    let bestD = 22;
    for (const t of inner.marks) {
      const dx = inner.xAt(t.d, t.side) - x;
      const dy = inner.yAt(t.s) - y;
      const dist = Math.hypot(dx, dy);
      if (dist < bestD) {
        bestD = dist;
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
        <span className="swatch put" /> Red: 15-delta put hit 35-delta, converted to spot (
        {inner.nPut} here, {data.nTakes} full sample).
        <span className="swatch call" /> Green: call on extra XRP delivered, excess sold down (
        {inner.nCall} here, {data.nCovers} full sample). Log scale.
      </p>

      <div className="chart-shell">
        <svg
          className="chart-svg"
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="XRP price with put conversions in red and call delevers in green"
          onPointerMove={(e) => {
            const hit = nearestMark(e.clientX, e.clientY, e.currentTarget);
            if (hit) setSel(hit);
          }}
          onClick={(e) => {
            const hit = nearestMark(e.clientX, e.clientY, e.currentTarget);
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
          {inner.marks.map((t) => {
            const x = inner.xAt(t.d, t.side);
            const y = inner.yAt(t.s);
            const on = sel?.d === t.d && sel.side === t.side && sel.k === t.k;
            const cls = `${t.side === "call" ? "mark-call" : "mark-put"}${on ? " on" : ""}`;
            if (t.kind === "expiry") {
              const s = on ? 7 : 5;
              return (
                <rect
                  key={`${t.side}-${t.d}-${t.k}-exp`}
                  x={x - s / 2}
                  y={y - s / 2}
                  width={s}
                  height={s}
                  className={cls}
                />
              );
            }
            return (
              <circle
                key={`${t.side}-${t.d}-${t.k}`}
                cx={x}
                cy={y}
                r={on ? 5 : 3.4}
                className={cls}
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
              {sel.side === "put"
                ? sel.kind === "delta35"
                  ? "15-delta put marked 35-delta. Book bought the XRP and closed the put."
                  : "Friday expiry, put still in the money. Book took the XRP at the strike."
                : sel.kind === "delta35"
                  ? "Call on extra XRP marked 35-delta. Book delivered excess coins at the strike — delevered."
                  : "Friday expiry, call in the money. Excess XRP delivered at the strike."}
              {sel.q != null ? ` Size ${sel.q} XRP.` : ""}
            </p>
          </>
        ) : (
          <p className="muted">Click a mark. Red is a put take. Green is a call that sold down extra XRP.</p>
        )}
      </div>

      <h2>Every mark</h2>
      <ol className="take-list">
        {inner.marks.map((t) => (
          <li key={`${t.side}-${t.d}-${t.kind}-${t.k}`}>
            <button
              type="button"
              className={
                sel?.d === t.d && sel.side === t.side && sel.k === t.k
                  ? `take-row ${t.side} on`
                  : `take-row ${t.side}`
              }
              onClick={() => setSel(t)}
            >
              <span>{t.d}</span>
              <span>${fmtPx(t.s)}</span>
              <span>
                {t.side === "put"
                  ? t.kind === "delta35"
                    ? "Put 15Δ → 35Δ · bought spot"
                    : "Put Friday ITM · bought spot"
                  : t.kind === "delta35"
                    ? "Call 35Δ · sold excess"
                    : "Call Friday ITM · sold excess"}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
