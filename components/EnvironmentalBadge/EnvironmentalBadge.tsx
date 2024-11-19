import { SlBadge } from "react-icons/sl";
import styles from "./EnvironmentalBadge.module.css";

interface EnvironmentalBadgeProps {
  grade: string;
}

const EnvironmentalBadge = ({ grade }: EnvironmentalBadgeProps) => {
  return (
    <div className={`${styles.badge} ${styles[grade.toLowerCase()]}`}>
      <SlBadge size={16} />
      <span>{grade}</span>
    </div>
  );
};

export default EnvironmentalBadge;
