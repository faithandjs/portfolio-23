'use client';

import { colors } from '@/assets/data';
import React, { createContext, useContext, useState, useEffect } from 'react';

const themeCtx = createContext(
  {} as {
    theme: themeType;
  }
);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<themeType>(colors[0]);

  useEffect(() => {
    const today = new Date();
    const day = today.getDay();
    console.log(day);
    setTheme(colors[day]);
  }, []);

  const value = { theme };
  return <themeCtx.Provider value={value}>{children}</themeCtx.Provider>;
}

export const useThemeCtx = () => useContext(themeCtx);

