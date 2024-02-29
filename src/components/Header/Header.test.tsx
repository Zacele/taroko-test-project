import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
  it('renders the header with the correct text', () => {
    const testText = 'Test Header';
    render(<Header text={testText} />);

    const headerElement = screen.getByText(testText);
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('header'); // Assuming 'header' is a class name in your CSS module
  });

  it('matches snapshot', () => {
    const testText = 'Snapshot Test Header';
    const { asFragment } = render(<Header text={testText} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
