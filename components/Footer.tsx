import { AS_OF } from "@/lib/currencies";

export function Footer() {
  return (
    <footer className="foot">
      <div className="wide foot-inner">
        <p>Desk compiled {AS_OF}. Not legal advice. Statutes move.</p>
        <p>Sources sit at the bottom of each currency page.</p>
      </div>
    </footer>
  );
}
