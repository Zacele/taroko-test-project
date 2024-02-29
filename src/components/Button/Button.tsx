'use client';
import React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

type ButtonVariant = 'default' | 'secondary' | 'success' | 'danger';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  disabled?: boolean;
  fluid?: boolean;
  variant?: ButtonVariant;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  fluid = false,
  variant = 'default',
}) => {
  const buttonClass = clsx(styles.button, {
    [styles.fluid]: fluid,
    [styles.default]: variant === 'default',
    [styles.secondary]: variant === 'secondary',
    [styles.success]: variant === 'success',
    [styles.danger]: variant === 'danger',
  });
  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
