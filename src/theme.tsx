import { createTheme, Theme } from '@mui/material';

interface CustomPaletteColorOptions {
    main: string;
    text: string;
    light: string;
    title: string;
  }
  
  declare module '@mui/material' {
    interface PaletteOptions {
      green?: CustomPaletteColorOptions;
      red?: CustomPaletteColorOptions;
      blue?: CustomPaletteColorOptions;
    }
  }

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#7012D8',
    },
    secondary: {
      main: '#7012D8',
    },
    green: {
      main: '#4C8400',
      text: '#ECF0F1',
      light: '#ECF0F1',
      title: '#ECF0F1',
    },
    red: {
      main: '#7012D8',
      text: '#ECF0F1',
      light: '#ECF0F1',
      title: '#ECF0F1',
    },
    blue: {
      main: '#9BDEAC',
      text: '#006469',
      light: '#006469',
      title: '#006469',
    },
  },
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 12,
  },
});

export default theme;
