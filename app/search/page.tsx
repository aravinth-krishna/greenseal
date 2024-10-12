"use client";

import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./page.module.css";
import SearchResults from "../SearchResults/SearchResults";

const Search = () => {
  const searchParams = useSearchParams();

  const name = searchParams?.get("name") || "";
  const industry = searchParams?.get("industry") || "";

  return (
    <>
      <section className={styles.search}>
        <div className={styles.searchHeader}>
          <SearchBar />
          <div className={styles.searchInfo}>
            <h1>Search results for: {name}</h1>
            <p>{industry}</p>
          </div>
        </div>

        <SearchResults />
      </section>
    </>
  );
};

export default Search;
