import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page">
      <div className="wrap">
        <h1>That page is not on this desk.</h1>
        <p>
          <Link href="/">Eight currencies</Link>
        </p>
      </div>
    </main>
  );
}
