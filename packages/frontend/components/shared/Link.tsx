import { INDEX_PATH } from 'constants/paths';
import clsx from 'clsx';
import L from 'next/link';
import type { LinkHTMLAttributes } from 'react';

interface Props extends LinkHTMLAttributes<HTMLAnchorElement> {
  readonly className?: string;
}

export const Link = ({ children, className, href = INDEX_PATH, ...rest }: Props) => {
  const classes = clsx(
    'block sm:w-auto sm:inline-block px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg',
    className
  );

  return (
    <L href={href}>
      <a className={classes} {...rest}>
        {children}
      </a>
    </L>
  );
};
