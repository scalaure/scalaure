import { createContext, useContext } from 'react';

export const createSafeContext = <T extends Record<PropertyKey, any>>() => {
  const context = createContext<T | undefined>(undefined);

  const useSafeContext = () => {
    const ctx = useContext(context);

    if (!ctx) {
      throw new Error('useContext must be use inside Provider!');
    }

    return ctx;
  };

  return [useSafeContext, context.Provider] as const;
};
