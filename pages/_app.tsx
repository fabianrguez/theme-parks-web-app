import '@/styles/globals.scss';
import '@etchteam/next-pagination/dist/index.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
