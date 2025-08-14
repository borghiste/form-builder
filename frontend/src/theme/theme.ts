import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  palette: {
    background: {
      default: '#F2F2F2', 
    },
    cyan: {
      main: '#3D71D9',
      light: '#3D80D9',
      dark: '#0540F2'
    },
    magenta: {
      main: '#D92938',
      dark: '#BF1717',
    },
    gray:{ 
      main:'#87909B',
      light: '#E9E7E9'
    },
    text: {
      primary: '#3E3E42',
      secondary: '#05080D'
    }
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: { color: '#87909B' }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'stretch'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: { display:'flex' },
        primary: { color: '#3E3E42' }
      }
    }
  }
});

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#F2F2F2' },
    background: {
      default: '#05080D',
      paper: '#F2F2F2',
    },
    magenta: {
      main: '#AB6262',
      dark: '#8C1B24'
    },
    cyan: {
      main: '#3D71D9',
      dark: '#0540F2'
    },
    gray: { main: '#1C2026' },
    text: {
      primary: '#C7D2D9',
      secondary: '#8C95A4'
    },
  },
  components: {
   
    MuiTypography: {
        styleOverrides: {
          
        }
      }
    }
  });
