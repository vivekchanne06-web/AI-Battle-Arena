import React from 'react';
import clsx from 'clsx';

export const Skeleton = ({
  variant = 'text',
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200 rounded',
        {
          'h-4 w-full': variant === 'text',
          'h-24 w-full rounded-xl': variant === 'rect',
          'h-10 w-10 rounded-full': variant === 'circle',
        },
        className
      )}
      {...props}
    />
  );
};
