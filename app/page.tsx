import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <main className="container">
      <h1>Custom slider</h1>
      <div>
        <Link className="link" href="/exercise1">
          Exercise 1 - Normal Range
        </Link>
      </div>
      <div>
        <Link className="link" href="/exercise2">
          Exercise 2 - Fixed Values Range{' '}
        </Link>
      </div>
    </main>
  );
};

export default Page;
