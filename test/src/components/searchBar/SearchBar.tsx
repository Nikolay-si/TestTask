import React from "react";
import searchIcon from "../../images/Interaction/Search.svg";
import styles from "./SearchBar.module.css";

interface Props {
  searchInput: string;
  setSearchInput: (value: string) => void;
  testCount: number;
}

export default function SearchBar({
  searchInput,
  setSearchInput,
  testCount,
}: Props) {
  return (
    <div className={styles.container}>
      <img className={styles.loupePic} src={searchIcon} alt="search icon"></img>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={styles.searchBar}
        type="text"
        placeholder="What test are you looking for?"
      />
      <p className={styles.testCounter}>{testCount} tests</p>
    </div>
  );
}
