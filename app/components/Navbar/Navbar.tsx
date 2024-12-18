import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../public/mango-logo.png';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.border}>
      <div className={`${styles.wrapper} ${styles.flex}`}>
        <div>
          <Link href="/" className={styles.imgWrapper}>
            <Image
              src={Logo}
              alt="Mango logo"
              width={70}
              quality={100}
              placeholder="blur"
            />
          </Link>
        </div>

        <ul className={styles.list}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/exercise1">Exercise 1</Link>
          </li>
          <li>
            <Link href="/exercise2">Exercise </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
