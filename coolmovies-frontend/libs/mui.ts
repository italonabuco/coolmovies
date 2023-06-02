import { blueGrey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const MuiTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: blueGrey[900],
      paper: blueGrey[900],
    },
  },
});
