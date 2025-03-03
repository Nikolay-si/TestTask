import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/mainPage/MainPage";
import styles from "./App.module.css";
import { ResultPage } from "./pages/resultPage/ResultPage";
import { FinalizePage } from "./pages/finalizePage/FinalizePage";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/results/:testId" element={<ResultPage />} />
          <Route path="/finalize/:testId" element={<FinalizePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
