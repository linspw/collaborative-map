import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        color: 'primary',
        variant: "outlined"
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0153FF'
        },
        secondary: {
          main: '#202c35'
        }
      }
    }
  }
});
