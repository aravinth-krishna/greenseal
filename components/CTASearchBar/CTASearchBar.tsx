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
