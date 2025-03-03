import Header from "../header/Header";
import SearchBar from "../searchBar/SearchBar";
import SearchResult from "../searchResult/SearchResult";
import { fetchData } from "../../services/api";
import { useEffect, useState, useMemo } from "react";
import { Site, Test } from "../../types";
import styles from "./MainPage.module.css";

export default function MainPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { tests, sites } = await fetchData();
      setSites(sites);
      setTests(tests);
    };
    getData();
  }, []);

  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const sortedTests = useMemo(() => {
    if (!sortConfig) return filteredTests;

    return [...filteredTests].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof Test];
      const bValue = b[sortConfig.key as keyof Test];

      if (sortConfig.key === "status") {
        const statusOrder = ["ONLINE", "PAUSED", "STOPPED", "DRAFT"];
        const aIndex = statusOrder.indexOf(a.status);
        const bIndex = statusOrder.indexOf(b.status);

        return sortConfig.direction === "asc"
          ? aIndex - bIndex
          : bIndex - aIndex;
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredTests, sortConfig]);

  const handleSort = (key: string) => {
    const direction =
      sortConfig?.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    setSortConfig({ key, direction });
  };
  const resetFilter = () => {
    setSearchInput("");
  };

  return (
    <div>
      <Header />
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        testCount={filteredTests.length}
      />
      {filteredTests.length === 0 ? (
        <div className={styles.noResultContainer}>
          <p className={styles.noResults}>
            Your search did not match any results.
          </p>
          <button className={styles.resetButton} onClick={resetFilter}>
            Reset
          </button>
        </div>
      ) : (
        <SearchResult
          tests={sortedTests}
          sites={sites}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
      )}
    </div>
  );
}
