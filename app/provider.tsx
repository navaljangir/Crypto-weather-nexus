"use client";

import { Provider as ContextProvider } from "react-redux";
import { ReactNode } from "react";
import { store } from "./lib/store";
import { ThemeProvider } from "next-themes";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ContextProvider store={store}>{children}</ContextProvider>
    </ThemeProvider>
  );
}
