import { FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { FaMeta, FaX } from "react-icons/fa6";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.socialLinks}>
          <a href="#">
            <FaMeta size={30} />
          </a>
          <a href="#">
            <FaInstagram size={30} />
          </a>
          <a href="#">
            <FaX size={30} />
          </a>
          <a href="#">
            <FaYoutube size={30} />
          </a>
          <a href="#">
            <FaGithub size={30} />
          </a>
        </div>
        <nav className={styles.bottomNav}>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/featured">Featured</a>
            </li>
            <li>
              <a href="/explore">Explore</a>
            </li>
            <li>
              <a href="/report">Report</a>
            </li>
          </ul>
        </nav>
        <span>Copyright &copy;2024 GreenSeal</span>
      </div>
    </>
  );
};

export default Contact;
