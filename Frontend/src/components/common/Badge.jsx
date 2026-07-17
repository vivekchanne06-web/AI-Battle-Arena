import React from 'react';
import clsx from 'clsx';

export const Badge = ({
  children,
  variant = 'neutral',
  className,
  ...props
}) => {
  return (
    <span
      className={clsx(
        'px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase inline-flex items-center justify-center',
        {
          'bg-border text-heading': variant === 'neutral',
          'bg-[#10B981]/10 text-[#10B981]': variant === 'success',
          'bg-primary/10 text-primary': variant === 'orange',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
