import styles from "./LevelIndicator.module.css";

interface LevelIndicatorProps {
  level: string;
}

const LevelIndicator = ({ level }: LevelIndicatorProps) => {
  const formattedLevel = level.toLowerCase();

  return (
    <div className={`${styles.levelIndicator} ${styles[formattedLevel]}`}>
      <span>{level}</span>
    </div>
  );
};

export default LevelIndicator;
