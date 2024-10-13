import Image from "next/image";
import styles from "./CompanyCard.module.css";

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
    <>
      <div className={styles.companyCard}>
        <div className={styles.header}>
          <Image src={logo_src} alt="Company logo" width={50} height={50} />
          <h1>{name}</h1>
          <h2>{industry}</h2>
        </div>
        <div className={styles.body}>
          <p>Environment Grade | {environment_grade}</p>
          <p>Environment Level | {environment_level}</p>
          <p>Environment score | {environment_score}</p>
        </div>
      </div>
    </>
  );
};

export default CompanyCard;
