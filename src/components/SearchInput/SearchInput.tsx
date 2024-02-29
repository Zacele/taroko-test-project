'use client';

import React from 'react';
import styles from './SearchInput.module.css';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash/debounce';
import { useSearch } from '@/context/SearchContext';

const SearchInput: React.FC = () => {
  const { setSearchQuery } = useSearch();

  const onInputChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    300,
  );

  return (
    <div className={styles.searchInputContainer}>
      <SearchIcon />
      <input
        type="text"
        onChange={onInputChange}
        className={styles.searchInput}
        placeholder="Search for character's name..."
      />
    </div>
  );
};

export default SearchInput;
