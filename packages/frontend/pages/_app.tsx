import 'styles/global.css';
import type { AppProps } from 'next/app';
import { UserProvider } from 'contexts/UserCtx';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
