import React, { createContext, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { isServer } from './helpers/isServer';

import { setThemeSaga } from './store/actionCreators/theme';

export const CustomThemeContext = createContext({
  currentTheme: 'light',
  setTheme: (name: string) => {}
});

const CustomThemeProvider: React.FC = (props) => {
  const { children } = props;

  const dispatch = useDispatch();

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
    setThemeName(name);
    dispatch(setThemeSaga(name));
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
