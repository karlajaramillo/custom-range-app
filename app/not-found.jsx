import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="text-center container">
      <h2 className="">There was a problem</h2>
      <p>We could not find the page you were looking for.</p>
      <p>
        Go back to the <Link href={'/'}>Range</Link>
      </p>
    </main>
  );
}
