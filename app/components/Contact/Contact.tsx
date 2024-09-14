import { FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { FaMeta, FaX } from "react-icons/fa6";
import styles from "./Contact.module.css";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.socialLinks}>
          <Link href="#">
            <FaMeta size={30} />
          </Link>
          <Link href="#">
            <FaInstagram size={30} />
          </Link>
          <Link href="#">
            <FaX size={30} />
          </Link>
          <Link href="#">
            <FaYoutube size={30} />
          </Link>
          <Link href="#">
            <FaGithub size={30} />
          </Link>
        </div>
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
        <span>Copyright &copy;2024 GreenSeal.org</span>
      </div>
    </>
  );
};

export default Contact;
