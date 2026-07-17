import React from 'react';
import clsx from 'clsx';

export const Input = ({
  error = false,
  className,
  ...props
}) => {
  return (
    <textarea
      className={clsx(
        'w-full h-32 md:h-40 bg-surface border rounded-[20px] p-5 font-sans text-base text-heading placeholder:text-muted outline-none transition-all duration-200 resize-none',
        {
          'border-border focus:border-primary focus:ring-1 focus:ring-primary': !error,
          'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500': error,
        },
        className
      )}
      {...props}
    />
  );
};
