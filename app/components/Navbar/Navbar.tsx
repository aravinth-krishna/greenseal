"use client";

import { useState } from "react";
import styles from "./Navbar.module.css";
import { MdOutlineClose, MdOutlineMenu, MdLightMode } from "react-icons/md";

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
      <nav className={styles.navbar}>
        <ul>
          <li>
            <h1>GreenSeal</h1>
          </li>
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
