import React from "react";
import styles from "./ResultsHeader.module.css";
import { SortKey } from "../../types";

interface Props {
  onSort: (key: SortKey) => void;
  sortConfig: { key: SortKey; direction: "asc" | "desc" } | null;
}

export const ResultsHeader = ({ onSort, sortConfig }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.columnTitleName} onClick={() => onSort("name")}>
        NAME{" "}
        {sortConfig?.key === "name" &&
          (sortConfig.direction === "asc" ? "↑" : "↓")}
      </div>
      <div className={styles.columnTitle} onClick={() => onSort("type")}>
        TYPE{" "}
        {sortConfig?.key === "type" &&
          (sortConfig.direction === "asc" ? "↑" : "↓")}
      </div>
      <div className={styles.columnTitle} onClick={() => onSort("status")}>
        STATUS{" "}
        {sortConfig?.key === "status" &&
          (sortConfig.direction === "asc" ? "↑" : "↓")}
      </div>
      <div className={styles.columnTitle} onClick={() => onSort("siteId")}>
        SITE{" "}
        {sortConfig?.key === "siteId" &&
          (sortConfig.direction === "asc" ? "↑" : "↓")}
      </div>
    </div>
  );
};
