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
          <img src={logo_src} alt="Company logo" width={50} height={50} />
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
