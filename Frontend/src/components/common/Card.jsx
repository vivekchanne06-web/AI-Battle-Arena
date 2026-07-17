import React from 'react';
import clsx from 'clsx';

export const Card = ({
  children,
  variant = 'white',
  bordered = true,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'rounded-2xl p-6 transition-all duration-200',
        {
          'bg-white text-body': variant === 'white',
          'bg-surface text-body': variant === 'surface',
          'bg-primary/5 text-body': variant === 'orange',
        },
        {
          'border border-border': bordered && variant !== 'orange',
          'border border-primary/20': bordered && variant === 'orange',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
