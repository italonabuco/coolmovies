import { blueGrey } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const MuiTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: blueGrey,
      background: {
        default: blueGrey[900],
        paper: blueGrey[900],
      },
    },
  })
);
