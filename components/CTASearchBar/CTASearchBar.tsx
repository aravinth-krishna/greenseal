"use client";

import { useState } from "react";
import styles from "./CTASearchBar.module.css";
import { FaSearch, FaFilter } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";
import Link from "next/link";

const CTASearchBar = () => {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");

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
    "Energy",
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

export default CTASearchBar;
