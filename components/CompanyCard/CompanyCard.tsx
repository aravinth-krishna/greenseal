import Image from "next/image";

import styles from "./CompanyCard.module.css";

interface CompanyProps {
  name: string;
  logo_src: string;
}

const CompanyCard = ({ name, logo_src }: CompanyProps) => {
  return (
    <>
      <div className={styles.companyCard}>
        <div className={styles.header}>
          <Image
            src={"/orion_icon.jpg"}
            alt="Company logo"
            width={20}
            height={20}
          />
          <h1>{name}</h1>
        </div>
        <div className={styles.body}>
          <p>Rating</p>
        </div>
      </div>
    </>
  );
};

export default CompanyCard;
