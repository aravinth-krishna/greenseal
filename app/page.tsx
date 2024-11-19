import CTAButton from "../components/CTAButton/CTAButton";
import CTASearchBar from "../components/CTASearchBar/CTASearchBar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Accountability Begins with Awareness</h1>
        <p className={styles.subheading}>
          Join the Movement for Environmental Responsibility.
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
