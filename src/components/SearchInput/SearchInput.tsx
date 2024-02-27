'use client';

import React from 'react';
import styles from './SearchInput.module.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput: React.FC = () => {
  return (
    <div className={styles.searchInputContainer}>
      <SearchIcon />
      <input
        type="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          console.log('event: ', event.target.value)
        }
        className={styles.searchInput}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
