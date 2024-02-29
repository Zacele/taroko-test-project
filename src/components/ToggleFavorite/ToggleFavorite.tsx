'use client';
import React from 'react';
import styles from './ToggleFavorite.module.css';
import clsx from 'clsx';
import { useFavorites } from '@/context/FavoritesContext';

const ToggleFavorite: React.FC = () => {
  const [showFavorites, setShowFavorites] = React.useState(false);

  const { setFavoritesFilterOn } = useFavorites();

  const onToggleFavoritesClick = () => {
    setShowFavorites((prev) => !prev);
    setFavoritesFilterOn(!showFavorites);
  };

  return (
    <button
      onClick={onToggleFavoritesClick}
      className={clsx(styles.button, {
        [styles.isButtonHighlight]: showFavorites,
      })}
    >
      <span
        className={clsx(styles.star, {
          [styles.isButtonHighlightSpan]: showFavorites,
        })}
      >
        ★
      </span>
      Favorites
    </button>
  );
};

export default ToggleFavorite;
