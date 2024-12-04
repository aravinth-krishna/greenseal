import { useState } from "react";
import Image from "next/image";
import styles from "./CompanyCard.module.css";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";
import EnvironmentalBadge from "../EnvironmentalBadge/EnvironmentalBadge";
import LevelIndicator from "../LevelIndicator/LevelIndicator";

interface CompanyProps {
  name: string;
  logo_src: string;
  industry: string;
  environment_score: number;
  environment_level: string;
  environment_grade: string;
}

const CompanyCard = ({
  name,
  logo_src,
  industry,
  environment_score,
  environment_level,
  environment_grade,
}: CompanyProps) => {
  const [loading, setLoading] = useState(false);

  const handleLearnMoreClick = async () => {
    setLoading(true);
    try {
      window.location.href = `/companies/${name}`;
    } catch (error) {
      console.error("Error loading company details", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.companyCard}>
      <div className={styles.header}>
        <Image src={logo_src} alt={`${name} logo`} width={50} height={50} />
        <h1>{name}</h1>
      </div>

      <div className={styles.body}>
        <h2>{industry}</h2>

        <div className={styles.sectionMiddle}>
          <div className={styles.sectionLeft}>
            <p>Grade</p>
            <EnvironmentalBadge grade={environment_grade} />
            <p>Level</p>
            <LevelIndicator level={environment_level} />
          </div>
          <div className={styles.sectionRight}>
            <CircularProgressBar score={environment_score} />
          </div>
        </div>

        <button
          onClick={handleLearnMoreClick}
          className={styles.learnMoreButton}
          disabled={loading}
        >
          {loading ? "Loading..." : "Learn More"}
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
