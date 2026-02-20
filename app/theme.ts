/* This file defines our themes to be used across all pages (fonts, colors)*/

'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#f4f7f6',
      },
      background: {
        default: '#F5F5F5',
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
