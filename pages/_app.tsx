import '@/styles/main.scss';
import '@etchteam/next-pagination/dist/index.css';
import { NextIntlProvider } from 'next-intl';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <Component {...pageProps} />
    </NextIntlProvider>
  );
}
