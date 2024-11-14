import { SlBadge } from "react-icons/sl";
import styles from "./EnvironmentalBadge.module.css";

interface EnvironmentalBadgeProps {
  grade: string;
}

const EnvironmentalBadge = ({ grade }: EnvironmentalBadgeProps) => {
  return (
    <div className={`${styles.badge} ${styles[grade.toLowerCase()]}`}>
      <SlBadge />
      {grade}
    </div>
  );
};

export default EnvironmentalBadge;
