import Image from "next/image";

import styles from "./CompanyCard.module.css";

interface CompanyProps {
  name: string;
  logo_src: string;
  rating: number;
}

const CompanyCard = ({ name, logo_src, rating }: CompanyProps) => {
  return (
    <>
      <div className={styles.companyCard}>
        <h1>{name}</h1>
        <Image src={logo_src} alt="Company logo" />
        <p>Rating: {rating}</p>
      </div>
    </>
  );
};

export default CompanyCard;
