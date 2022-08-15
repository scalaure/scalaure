import 'styles/global.css';
import { BaseLayout } from 'components/layout/BaseLayout';
import { UserProvider } from 'providers/UserProvider';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </UserProvider>
  );
}

export default MyApp;
