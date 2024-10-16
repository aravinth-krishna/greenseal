import styles from "./EnvironmentalBadge.module.css";

interface EnvironmentalBadgeProps {
  grade: string;
}

const EnvironmentalBadge = ({ grade }: EnvironmentalBadgeProps) => {
  return (
    <div className={`${styles.badge} ${styles[grade.toLowerCase()]}`}>
      {grade}
    </div>
  );
};

export default EnvironmentalBadge;
