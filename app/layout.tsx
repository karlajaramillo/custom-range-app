import 'styles/globals.css';

export const metadata = {
  title: 'Custom Range App',
  description: 'Custom range component app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
