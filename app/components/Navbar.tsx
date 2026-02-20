/* This is the navigation bar component to be used on every page of the app*/ 
'use client';
import { useState } from 'react'
import { Box, AppBar, Toolbar, Typography, Container, Button, List, ListItem, ListItemButton
,ListItemText,IconButton} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme, Drawer } from '@mui/material'


const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()

  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }
  const drawerLinks = [{
    text: "Home",
    link: "/"
  },
  {
    text: "Login",
    link: "/login"
  },
  {
    text: "Contact",
    link: "/contact"
  }]

  return (
    <>
      <AppBar position="static" color="primary" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Container>
          <Toolbar>
            <SchoolIcon />
            <Typography variant="h6" fontWeight={'bold'}  sx={{ flexGrow: 1}} >
               ElevateEdu
            </Typography>

            {isMobile && (<IconButton color='inherit' onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>)}
            {!isMobile && (
              <>
                <Button color="inherit" href="/" variant='text' sx={{fontWeight:'bold'}}>
                  Home
                </Button>
                <Button color="inherit" href="/contact" variant='text' sx={{fontWeight:'bold'}}>
                  Contact
                </Button>
                <Button color="inherit" href="/login" variant='text' sx={{fontWeight:'bold'}}>
                  Login
                </Button>
              </>
            )
            }

          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)} >
          <List>
            {drawerLinks.map((linkItem, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component="a"
                  href={linkItem.link}
                  onClick={toggleDrawer(false)}
                  aria-label={'Navigate to ${linkItem.text}'}
                >
                  <ListItemText primary={linkItem.text} />
                </ListItemButton>

              </ListItem>
            ))}
          </List>

        </Box>
      </Drawer>

    </>

  )
}
export default Navbar