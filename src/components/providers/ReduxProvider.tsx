"use client";

import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTheme } from "@/store/slices/uiSlice";

// ThemeInitializer component to initialize theme based on localStorage or system preference
const ThemeInitializer = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.ui.theme);

  useEffect(() => {
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      dispatch(setTheme(savedTheme));
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      dispatch(setTheme("dark"));
    }

    // Apply theme to document
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dispatch, currentTheme]);

  return null;
};

export default function ReduxProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <ThemeInitializer />
      {children}
    </Provider>
  );
}
