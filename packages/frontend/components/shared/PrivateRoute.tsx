import { useRouter } from 'next/router';
import { useUserContext } from 'contexts/UserCtx';

interface Props {
  readonly redirectTo?: string;
}

export const PrivateRoute = ({ redirectTo = '/' }: Props) => {
  const router = useRouter();
  const { user } = useUserContext();

  if (!user) {
    return void router.replace(redirectTo);
  }
};
