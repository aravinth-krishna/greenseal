import CTAButton from "../components/CTAButton/CTAButton";
import CTASearchBar from "../components/CTASearchBar/CTASearchBar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Track Corporate Environmental Impact</h1>
        <p className={styles.subheading}>
          Discover how corporations are affecting the environment and hold them
          accountable.
        </p>
        <div className={styles.action}>
          <CTASearchBar />
          <p> - or - </p>
          <CTAButton />
        </div>
      </section>
    </>
  );
}
