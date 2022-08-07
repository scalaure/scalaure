import { useRouter } from 'next/router';
import { useUserContext } from 'providers/UserCtx';
import { useEffect } from 'react';

interface Props {
  readonly redirectTo?: string;
}

export const PrivateRoute = ({ redirectTo = '/' }: Props) => {
  const router = useRouter();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      return void router.replace(redirectTo);
    }
  }, [redirectTo, router, user]);
};
