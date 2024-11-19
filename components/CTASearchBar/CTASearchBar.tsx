"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./CTASearchBar.module.css";
import { FaSearch, FaFilter } from "react-icons/fa";
import { MdOutlineSearch } from "react-icons/md";

const CTASearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get("name") || "");
  const [industry, setIndustry] = useState(
    searchParams?.get("industry") || "All"
  );

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    const ind = params.get("industry");
    if (name) setQuery(name);
    if (ind) setIndustry(ind);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchParams = new URLSearchParams({
      name: query,
      industry: industry === "All" ? "" : industry,
    }).toString();

    router.replace(`/search?${searchParams}`, { scroll: false });
  };

  return (
    <>
      <form className={styles.searchBar} onSubmit={handleSearch}>
        <MdOutlineSearch className={styles.searchIcon} size={28} />

        <input
          className={styles.input}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

        <button type="submit" className={styles.button}>
          <FaSearch size={20} />
        </button>
      </form>
    </>
  );
};

export default CTASearchBar;
