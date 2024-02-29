import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from './InputField';

describe('InputField', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders correctly with all props', () => {
    const { asFragment } = render(
      <InputField
        label="Test Label"
        value="Test Value"
        onChange={mockOnChange}
        placeholder="Test Placeholder"
        type="text"
      />,
    );

    expect(screen.getByLabelText(/test label/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Test Value');
    expect(
      screen.getByPlaceholderText(/test placeholder/i),
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('calls onChange when input changes', () => {
    render(<InputField label="Test Label" value="" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
