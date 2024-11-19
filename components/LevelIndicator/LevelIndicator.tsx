import styles from "./LevelIndicator.module.css";

interface LevelIndicatorProps {
  level: string;
}

const LevelIndicator = ({ level }: LevelIndicatorProps) => {
  const formattedLevel = level.toLowerCase();

  return (
    <div className={`${styles.levelIndicator} ${styles[formattedLevel]}`}>
      {level}
    </div>
  );
};

export default LevelIndicator;
