import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export const Header = () => {
  const location = useLocation();
  const getHeaderTitle = () => {
    if (location.pathname.startsWith("/results")) {
      return "Results";
    }
    if (location.pathname.startsWith("/finalize")) {
      return "Finalize";
    }
    return "Dashboard";
  };

  return (
    <header>
      <h1 className={styles.title}>{getHeaderTitle()}</h1>
    </header>
  );
};
