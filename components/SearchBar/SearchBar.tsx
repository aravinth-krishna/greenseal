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
    "Aerospace and Defense",
    "Airlines",
    "Auto Components",
    "Automobiles",
    "Banking",
    "Beverages",
    "Biotechnology",
    "Building",
    "Chemicals",
    "Commercial Services and Supplies",
    "Communications",
    "Consumer products",
    "Construction",
    "Distributors",
    "Diversified Consumer Services",
    "Electrical Equipment",
    "Energy",
    "Financial Services",
    "Food Products",
    "Health Care",
    "Hotels Restaurants and Leisure",
    "Hotels, Restaurants & Leisure",
    "Industrial Conglomerates",
    "Insurance",
    "Leisure Products",
    "Life Sciences Tools and Services",
    "Logistics and Transportation",
    "Machinery",
    "Marine",
    "Media",
    "Metals & Mining",
    "Metals and Mining",
    "Packaging",
    "Pharmaceuticals",
    "Professional Services",
    "Real Estate",
    "Retail",
    "Road and Rail",
    "Semiconductors",
    "Technology",
    "Telecommunication",
    "Textiles Apparel and Luxury Goods",
    "Tobacco",
    "Trading Companies and Distributors",
    "Utilities",
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
              name: query || undefined,
              industry: industry === "All" ? undefined : industry,
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
