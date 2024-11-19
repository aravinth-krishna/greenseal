"use client";

import { motion } from "framer-motion";
import styles from "./CTAButton.module.css";
import Link from "next/link";

const CTAButton = () => {
  return (
    <>
      <Link
        href={{
          pathname: "/community",
        }}
      >
        <motion.button
          className={styles.ctaButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Explore Community
        </motion.button>
      </Link>
    </>
  );
};

export default CTAButton;
