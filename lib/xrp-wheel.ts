export type WheelTake = {
  d: string;
  s: number;
  k: number | null;
  q: number | null;
  kind: "delta35" | "expiry";
};

export type WheelData = {
  sample: string;
  spec: string;
  nTakes: number;
  nDelta35: number;
  nExpiry: number;
  annYield: number;
  maxDd: number;
  spot: { d: string; s: number }[];
  takes: WheelTake[];
};
