export type Status =
  | "issue-licensed"
  | "issue-pending"
  | "sandbox"
  | "trade-only"
  | "issue-blocked";

export type Source = {
  title: string;
  url: string;
  date: string;
};

export type Currency = {
  slug: string;
  code: string;
  name: string;
  place: string;
  status: Status;
  verdict: string;
  regulated: string;
  issue: {
    answer: string;
    body: string;
    steps: string[];
  };
  resell: {
    answer: string;
    body: string;
    catch: string;
  };
  watch: string[];
  sources: Source[];
};
