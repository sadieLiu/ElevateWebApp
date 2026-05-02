/* This file defines our themes to be used across all pages (fonts, colors)*/

'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffffe0', /* our standard white shade */
        dark: '#f5f5f5', /* white shade darker than the one above */
      },
      secondary: {
        main: '#0e578b', /* our standard blue shade */
        dark: '#11447c', /* blue shade a bit darker than the one above for icons */
      },
      background: {
        default: '#f5f5f5', /* bg matches primary dark */
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
