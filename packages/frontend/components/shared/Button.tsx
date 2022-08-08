import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly className?: string;
}

export const Button = ({ children, className, ...rest }: Props) => {
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
