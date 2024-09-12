"use client";

import { motion } from "framer-motion";
import styles from "./CTAButton.module.css";

const CTAButton = () => {
  return (
    <>
      <motion.button
        className={styles.ctaButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Explore Companies
      </motion.button>
    </>
  );
};

export default CTAButton;