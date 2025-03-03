import React from "react";
import styles from "./Result.module.css";
import { Status, Test, Type } from "../../types";
import {
  formatText,
  getIndicatorColor,
  getStatusTextColor,
} from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  type: Type;
  status: Status;
  site: string;
  testId: number;
}

export const Result = ({ name, type, status, site, testId }: Props) => {
  const indicatorColor = getIndicatorColor(site);
  const statusTextColor = getStatusTextColor(status);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (status === "DRAFT") {
      navigate(`/finalize/${testId}`);
    } else {
      navigate(`/results/${testId}`);
    }
  };

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
        onClick={handleButtonClick}
      >
        {status === "DRAFT" ? "Finalize" : "Results"}
      </button>
    </div>
  );
};
