import type { Metadata } from "next";
import raw from "@/data/xrp-wheel.json";
import { WheelChart } from "@/components/WheelChart";
import type { WheelData } from "@/lib/xrp-wheel";

const data = raw as WheelData;

export const metadata: Metadata = {
  title: "XRP wheel — 15Δ to 35Δ takes",
  description:
    "XRP spot with every day the weekly 15-delta put marked 35-delta and converted into coins.",
};

export default function XrpWheelPage() {
  return (
    <main id="main" className="page">
      <div className="wide">
        <p className="kicker">Backtest · {data.sample}</p>
        <h1>When the 15-delta put became a 35-delta put, the book bought XRP.</h1>
        <p className="lede" style={{ maxWidth: "42rem" }}>
          Weekly 15-delta puts on 5 percent of XRP-NAV. Red marks are conversions
          into spot: close the put, buy the coins. {data.nDelta35} of {data.nTakes}{" "}
          hits were the 35-delta rule. {data.nExpiry} waited until Friday and were
          still in the money. Log scale.
        </p>
        <p className="note">
          Same spec as the wheel that printed 13.1 percent annualized XRP-NAV with
          a 4.8 percent max drawdown on this window (25-delta calls on extra coins
          only). Not a live book. Not advice.
        </p>
        <WheelChart data={data} />
      </div>
    </main>
  );
}
