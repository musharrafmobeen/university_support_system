import React, { createContext } from "react";
import useToggleState from "../hooks/useToggleState";

const ThemeModeContext = createContext();

function ThemeModeProvider(props) {
  const [isDarkMode, toggleTheme] = useToggleState(false);
  return (
    <ThemeModeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {props.children}
    </ThemeModeContext.Provider>
  );
}

export {ThemeModeContext, ThemeModeProvider};