import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button', () => {
  test('renders with children', () => {
    const { asFragment } = render(<Button>Click Me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    const { asFragment } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(asFragment()).toMatchSnapshot();
  });

  test('is disabled when disabled prop is true', () => {
    const { asFragment } = render(<Button disabled>Disabled Button</Button>);
    expect(
      screen.getByRole('button', { name: /disabled button/i }),
    ).toBeDisabled();
    expect(asFragment()).toMatchSnapshot();
  });

  test('has fluid class when fluid prop is true', () => {
    const { asFragment, container } = render(
      <Button fluid>Fluid Button</Button>,
    );
    expect(container.firstChild).toHaveClass('fluid');
    expect(asFragment()).toMatchSnapshot();
  });

  test('applies variant classes correctly', () => {
    const { rerender, asFragment, container } = render(
      <Button variant="default">Default Button</Button>,
    );
    expect(container.firstChild).toHaveClass('default');
    expect(asFragment()).toMatchSnapshot();

    rerender(<Button variant="secondary">Secondary Button</Button>);
    expect(container.firstChild).toHaveClass('secondary');
    expect(asFragment()).toMatchSnapshot();

    rerender(<Button variant="success">Success Button</Button>);
    expect(container.firstChild).toHaveClass('success');
    expect(asFragment()).toMatchSnapshot();

    rerender(<Button variant="danger">Danger Button</Button>);
    expect(container.firstChild).toHaveClass('danger');
    expect(asFragment()).toMatchSnapshot();
  });
});
