"use client";

import { useState } from "react";
import styles from "./CTASearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";

const CTASearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <>
      <form className={styles.searchBar}>
        <MdOutlineSearch className={styles.searchIcon} size={28} />
        <input
          className={styles.input}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          placeholder="Search Companies..."
        />
        <Link
          className={styles.button}
          href={{
            pathname: "/search",
            query: { name: query },
          }}
        >
          <FaSearch size={20} />
        </Link>
      </form>
    </>
  );
};

export default CTASearchBar;
