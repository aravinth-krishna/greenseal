"use client";

import { useSearchParams } from "next/navigation";
import CompanyCard from "../components/CompanyCard/CompanyCard";
import SearchBar from "../components/SearchBar/SearchBar";
import styles from "./page.module.css";

const Search = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const industry = searchParams.get("industry");

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

        <div className={styles.searchResults}>
          <CompanyCard name="Apple" logo_src="" rating={5} />
          <CompanyCard name="Apple" logo_src="" rating={5} />
        </div>
      </section>
    </>
  );
};

export default Search;
