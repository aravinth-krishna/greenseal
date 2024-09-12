import CompanyCard from "../components/CompanyCard/CompanyCard";
import SearchBar from "../components/SearchBar/SearchBar";
import styles from "./page.module.css";

const search = () => {
  return (
    <>
      <section className={styles.search}>
        <div className={styles.searchHeader}>
          <SearchBar />
        </div>

        <div className={styles.searchResults}>
          <CompanyCard name="Apple" logo_src="" rating={5} />
          <CompanyCard name="Apple" logo_src="" rating={5} />
          <CompanyCard name="Apple" logo_src="" rating={5} />
          <CompanyCard name="Apple" logo_src="" rating={5} />
          <CompanyCard name="Apple" logo_src="" rating={5} />
        </div>
      </section>
    </>
  );
};

export default search;
