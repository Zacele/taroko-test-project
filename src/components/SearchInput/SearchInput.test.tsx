import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchInput from './SearchInput';
import { useSearch } from '@/context/SearchContext';

jest.mock('@/context/SearchContext', () => ({
  useSearch: jest.fn(),
}));

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));

describe('SearchInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearch as jest.Mock).mockReturnValue({
      setSearchQuery: jest.fn(),
    });
  });

  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<SearchInput />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls setSearchQuery on input change', () => {
    const setSearchQueryMock = jest.fn();
    (useSearch as jest.Mock).mockReturnValue({
      setSearchQuery: setSearchQueryMock,
    });

    render(<SearchInput />);
    const inputElement = screen.getByPlaceholderText(
      "Search for character's name...",
    );
    fireEvent.change(inputElement, { target: { value: 'Test Query' } });

    expect(setSearchQueryMock).toHaveBeenCalledTimes(1);
    expect(setSearchQueryMock).toHaveBeenCalledWith('Test Query');
  });
});
