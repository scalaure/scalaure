import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

export const Button = ({ children, className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classes = clsx(
    'block sm:w-auto sm:inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg',
    className
  );

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};
