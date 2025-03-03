import { Header } from "../../components/header/Header";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { SearchResult } from "../../components/searchResult/SearchResult";
import { fetchData } from "./fetchData";
import { useEffect, useState, useMemo } from "react";
import { Site, SortConfig, SortKey, Test } from "../../types";
import styles from "./MainPage.module.css";
import { ResultsHeader } from "../../components/resultsHeader/ResultsHeader";
import { sortFunctions } from "./sorting";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

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

  const mappedSites = useMemo(() => {
    return sites.reduce((acc, site) => {
      acc[site.id] = site;
      return acc;
    }, {} as Record<number, Site>);
  }, [sites]);

  const sortedTests = useMemo(() => {
    if (!sortConfig) return filteredTests;

    return [...filteredTests].sort((a, b) => {
      const sortFunction = sortFunctions[sortConfig.key];
      if (sortFunction) {
        return sortFunction(a, b, sortConfig.direction, mappedSites);
      }
      return 0;
    });
  }, [filteredTests, sortConfig, mappedSites]);

  const handleSort = (key: SortKey) => {
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
        <div>
          <ResultsHeader onSort={handleSort} sortConfig={sortConfig} />
          <SearchResult
            tests={sortedTests}
            sites={sites}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        </div>
      )}
    </div>
  );
};
