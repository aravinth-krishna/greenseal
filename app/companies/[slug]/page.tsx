// app/companies/[slug]/page.tsx

import { notFound } from "next/navigation";
import prisma from "@/lib/prismaClient";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

interface CompanyProps {
  params: {
    slug: string;
  };
}

export default async function CompanyPage({ params }: CompanyProps) {
  const decodedName = decodeURIComponent(params.slug);

  const company = await prisma.company.findFirst({
    where: { name: decodedName },
  });

  if (!company) {
    notFound();
  }

  return (
    <div className={styles.companyContainer}>
      <header className={styles.headerSection}>
        <Image
          src={company.logo || "/default-logo.png"}
          alt={`${company.name} logo`}
          className={styles.companyLogo}
          width={150}
          height={150}
        />
        <h1 className={styles.companyName}>{company.name}</h1>
        <p className={styles.companyIndustry}>{company.industry}</p>
        <p className={styles.companyExchange}>
          {company.exchange} ({company.ticker})
        </p>
      </header>

      <section className={styles.overviewSection}>
        <h2>ESG Overview</h2>
        <div className={styles.overviewGrid}>
          {/* Environment Section */}
          <div className={styles.overviewItem}>
            <h3>Environment</h3>
            <p>
              <strong>Score:</strong> {company.environment_score ?? "N/A"}
            </p>
            <p>
              <strong>Grade:</strong> {company.environment_grade ?? "N/A"}
            </p>
            <p>
              <strong>Level:</strong> {company.environment_level ?? "N/A"}
            </p>
          </div>

          {/* Social Section */}
          <div className={styles.overviewItem}>
            <h3>Social</h3>
            <p>
              <strong>Score:</strong> {company.social_score ?? "N/A"}
            </p>
            <p>
              <strong>Grade:</strong> {company.social_grade ?? "N/A"}
            </p>
            <p>
              <strong>Level:</strong> {company.social_level ?? "N/A"}
            </p>
          </div>

          {/* Governance Section */}
          <div className={styles.overviewItem}>
            <h3>Governance</h3>
            <p>
              <strong>Score:</strong> {company.governance_score ?? "N/A"}
            </p>
            <p>
              <strong>Grade:</strong> {company.governance_grade ?? "N/A"}
            </p>
            <p>
              <strong>Level:</strong> {company.governance_level ?? "N/A"}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.additionalInfo}>
        <h2>Additional Information</h2>
        <p>
          <strong>Website:</strong>{" "}
          <a
            href={company.web_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {company.web_url || "N/A"}
          </a>
        </p>
        <p>
          <strong>Total ESG Score:</strong> {company.total_score ?? "N/A"}
        </p>
        <p>
          <strong>Overall Grade:</strong> {company.total_grade ?? "N/A"}
        </p>
        <p>
          <strong>Last Updated:</strong>{" "}
          {company.last_processing_date
            ? new Date(company.last_processing_date).toLocaleDateString()
            : "N/A"}
        </p>
      </section>
      <Link href="/search">
        <button className={styles.backButton}>← Back to Explore</button>
      </Link>
    </div>
  );
}
