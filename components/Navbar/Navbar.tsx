"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";
import { MdOutlineClose, MdOutlineMenu, MdLightMode } from "react-icons/md";
import Link from "next/link";

const Navbar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <nav className={`${styles.sidebar} ${sidebarVisible ? styles.show : ""}`}>
        <ul>
          <li>
            <Link href="#" onClick={toggleSidebar}>
              <MdOutlineClose />
            </Link>
          </li>
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
            <Link href="/search">Explore</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
          <li>
            <Link href="/signup">Sign In/Up</Link>
          </li>
        </ul>
      </nav>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <h1>GreenSeal.org</h1>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/#about">About</Link>
          </li>
          <li>
            <Link href="/news">News</Link>
          </li>
          <li>
            <Link href="/search">Explore</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
          <li>
            <Link href="/signup" className={styles.signInUpButton}>
              Sign In/Up
            </Link>
          </li>
          <li>
            <a href="#">
              <MdLightMode />
            </a>
          </li>
          <li>
            <Link href="#" onClick={toggleSidebar}>
              <MdOutlineMenu />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
