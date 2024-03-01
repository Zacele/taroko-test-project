'use client';
import { getContacts } from '@/api';
import Button from '@/components/Button/Button';
import { useFavorites } from '@/context/FavoritesContext';
import { useModal } from '@/context/ModalContext';
import { GetContactsResponseType } from '@/interface';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import dynamic from 'next/dynamic';
import { useSearch } from '@/context/SearchContext';

const Card = dynamic(() => import('@/components/Card/Card'), { ssr: false });

const CardsLayout: React.FC = () => {
  const { openModal } = useModal();
  const { favorites, favoritesFilterOn } = useFavorites();
  const { filterContacts } = useSearch();
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

  const filteredContacts = filterContacts(contactData?.data ?? []).filter(
    (card) => !favoritesFilterOn || favorites.includes(card.id),
  );

  return (
    <>
      <Button onClick={openModal}>Add new contact</Button>
      {filteredContacts.length === 0 ? (
        <div>These are not the droids you've been looking for 🤖</div>
      ) : (
        filteredContacts.map((card) => (
          <Card
            id={card.id}
            key={card.id}
            name={`${card.first_name} ${card.last_name ?? ''}`}
            job={card.job}
            description={card.description}
            isHighlighted={favorites.includes(card.id)}
          />
        ))
      )}
    </>
  );
};

export default CardsLayout;
