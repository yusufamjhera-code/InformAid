import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from './context/ThemeContext';

const ThemeWrapper = ({ children }) => {
  const { theme } = useTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

const AppWrapper = ({ children }) => {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        {children}
      </ThemeWrapper>
    </ThemeProvider>
  );
};

export default AppWrapper; 