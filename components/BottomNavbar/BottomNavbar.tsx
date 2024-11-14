import Link from "next/link";
import styles from "./BottomNavbar.module.css";

const BottomNavbar = () => {
  return (
    <>
      <nav className={styles.bottomNav}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/news">News</Link>
          </li>
          <li>
            <Link href="/explore">Explore</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BottomNavbar;
