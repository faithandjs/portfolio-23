import { ThemeProvider } from '@/context/themeCtx';
import '@/styles/globals.css';
import '@/styles/theme.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

