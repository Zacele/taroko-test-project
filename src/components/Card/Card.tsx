'use client';
import React from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';
import { useModal } from '@/context/ModalContext';
import { CardProps } from '@/interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContactById } from '@/api';
import { useSnackbar } from '@/context/SnackbarContext';
import clsx from 'clsx';
import { useFavorites } from '@/context/FavoritesContext';

const Card: React.FC<CardProps> = ({
  name,
  job,
  description,
  id,
  isHighlighted,
}) => {
  const { toggleFavorite } = useFavorites();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const { mutate: deleteContact } = useMutation<any, Error, number>({
    mutationFn: deleteContactById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      showSnackbar('Contact deleted', 'success');
    },
    onError: (error) => {
      showSnackbar(`Error deleting contact: ${error}`, 'error');
      console.error('Error:', error);
    },
  });

  const { openEditModal } = useModal();
  const onEdit = () => {
    openEditModal(id);
  };

  const onDelete = () => deleteContact(id);
  const updateFavorites = () => {
    toggleFavorite(id);
    if (isHighlighted) {
      showSnackbar('Contact removed from favorites', 'success');
      return;
    }
    showSnackbar('Contact added to favorites', 'success');
  };

  return (
    <div
      className={clsx(styles.contactCard, {
        [styles.highlighted]: isHighlighted,
      })}
    >
      <div className={styles.header}>
        <span
          onClick={updateFavorites}
          className={clsx(styles.star, {
            [styles.isHighlight]: isHighlighted,
          })}
        >
          ★
        </span>
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
