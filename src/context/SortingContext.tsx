'use client';
import { SortingOrderType } from '@/interface';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SortingContextType {
  order: SortingOrderType;
  setOrder: (order: SortingOrderType) => void;
}

const SortingContext = createContext<SortingContextType | undefined>(undefined);

interface SortingProviderProps {
  children: ReactNode;
}

export const SortingProvider: React.FC<SortingProviderProps> = ({
  children,
}) => {
  const [order, setOrder] = useState<SortingOrderType>('desc');

  return (
    <SortingContext.Provider value={{ order, setOrder }}>
      {children}
    </SortingContext.Provider>
  );
};

export const useSortingContext = () => {
  const context = useContext(SortingContext);
  if (context === undefined) {
    throw new Error('useSortingContext must be used within a SortingProvider');
  }
  return context;
};
