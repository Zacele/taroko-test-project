'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import Cookies from 'js-cookie';

type FavoritesContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

type FavoritesProviderProps = {
  children: ReactNode;
};

const FAVORITES_COOKIE_NAME = 'favorites';

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  // Initialize state with empty array or from cookies
  const [favorites, setFavorites] = useState<number[]>(() => {
    const cookieValue = Cookies.get(FAVORITES_COOKIE_NAME);
    return cookieValue ? JSON.parse(cookieValue) : [];
  });

  useEffect(() => {
    // Update cookie whenever favorites change
    Cookies.set(FAVORITES_COOKIE_NAME, JSON.stringify(favorites), {
      expires: 7,
    });
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites((currentFavorites) => {
      const isFavorite = currentFavorites.includes(id);
      const newFavorites = isFavorite
        ? currentFavorites.filter((favId) => favId !== id)
        : [...currentFavorites, id];

      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
