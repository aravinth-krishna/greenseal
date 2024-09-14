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
            <a href="#" onClick={toggleSidebar}>
              <MdOutlineClose />
            </a>
          </li>
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
      <nav className={styles.navbar}>
        <ul>
          <li>
            <h1>GreenSeal</h1>
          </li>
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
          <li>
            <a href="#">
              <MdLightMode />
            </a>
          </li>
          <li>
            <a href="#" onClick={toggleSidebar}>
              {" "}
              <MdOutlineMenu />{" "}
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
