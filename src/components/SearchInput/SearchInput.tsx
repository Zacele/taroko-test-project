'use client';

import React from 'react';
import styles from './SearchInput.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { useQueryClient } from '@tanstack/react-query';
import { GetContactsResponseType } from '@/interface';
import { searchByName } from '@/functions';
import debounce from 'lodash/debounce';

const SearchInput: React.FC = () => {
  const queryClient = useQueryClient();
  const currentData = queryClient.getQueryData<GetContactsResponseType>([
    'contacts',
  ]);

  const onInputChange = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      queryClient.setQueryData(
        ['contacts'],
        (oldData: GetContactsResponseType) => ({
          ...oldData,
          data: searchByName(currentData?.data ?? [], event.target.value),
        }),
      );
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
