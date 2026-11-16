import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#9B7BFF' },
    secondary: { main: '#62A8FF' },
    background: {
      default: '#080A12',
      paper: '#111629',
    },
    text: {
      primary: '#F5F5FA',
      secondary: '#9299AE',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
});

export default theme;
