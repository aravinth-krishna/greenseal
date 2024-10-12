import CTAButton from "../CTAButton/CTAButton";
import CTASearchBar from "../CTASearchBar/CTASearchBar";
import styles from "./Hero.module.css";

const Hero = () => {
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
};

export default Hero;
