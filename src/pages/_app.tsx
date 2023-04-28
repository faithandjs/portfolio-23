import { ThemeProvider } from '@/context/themeCtx';
import type { AppProps } from 'next/app';

import Navbar from '@/components/Navbar';

import '@/styles/color.css';
import '@/styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

