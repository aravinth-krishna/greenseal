"use client";

import { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import styles from "./SearchBar.module.css";
import Link from "next/link";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");

  const industries = [
    "All",
    "Energy",
    "Technology",
    "Manufacturing",
    "Retail",
    "Healthcare",
  ];

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

        <div className={styles.dropdownContainer}>
          <FaFilter className={styles.filterIcon} size={20} />
          <select
            className={styles.dropdown}
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <Link
          className={styles.button}
          href={{
            pathname: "/search",
            query: {
              name: query,
              industry: industry === "All" ? "" : industry,
            },
          }}
        >
          <FaSearch size={20} />
        </Link>
      </form>
    </>
  );
};

export default SearchBar;
