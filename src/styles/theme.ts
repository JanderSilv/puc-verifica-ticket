import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { DM_Sans } from 'next/font/google'

export const dmSansFont = DM_Sans({ subsets: ['latin'] })

export const makeTheme = () =>
  createTheme({
    palette: {
      text: {
        primary: '#02073E',
      },
      background: {
        default: '#F9F9F9',
      },
    },
    typography: {
      fontFamily: dmSansFont.style.fontFamily,
      htmlFontSize: 10,
      h1: {
        fontSize: '6.4rem',
        fontWeight: 'bold',
      },
      h2: {
        fontSize: '3rem',
        fontWeight: 'bold',
      },
      h3: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
      },
      h4: {
        fontSize: '2rem',
        fontWeight: 'bold',
      },
      h5: {
        fontSize: '1.6rem',
        fontWeight: 'bold',
      },
      h6: {
        fontSize: '1.4rem',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            fontSize: '62.5%',
          },
          body: {
            fontFamily: dmSansFont.style.fontFamily,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
        defaultProps: {
          sx: {
            padding: 1,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 10,
          },
        },
      },
    },
  })
