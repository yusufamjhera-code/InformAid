import Link from 'next/link';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            InformAid
          </Link>
          <div className={styles.navLinks}>
            <Link href="/schemes">Schemes</Link>
            <Link href="/disability-types">Disability Types</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>© 2024 InformAid. All rights reserved.</p>
      </footer>
    </div>
  );
} 
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            InformAid
          </Link>
          <div className={styles.navLinks}>
            <Link href="/schemes">Schemes</Link>
            <Link href="/disability-types">Disability Types</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>© 2024 InformAid. All rights reserved.</p>
      </footer>
    </div>
  );
} 