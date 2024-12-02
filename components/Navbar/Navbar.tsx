"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
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
            <Link href="/login">Sign In</Link>
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
            <Link href="/login" className={styles.signInButton}>
              Sign In
            </Link>
          </li>
          <li>
            <a href="/dashboard">
              <CgProfile size={25} />
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
