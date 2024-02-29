'use client';
import { getContacts } from '@/api';
import Button from '@/components/Button/Button';
import { useFavorites } from '@/context/FavoritesContext';
import { useModal } from '@/context/ModalContext';
import { GetContactsResponseType } from '@/interface';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import dynamic from 'next/dynamic';
const Card = dynamic(() => import('@/components/Card/Card'), { ssr: false });

type Card = {
  id: number;
  first_name?: string;
  last_name?: string;
  job?: string;
  description?: string;
};

const CardsLayout: React.FC = () => {
  const { openModal } = useModal();
  const { favorites, favoritesFilterOn } = useFavorites();
  const {
    isLoading,
    error,
    data: contactData,
  } = useQuery<GetContactsResponseType, Error>({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <>
      <Button onClick={openModal}>Add new contact</Button>
      {!favoritesFilterOn &&
        contactData?.data.map((card) => (
          <Card
            id={card.id}
            key={card.id}
            name={card.first_name + ' ' + card.last_name ?? ''}
            job={card.job}
            description={card.description}
            isHighlighted={favorites.includes(card.id)}
          />
        ))}
      {favoritesFilterOn &&
        contactData?.data
          .filter((item) => favorites.includes(item.id))
          .map((card) => (
            <Card
              id={card.id}
              key={card.id}
              name={card.first_name + ' ' + card.last_name ?? ''}
              job={card.job}
              description={card.description}
              isHighlighted={favorites.includes(card.id)}
            />
          ))}
    </>
  );
};

export default CardsLayout;
