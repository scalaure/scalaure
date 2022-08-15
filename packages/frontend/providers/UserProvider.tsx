import { createSafeContext } from 'lib/createSafeContext';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Children } from 'types';

export interface User {
  readonly email: string;
  readonly fullName: string;
}

interface UserContext {
  readonly setUser: Dispatch<SetStateAction<UserContext['user']>>;
  readonly user: User | null;
}

const [useContext, Provider] = createSafeContext<UserContext>();

export const UserProvider = ({ children }: Children) => {
  const [user, setUser] = useState<User | null>(null);

  return <Provider value={{ user, setUser }}>{children}</Provider>;
};

export const useUser = useContext;
