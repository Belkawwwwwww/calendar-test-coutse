import React from "react";
import styles from "./index.module.sass";

const SearchBar = () => {
  return (
    <>
      <label htmlFor="search" className={styles.icon}>
        <img src="/img/search.svg" alt="search" />
      </label>
      <input
        type="text"
        className={styles.input}
        placeholder="Поиск"
        id="search"
      />
    </>
  );
};

export default SearchBar;
