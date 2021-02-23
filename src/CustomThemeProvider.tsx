import React, { createContext, useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { isServer } from './helpers/isServer';

export const CustomThemeContext = createContext({
  currentTheme: 'light',
  setTheme: (name: string) => {}
});

const CustomThemeProvider: React.FC = (props) => {
  const { children } = props;
  const currentTheme = !isServer && localStorage.getItem('theme') || 'light';

  const [themeName, setThemeName] = useState(currentTheme);

  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: themeName,
      },
    }),
    [themeName],
  );

  const setTheme = (name: string) => {
    if (!isServer) {
      localStorage.setItem('theme', name);
    }
    setThemeName(name);
  };

  const contextValue = {
    currentTheme: themeName,
    setTheme,
  };

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export default CustomThemeProvider;
