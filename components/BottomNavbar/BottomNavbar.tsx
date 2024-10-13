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
            <Link href="/featured">Featured</Link>
          </li>
          <li>
            <Link href="/explore">Explore</Link>
          </li>
          <li>
            <Link href="/report">Report</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default BottomNavbar;
