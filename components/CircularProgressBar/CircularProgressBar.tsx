import styles from "./CircularProgressBar.module.css";

interface CircularProgressBarProps {
  score: number;
}

const CircularProgressBar = ({ score }: CircularProgressBarProps) => {
  const normalizedScore = Math.min(Math.max(score, 0), 1000) / 10;
  const circleRadius = 50;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className={styles.circularProgressBar}>
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          strokeWidth="10"
          className={styles.backgroundCircle}
        />
        <circle
          cx="60"
          cy="60"
          r={circleRadius}
          strokeWidth="10"
          className={styles.progressCircle}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className={styles.scoreText}>
        {score}
        <br />
        <span>Score</span>
      </div>
    </div>
  );
};

export default CircularProgressBar;
