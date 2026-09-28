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

export type BlotterTrade = {
  id: number;
  open: string;
  cp: "P" | "C";
  delta: number;
  qty: number;
  k: number;
  spot: number;
  tenor: number;
  ivAtm: number;
  ivWing: number;
  ivBid: number;
  rv7: number;
  rv30: number;
  vrp: number;
  prem: number;
  creditUsd: number;
  afterConvert: boolean;
  close: string | null;
  closeSpot: number | null;
  exit: string | null;
};

export type BlotterData = {
  sample: string;
  spec: string;
  nTrades: number;
  nPuts: number;
  nCalls: number;
  nAfterConvert: number;
  exits: Record<string, number>;
  iv: { atm: string; wing: string; fill: string; btcVrp: string };
  trades: BlotterTrade[];
};
