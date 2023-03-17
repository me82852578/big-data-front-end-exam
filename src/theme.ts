import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: {
      main:string
      dark:string
      light:string
    };
  }
  interface PaletteOptions {
    tertiary:{
      main:CSSProperties['color']
      dark:CSSProperties['color']
      light:CSSProperties['color']
    }
  }
}

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
          '*::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 7px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
          },
          '*::-webkit-scrollbar': {
            height: '6px',
            width: '7px',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
          },
          '*::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            backgroundColor: 'rgb(182, 182, 182)',
          },
        },
        body: {
          height: '100%',
        },
        '#root': {
          height: '100%',
        },
        input: {
          // To prevent zoom in on input focus on mobile devices.
          '@media (max-width:899px)': {
            fontSize: '1rem !important',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#651fff',
      dark: '#4615b2',
      light: '#834bff',
    },
    secondary: {
      main: '#b388ff',
      dark: '#7d5fb2',
      light: '#c29fff',
    },
    tertiary: {
      main: '#8c9eff',
      dark: '#626eb2',
      light: '#a3b1ff',
    },
  },
  typography: {
    fontFamily: ["'Ubuntu', sans-serif", "'Noto Sans TC', sans-serif"].join(','),
  },
});

export default responsiveFontSizes(theme);
