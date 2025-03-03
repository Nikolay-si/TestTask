import React from "react";
import styles from "./Result.module.css";
import { Status, Test, Type } from "../../types";
import {
  formatText,
  getIndicatorColor,
  getStatusTextColor,
} from "../../helpers/helpers";

interface Props {
  name: string;
  type: Type;
  status: Status;
  site: string;
}

export default function Result({ name, type, status, site }: Props) {
  const indicatorColor = getIndicatorColor(site);
  const statusTextColor = getStatusTextColor(status);

  return (
    <div className={styles.container}>
      <div
        className={styles.indicator}
        style={{ backgroundColor: indicatorColor }}
      ></div>
      <p className={styles.testName}>{name}</p>
      <p className={styles.testType}>{formatText(type)}</p>
      <p className={styles.testStatus} style={{ color: statusTextColor }}>
        {formatText(status)}
      </p>
      <p className={styles.testSite}>{site}</p>
      <button
        className={
          status === "DRAFT" ? styles.buttonFinalize : styles.buttonResult
        }
      >
        {status === "DRAFT" ? "Finalize" : "Results"}
      </button>
    </div>
  );
}
