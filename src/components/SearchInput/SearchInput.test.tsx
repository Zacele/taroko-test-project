import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';
import { useSearch } from '@/context/SearchContext';

// Mocking necessary modules and hooks
jest.mock('@/context/SearchContext', () => ({
  useSearch: jest.fn(),
}));

jest.mock('@/utils', () => ({
  debounce: jest.fn((fn) => fn),
}));

describe('SearchInput', () => {
  it('calls setSearchQuery with the correct value after debounce', async () => {
    const setSearchQuery = jest.fn();
    (useSearch as jest.Mock).mockReturnValue({ setSearchQuery });

    const { getByPlaceholderText } = render(<SearchInput />);
    const input = getByPlaceholderText("Search for character's name...");
    await userEvent.type(input, 'Count Dooku');
    expect(setSearchQuery).toHaveBeenCalledWith('Count Dooku');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<SearchInput />);
    expect(asFragment()).toMatchSnapshot();
  });
});
