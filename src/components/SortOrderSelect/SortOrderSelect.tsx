'use client';

import React from 'react';
import styles from './SortOrderSelect.module.css';
interface Option {
  value: string;
  label: string;
}

const SortOrderSelect: React.FC = () => {
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc');
  const options: Option[] = [
    { value: 'desc', label: 'A-Z' },
    { value: 'asc', label: 'Z-A' },
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as 'asc' | 'desc');
  };

  return (
    <select
      value={sortOrder}
      onChange={handleSelectChange}
      className={styles.select}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortOrderSelect;
