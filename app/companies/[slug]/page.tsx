import { notFound } from "next/navigation";
import prisma from "@/lib/prismaClient";
import styles from "./page.module.css";
import Image from "next/image";

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
      <header>
        <Image
          src={company.logo || "/default-logo.png"}
          alt={`${company.name} logo`}
          className={styles.companyLogo}
          width={150}
          height={150}
        />
        <h1 className={styles.companyName}>{company.name}</h1>
        <p className={styles.companyIndustry}>{company.industry}</p>
      </header>

      <section className={styles.overviewSection}>
        <h2>Overview</h2>
        <div className={styles.overviewGrid}>
          <div className={styles.overviewItem}>
            <h3>Environment Score</h3>
            <p>{company.environment_score ?? "N/A"}</p>
          </div>
          <div className={styles.overviewItem}>
            <h3>Environment Grade</h3>
            <p>{company.environment_grade ?? "N/A"}</p>
          </div>
          <div className={styles.overviewItem}>
            <h3>Environment Level</h3>
            <p>{company.environment_level ?? "N/A"}</p>
          </div>
        </div>
      </section>

      <section className={styles.additionalInfo}>
        <h2>Company Details</h2>
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
          <strong>Last Updated:</strong>{" "}
          {company.last_processing_date
            ? new Date(company.last_processing_date).toLocaleDateString()
            : "N/A"}
        </p>
      </section>
    </div>
  );
}
