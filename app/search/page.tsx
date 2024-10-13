"use client";

import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "./page.module.css";
import SearchResults from "../../components/SearchResults/SearchResults";

const Search = () => {
  const searchParams = useSearchParams();

  const name = searchParams?.get("name") || "";
  const industry = searchParams?.get("industry") || "All";

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

        <SearchResults name={name} industry={industry} />
      </section>
    </>
  );
};

export default Search;
