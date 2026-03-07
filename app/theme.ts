/* This file defines our themes to be used across all pages (fonts, colors)*/

'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#f7f9Fc', /* our standard white shade */
      },
      secondary: {
        main: '#7cb9e8', /* our standard blue shade */
        dark: '#3693F7', /* blue shade a bit darker than the one above. for icons */
      },
      background: {
        default: '#f5f5f5', /* less aggresive white shade for our background */
      },
    },
    typography: {
      fontFamily: 'Sans-Serif',
      fontSize: 15,
      h1: { fontWeight: 500 }, 
      body1: { fontSize: '1rem', lineHeight: 1.6 }
    },
  });

export default theme;
