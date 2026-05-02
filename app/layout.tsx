/*This file is the skeleton of our app, what is in here stays on every page*/

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import StyledRoot  from './styledRoot';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import { Box } from '@mui/material';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <AppRouterCacheProvider>
        <AuthProvider>
        <StyledRoot>
          <Navbar/>
          < Box component="main" sx={{ flexGrow: 1, mb: 6}}>
        {children}
        </Box>
        <Footer/>
        </StyledRoot>
        </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
