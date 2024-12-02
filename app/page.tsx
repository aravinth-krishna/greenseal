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
      <section className={styles.about} id="about">
        <h2 className={styles.aboutHeading}>About the Project</h2>
        <div className={styles.aboutContent}>
          <div className={styles.aboutFeature}>
            <h3>🌿 Our Mission</h3>
            <p>
              Our mission is to raise awareness about environmental issues and
              foster collective action. We provide tools and data to empower
              individuals and organizations to make sustainable choices.
            </p>
          </div>
          <div className={styles.aboutFeature}>
            <h3>📊 Transparency Matters</h3>
            <p>
              Access detailed insights on corporate sustainability, emissions,
              and environmental impact. Our platform promotes accountability
              through easy access to reliable data.
            </p>
          </div>
          <div className={styles.aboutFeature}>
            <h3>🤝 Join the Movement</h3>
            <p>
              Collaborate with like-minded individuals and organizations to
              drive meaningful change. Report, share, and engage to amplify
              sustainability efforts globally.
            </p>
          </div>
          <div className={styles.aboutFeature}>
            <h3>🔍 Make Informed Choices</h3>
            <p>
              Leverage our verified data to make better decisions. Discover
              actionable insights to adopt environmentally friendly practices in
              daily life.
            </p>
          </div>
        </div>
        <div className={styles.dataExplanation}>
          <h3 className={styles.dataHeading}>How We Gather Data</h3>
          <p>
            We rely on{" "}
            <strong>ESG (Environmental, Social, and Governance)</strong> public
            data, which is sourced from highly credible organizations, including
            government reports, environmental agencies, and corporate
            disclosures. This data is thoroughly verified to ensure accuracy and
            transparency.
          </p>
          <p>
            Our News page aggregates the latest environmental articles and
            updates from the <strong>News API</strong>, which pulls information
            from a wide range of trustworthy sources worldwide. This ensures
            users stay informed with timely and reliable news.
          </p>
          <p>
            By combining advanced data aggregation techniques with a commitment
            to transparency, we empower users to make well-informed decisions
            and drive impactful environmental action.
          </p>
        </div>
      </section>
    </>
  );
}
