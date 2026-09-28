"use client";

import { useState } from "react";
import { WheelBlotter } from "@/components/WheelBlotter";
import { WheelChart } from "@/components/WheelChart";
import type { BlotterData, WheelData } from "@/lib/xrp-wheel";

export function WheelDesk({
  chart,
  blotter,
}: {
  chart: WheelData;
  blotter: BlotterData;
}) {
  const [tab, setTab] = useState<"chart" | "blotter">("chart");

  return (
    <div>
      <div className="year-row" role="tablist" aria-label="XRP wheel view">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "chart"}
          className={tab === "chart" ? "year-btn on" : "year-btn"}
          onClick={() => setTab("chart")}
        >
          Chart
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "blotter"}
          className={tab === "blotter" ? "year-btn on" : "year-btn"}
          onClick={() => setTab("blotter")}
        >
          Blotter
        </button>
      </div>
      {tab === "chart" ? <WheelChart data={chart} /> : <WheelBlotter data={blotter} />}
    </div>
  );
}
