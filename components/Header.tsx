"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const path = usePathname();
  return (
    <header className="mast">
      <div className="wide mast-inner">
        <Link className="brand" href="/">
          Stablecoin desk <span>issue / resell</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <Link href="/" aria-current={path === "/" ? "page" : undefined}>
            Eight currencies
          </Link>
          <Link
            href="/issue-vs-resell"
            aria-current={path === "/issue-vs-resell" ? "page" : undefined}
          >
            Issue vs resell
          </Link>
        </nav>
      </div>
    </header>
  );
}
