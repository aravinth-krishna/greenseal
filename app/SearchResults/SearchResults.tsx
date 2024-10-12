import CompanyCard from "@/components/CompanyCard/CompanyCard";
import styles from "./SearchResults.module.css";
import companies from "@/pages/api/getCompanies";

const SearchResults = async () => {
  return (
    <>
      <div className={styles.searchResults}>
        {(await companies()).map((company) => (
          <CompanyCard key={company.id} name={company.name} logo_src={""} />
        ))}
      </div>
    </>
  );
};

export default SearchResults;
