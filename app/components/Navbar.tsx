/* This is the navigation bar component to be used on every page of the app*/
'use client';
import { useState } from 'react'
import {Box, AppBar, Toolbar, Typography, Container, Button, List, ListItem, ListItemButton, ListItemText, IconButton} from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import MenuIcon from '@mui/icons-material/Menu';
import { useMediaQuery, useTheme, Drawer } from '@mui/material'
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';


const Navbar = () => {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const drawerLinks = () => {
    if (!user) {
      return [
        {
          text: "Home",
          link: "/"
        },
        {
          text: "Contact",
          link: "/contact"
        },
        {
          text: "Login",
          link: "/login"
        }
      ];
    } else if (user.role == 'admin') {
      return [
        {
          text: "Dashboard",
          link: "/dashboard"
        },
        {
          text: "Schedule",
          link: "/admin/schedule"
        },
        {
          text: "Students",
          link: "/studentInfo"
        },
        {
          text: "Tutors",
          link: "/tutorInfo"
        },
        {
          text: "Logout",
          link: "#"
        },
       
      ];
    } else if (user.role == 'tutor') {
      return [{
        text: "Dashboard",
        link: "/dashboard"
      },
      {
        text: "Calendar",
        link: "/calendar"
      },
      {
        text: "Students",
        link: "/studentInfo"
      },
      {
          text: "Logout",
          link: "#"
      }
        
      ];
    } else {
      return [{
        text: "Dashboard",
        link: "/dashboard"
      },
      {
        text: "Calendar",
        link: "/calendar"
      },
       {
          text: "Logout",
          link: "#"
        }
     
      ];
    }
  };

const links = drawerLinks();
const router = useRouter();

const handleClick = (text: string) => {
  if (text == "Logout"){
    logout();
    router.push('/');
  }
}

  return (
    <>
      <AppBar position="static" sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'secondary.main' }}>
        <Container maxWidth="xl" disableGutters>
          <Toolbar>
            <SchoolIcon sx={{color: 'primary.main'}}/>
            <Typography variant="h5" fontWeight={'bold'} sx={{ flexGrow: 1, color: 'primary.main' }} >
              ElevateEdu
            </Typography>

            {isMobile && (<IconButton sx={{color: 'primary.main'}} onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>)}

            {!isMobile && links.map((link, index) =>(
              
                <Button key= {index} href={link.link !== "#" ? link.link : undefined}
                onClick={link.text === "Logout" ? () => handleClick(link.text) : undefined} variant='text' sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'primary.main', mx: 1} }>
                 {link.text}
                </Button>
              
            ))
            }

          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)} >
          <List>
            {links.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component="a"
                  href={link.link !== "#" ? link.link : undefined}
                  onClick={link.text == "Logout" ? () => handleClick(link.text) : undefined}
                  aria-label={'Navigate to ${link.text}'}
                >
                  <ListItemText primary={link.text} />
                </ListItemButton>

              </ListItem>
            ))}
          </List>

        </Box>
      </Drawer>

    </>

  )
}
export default Navbar;