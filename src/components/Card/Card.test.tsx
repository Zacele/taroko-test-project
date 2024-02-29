import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';
import * as ModalContext from '@/context/ModalContext';
import * as SnackbarContext from '@/context/SnackbarContext';
import * as FavoritesContext from '@/context/FavoritesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/api', () => ({
  deleteContactById: jest.fn(),
}));

jest.mock('@/context/ModalContext', () => ({
  useModal: jest.fn(),
}));

jest.mock('@/context/SnackbarContext', () => ({
  useSnackbar: jest.fn(),
}));

jest.mock('@/context/FavoritesContext', () => ({
  useFavorites: jest.fn(),
}));

const renderWithProviders = (component: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );
};

describe('Card Component', () => {
  beforeEach(() => {
    (ModalContext.useModal as jest.Mock).mockReturnValue({
      openEditModal: jest.fn(),
    });

    (SnackbarContext.useSnackbar as jest.Mock).mockReturnValue({
      showSnackbar: jest.fn(),
    });

    (FavoritesContext.useFavorites as jest.Mock).mockReturnValue({
      toggleFavorite: jest.fn(),
    });
  });

  test('renders Card with provided props and matches snapshot', () => {
    const { asFragment } = renderWithProviders(
      <Card
        name="Yoda"
        job="Master Jedi"
        description="Stay in the hut."
        id={1}
        isHighlighted={false}
      />,
    );
    expect(screen.getByText('Yoda')).toBeInTheDocument();
    expect(screen.getByText('Job: Master Jedi')).toBeInTheDocument();
    expect(
      screen.getByText('Description: Stay in the hut.'),
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('calls openEditModal on edit button click and matches snapshot', () => {
    const { asFragment } = renderWithProviders(
      <Card
        name="John Doe"
        job="Developer"
        description="Writes code."
        id={1}
        isHighlighted={false}
      />,
    );
    fireEvent.click(screen.getByText('Edit'));
    expect(ModalContext.useModal().openEditModal).toHaveBeenCalledWith(1);
    expect(asFragment()).toMatchSnapshot();
  });

  test('calls deleteContactById on delete button click and matches snapshot', async () => {
    const { deleteContactById } = jest.requireMock('@/api');
    deleteContactById.mockImplementation(() => Promise.resolve()); // Simulate successful deletion

    const { asFragment } = renderWithProviders(
      <Card
        name="Obi-wan Kenobi"
        job="Frienemies with Anakin."
        description="In pain."
        id={2}
        isHighlighted={false}
      />,
    );

    fireEvent.click(screen.getByText('Delete'));

    await waitFor(() => {
      expect(deleteContactById).toHaveBeenCalledWith(2);
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
