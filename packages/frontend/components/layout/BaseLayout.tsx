import { Header } from './Header';
import type { Children } from 'types/types';

export const BaseLayout = ({ children }: Children) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};
