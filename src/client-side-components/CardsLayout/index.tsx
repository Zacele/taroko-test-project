'use client';
import { getContacts } from '@/api';
import Card from '@/components/Card/Card';
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
      {contactData?.data.map((card) => (
        <Card
          key={card.id}
          name={card.first_name + ' ' + card.last_name}
          job={card.job}
          description={card.description}
          isHighlighted={card.id % 2 === 0}
        />
      ))}
    </>
  );
};

export default CardsLayout;
