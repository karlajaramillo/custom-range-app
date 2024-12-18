import Navbar from './components/Navbar/Navbar';
import './styles/globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '600'],
});

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
      <body className={poppins.className}>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
