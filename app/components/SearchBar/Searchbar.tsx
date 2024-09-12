"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
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
        <button className={styles.button}>
          <FaSearch size={20} />
        </button>
      </form>
    </>
  );
};

export default SearchBar;
