import type { Metadata } from "next";
import blotterRaw from "@/data/xrp-blotter.json";
import chartRaw from "@/data/xrp-wheel.json";
import { WheelDesk } from "@/components/WheelDesk";
import type { BlotterData, WheelData } from "@/lib/xrp-wheel";

const chart = chartRaw as WheelData;
const blotter = blotterRaw as BlotterData;

export const metadata: Metadata = {
  title: "XRP wheel — chart and blotter",
  description:
    "Every XRP put and call in the wheel backtest, with synthetic IV, and marks when a 15-delta put converted at 35-delta and a new put was sold.",
};

export default function XrpWheelPage() {
  return (
    <main id="main" className="page">
      <div className="wide">
        <p className="kicker">Backtest · {chart.sample}</p>
        <h1>XRP wheel — chart and trade blotter</h1>
        <p className="lede" style={{ maxWidth: "42rem" }}>
          Weekly 15-delta puts on 5 percent of XRP-NAV. Convert to spot at 35-delta
          (red). 25-delta calls only on extra coins; green is when those calls
          delivered and sold the excess down. {blotter.nTrades} option sales.
        </p>
        <p className="note">
          Synthetic IV, not a Deribit XRP print. Not a live book. Not advice.
        </p>
        <WheelDesk chart={chart} blotter={blotter} />
      </div>
    </main>
  );
}
