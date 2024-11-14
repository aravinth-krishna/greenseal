import Image from "next/image";
import styles from "./CompanyCard.module.css";
import CircularProgressBar from "../CircularProgressBar/CircularProgressBar";
import EnvironmentalBadge from "../EnvironmentalBadge/EnvironmentalBadge";
import LevelIndicator from "../LevelIndicator/LevelIndicator";
import Link from "next/link";

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
  return (
    <div className={styles.companyCard}>
      <div className={styles.header}>
        <Image src={logo_src} alt="Company logo" width={50} height={50} />
        <h1>{name}</h1>
      </div>
      <div className={styles.body}>
        <h2>{industry}</h2>

        <div className={styles.sectionMiddle}>
          <div className={styles.sectionLeft}>
            Grade
            <EnvironmentalBadge grade={environment_grade} />
            Level
            <LevelIndicator level={environment_level} />
          </div>
          <div className={styles.sectionRight}>
            <CircularProgressBar score={environment_score} />
          </div>
        </div>

        <Link href={`/companies/${name}`} className={styles.learnMoreButton}>
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default CompanyCard;
