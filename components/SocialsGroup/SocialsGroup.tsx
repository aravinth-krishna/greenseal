import { FaGlobe, FaGithub, FaLinkedin } from "react-icons/fa";
import styles from "./SocialsGroup.module.css";
import Link from "next/link";

const SocialsGroup = () => {
  return (
    <>
      <div className={styles.socialLinks}>
        <Link href="https://www.linkedin.com/in/aravinth-krishna-dev">
          <FaLinkedin size={30} />
        </Link>
        <Link href="https://greenseal.org">
          <FaGlobe size={30} />
        </Link>
        <Link href="https://github.com/aravinth-krishna/greenseal">
          <FaGithub size={30} />
        </Link>
      </div>
    </>
  );
};

export default SocialsGroup;
