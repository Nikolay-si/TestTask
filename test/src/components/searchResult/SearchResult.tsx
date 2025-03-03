import React from "react";
import styles from "./SearchResults.module.css";
import Result from "../result/Result";
import { Site, Test, Type, Status } from "../../types";
import { getSiteUrl } from "../../helpers/helpers";

interface Props {
  sites: Site[];
  tests: Test[];
  onSort: (key: string) => void;
  sortConfig: { key: string; direction: "asc" | "desc" } | null;
}

export default function SearchResult({
  tests,
  sites,
  onSort,
  sortConfig,
}: Props) {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.columnTitle} onClick={() => onSort("name")}>
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
      <ul>
        {tests.map((test) => {
          const site = sites.find((site) => site.id === test.siteId);
          return (
            <li key={test.id}>
              <Result
                name={test.name}
                type={test.type}
                status={test.status}
                site={site ? getSiteUrl(site.url) : ""}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
