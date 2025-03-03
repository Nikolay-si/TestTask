import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { Test } from "../../types";
import { fetchTestById } from "../../services/api";
import styles from "../finalizePage/FinalizePage.module.css";
import { BackButton } from "../../components/backButton/BackButton";

export const FinalizePage = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);
  useEffect(() => {
    const loadTest = async () => {
      if (!testId) return;
      const data = await fetchTestById(testId);
      setTest(data);
    };
    loadTest();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header />
      <p className={styles.testName}>{test ? test.name : `Ошибка`}</p>

      <BackButton onClick={handleBack} />
    </div>
  );
};
