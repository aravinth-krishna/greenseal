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
    "Auto Components",
    "Trading Companies and Distributors",
    "Energy",
    "Industrial Conglomerates",
    "Metals & Mining",
    "Real Estate",
    "Marine",
    "Construction",
    "Media",
    "Hotels, Restaurants & Leisure",
    "Tobacco",
    "Distributors",
    "Road and Rail",
    "Machinery",
    "Financial Services",
    "Hotels Restaurants and Leisure",
    "Textiles Apparel and Luxury Goods",
    "Metals and Mining",
    "Retail",
    "Insurance",
    "Electrical Equipment",
    "Aerospace & Defense",
    "Commercial Services and Supplies",
    "Leisure Products",
    "Chemicals",
    "Packaging",
    "Automobiles",
    "Technology",
    "Beverages",
    "Banking",
    "Health Care",
    "Communications",
    "Building",
    "Airlines",
    "Utilities",
    "Life Sciences Tools and Services",
    "Biotechnology",
    "Consumer products",
    "Aerospace and Defense",
    "Telecommunication",
    "Semiconductors",
    "Food Products",
    "Logistics and Transportation",
    "Diversified Consumer Services",
    "Pharmaceuticals",
    "Professional Services",
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
