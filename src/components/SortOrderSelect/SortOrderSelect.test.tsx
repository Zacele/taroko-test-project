import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SortOrderSelect from './SortOrderSelect';
import { useSortingContext } from '@/context/SortingContext';
import { useQueryClient } from '@tanstack/react-query';

jest.mock('@/context/SortingContext', () => ({
  useSortingContext: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
}));

describe('SortOrderSelect', () => {
  beforeEach(() => {
    (useSortingContext as jest.Mock).mockReturnValue({
      order: 'desc',
      setOrder: jest.fn(),
    });

    const queryClientMock = {
      setQueryData: jest.fn(),
    };
    (useQueryClient as jest.Mock).mockReturnValue(queryClientMock);
  });

  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<SortOrderSelect />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('updates sorting order on selection', async () => {
    const setOrderMock = jest.fn();
    (useSortingContext as jest.Mock).mockReturnValue({
      order: 'desc',
      setOrder: setOrderMock,
    });

    render(<SortOrderSelect />);

    await userEvent.selectOptions(screen.getByRole('combobox'), ['asc']);
    expect(setOrderMock).toHaveBeenCalledWith('asc');
  });
});
