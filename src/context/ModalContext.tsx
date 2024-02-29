'use client';
import { ModalState } from '@/interface';
import React, { createContext, useContext, useState, ReactNode } from 'react';

const ModalContext = createContext<ModalState | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const closeModal = () => {
    setOpen(false);
    setIsEditMode(false);
    setSelectedId(null);
  };

  const openCreateModal = () => {
    setOpen(true);
  };

  const openEditModal = (id: number) => {
    setIsEditMode(true);
    setOpen(true);
    setSelectedId(id);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen: open,
        isEdit: isEditMode,
        openModal: openCreateModal,
        closeModal,
        openEditModal,
        selectedId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
