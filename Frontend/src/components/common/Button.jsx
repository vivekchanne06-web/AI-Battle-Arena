import React from 'react';
import clsx from 'clsx';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
        {
          'bg-primary text-white hover:bg-primary-hover shadow-sm border border-transparent': variant === 'primary',
          'bg-heading text-white hover:bg-body shadow-sm': variant === 'secondary',
          'border border-border bg-white text-body hover:bg-surface hover:text-heading': variant === 'outline',
          'text-muted hover:text-heading hover:bg-surface': variant === 'minimal',
        },
        {
          'px-3.5 py-1.5 text-xs': size === 'sm',
          'px-6 py-2.5 text-sm': size === 'md',
          'px-8 py-3.5 text-base': size === 'lg',
        },
        { 'w-full': fullWidth },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
