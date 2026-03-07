/*This file is the skeleton of our app, what is in here stays on every page*/

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import StyledRoot  from './styledRoot';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

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
        {children}
        </StyledRoot>
        </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
