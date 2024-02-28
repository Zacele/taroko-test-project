'use client';
import React from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';
import { useModal } from '@/context';
import { CardProps } from '@/interface';

const Card: React.FC<CardProps> = ({
  name,
  job,
  description,
  isHighlighted,
  id,
}) => {
  const { openEditModal } = useModal();
  const onEdit = () => {
    openEditModal(id);
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
        <Button onClick={onEdit}>Edit</Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Card;
