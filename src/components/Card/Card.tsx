'use client';
import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  name: string;
  job: string;
  description: string;
  isHighlighted?: boolean;
  onDelete?: () => void;
}

const Card: React.FC<CardProps> = ({
  name,
  job,
  description,
  isHighlighted,
}) => {
  const onEdit = () => {
    console.log('Edit');
  };
  const onDelete = () => {
    console.log('Delete');
  };
  return (
    <div
      className={`${styles.contactCard} ${isHighlighted ? styles.highlighted : ''}`}
    >
      <div className={styles.header}>
        {isHighlighted && <span className={styles.star}>★</span>}
        <h2>{name}</h2>
      </div>
      <div className={styles.content}>
        <p>Job: {job}</p>
        <p>Description: {description}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Card;
