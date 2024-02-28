'use client';
import { getContacts } from '@/api';
import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import { useModal } from '@/context';
import { GetContactsResponseType } from '@/interface';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

type Card = {
  id: number;
  first_name?: string;
  last_name?: string;
  job?: string;
  description?: string;
};

const CardsLayout: React.FC = () => {
  const { openModal } = useModal();
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
      {contactData?.data.map((card) => (
        <Card
          id={card.id}
          key={card.id}
          name={card.first_name + ' ' + card.last_name ?? ''}
          job={card.job}
          description={card.description}
          isHighlighted={card.id % 2 === 0}
        />
      ))}
    </>
  );
};

export default CardsLayout;
