import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ToggleFavorite from './ToggleFavorite';
import { useFavorites } from '@/context/FavoritesContext';

// Mock the FavoritesContext
jest.mock('@/context/FavoritesContext', () => ({
  useFavorites: jest.fn(),
}));

describe('ToggleFavorite', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Setup mock return value for useFavorites
    (useFavorites as jest.Mock).mockReturnValue({
      setFavoritesFilterOn: jest.fn(),
    });
  });

  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<ToggleFavorite />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('toggles favorites filter on button click', async () => {
    const setFavoritesFilterOnMock = jest.fn();
    (useFavorites as jest.Mock).mockReturnValue({
      setFavoritesFilterOn: setFavoritesFilterOnMock,
    });

    render(<ToggleFavorite />);
    const buttonElement = screen.getByRole('button', { name: /favorites/i });
    await userEvent.click(buttonElement);

    expect(setFavoritesFilterOnMock).toHaveBeenCalledWith(true);
    await userEvent.click(buttonElement);
    expect(setFavoritesFilterOnMock).toHaveBeenCalledWith(false);
  });
});
