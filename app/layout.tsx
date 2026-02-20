/*This file is the skeleton of our app, what is in here stays on every page*/

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import StyledRoot  from './styledRoot';
import Navbar from './components/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <AppRouterCacheProvider>
        <StyledRoot>
          <Navbar/>
        {children}
        </StyledRoot>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
