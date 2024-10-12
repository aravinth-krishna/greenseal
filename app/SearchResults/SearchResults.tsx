"use client";

import { useState, useEffect } from "react";
import CompanyCard from "@/components/CompanyCard/CompanyCard";
import styles from "./SearchResults.module.css";

interface Company {
  id: string;
  name?: string;
  logo?: string;
}

const SearchResults = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/getCompanyData");
        if (!res.ok) {
          throw new Error("Failed to fetch companies");
        }
        const companies = await res.json();
        setCompanies(companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.searchResults}>
      {companies.map((company: Company) => (
        <CompanyCard
          key={company.id}
          name={company.name ?? ""}
          logo_src={company.logo ?? ""}
        />
      ))}
    </div>
  );
};

export default SearchResults;
