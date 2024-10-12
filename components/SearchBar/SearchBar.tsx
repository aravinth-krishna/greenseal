"use client";

import { useState } from "react";
import Link from "next/link";
import { FaFilter, FaSearch } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All");
  const industries = [
    "All",
    "Automotive",
    "Energy",
    "Technology",
    "Manufacturing",
    "Retail",
    "Healthcare",
  ];

  return (
    <>
      <div className={styles.searchBar}>
        <MdOutlineSearch className={styles.searchIcon} size={28} />

        <input
          className={styles.input}
          type="text"
          value={query}
          onChange={(e) => {
            console.log("Query: ", e.target.value);
            setQuery(e.target.value);
          }}
          placeholder="Search Companies..."
        />

        <div className={styles.dropdownContainer}>
          <FaFilter className={styles.filterIcon} size={20} />
          <select
            className={styles.dropdown}
            value={industry}
            onChange={(e) => {
              console.log("Industry: ", e.target.value);
              setIndustry(e.target.value);
            }}
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
              name: query || undefined, // Avoid sending empty query
              industry: industry === "All" ? undefined : industry, // Avoid sending "All" in the query
            },
          }}
          as={`/search?name=${encodeURIComponent(
            query
          )}&industry=${encodeURIComponent(
            industry === "All" ? "" : industry
          )}`}
        >
          <FaSearch size={20} />
        </Link>
      </div>
    </>
  );
};

export default SearchBar;
