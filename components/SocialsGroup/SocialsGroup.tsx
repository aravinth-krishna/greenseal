import { FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import { FaMeta, FaX } from "react-icons/fa6";
import styles from "./SocialsGroup.module.css";
import Link from "next/link";

const SocialsGroup = () => {
  return (
    <>
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
    </>
  );
};

export default SocialsGroup;
