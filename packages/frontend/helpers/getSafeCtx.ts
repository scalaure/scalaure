import { useContext } from 'react';
import type { Context } from 'react';

export const getSafeContext = <T>(context: Context<T | null>) => {
  return () => {
    const ctx = useContext(context);

    if (!ctx) {
      throw new Error('Missing context data!');
    }

    return ctx;
  };
};
