'use client';
import React from 'react';
import styles from './ToggleFavorite.module.css';

const ToggleFavorite: React.FC = () => {
  const [showFavorites, setShowFavorites] = React.useState(false);
  const onToggleFavoritesClick = () => {
    console.log('CLICKED');
  };

  return (
    <button onClick={onToggleFavoritesClick} className={styles.button}>
      Favorites
    </button>
  );
};

export default ToggleFavorite;
