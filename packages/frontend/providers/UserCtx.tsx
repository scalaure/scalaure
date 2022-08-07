import { getSafeContext } from 'helpers/getSafeCtx';
import { createContext, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Children } from 'types/types';

export interface User {
  readonly email: string;
  readonly fullName: string;
}

interface UserCtx {
  readonly setUser: Dispatch<SetStateAction<UserCtx['user']>>;
  readonly user: User | null;
}

const UserContext = createContext<UserCtx | null>(null);

export const UserProvider = ({ children }: Children) => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUserContext = getSafeContext(UserContext);
