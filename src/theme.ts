import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
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
  },
  typography: {
    fontFamily: ["'Ubuntu', sans-serif", "'Noto Sans TC', sans-serif"].join(','),
  },
});

export default responsiveFontSizes(theme);
