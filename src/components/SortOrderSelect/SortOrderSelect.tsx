'use client';

import React from 'react';
import styles from './SortOrderSelect.module.css';
import { useSortingContext } from '@/context/SortingContext';
import { GetContactsResponseType, SortingOrderType } from '@/interface';
import { useQueryClient } from '@tanstack/react-query';
interface Option {
  value: string;
  label: string;
}

const SortOrderSelect: React.FC = () => {
  const { setOrder } = useSortingContext();
  const queryClient = useQueryClient();
  const options: Option[] = [
    { value: 'desc', label: 'A-Z' },
    { value: 'asc', label: 'Z-A' },
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = event.target.value as SortingOrderType;
    setOrder(newOrder);

    queryClient.setQueryData(
      ['contacts'],
      (oldData: GetContactsResponseType) => {
        const sortedData = [...oldData.data].sort((a, b) => {
          const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
          const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
          return newOrder === 'desc'
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        });
        return {
          ...oldData,
          data: sortedData,
        };
      },
    );
  };

  return (
    <select onChange={handleSelectChange} className={styles.select}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortOrderSelect;
