'use client';
import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}) => {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        id={`input-${label}`}
      />
      <label htmlFor={`input-${label}`} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default InputField;
