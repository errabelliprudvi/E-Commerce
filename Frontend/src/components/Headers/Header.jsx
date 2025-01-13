import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartCheckoutSharpIcon from '@mui/icons-material/ShoppingCartCheckoutSharp';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Badge, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import img from '../../assets/react.svg';
import { useUser } from '../../UserProvider';

export default function Header({userId}) {
  //const userId = localStorage.getItem('userId');
  const { user, itemsInCart } = useUser();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust for small screens (600px or below)

  const [menuAnchor, setMenuAnchor] = React.useState(null);
  const openMenu = (event) => setMenuAnchor(event.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'linear-gradient(90deg, rgba(33,150,243,1) 0%, rgba(0,230,118,1) 50%, rgba(0,212,255,1) 100%)',
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img
            src={img}
            alt="Logo"
            style={{
              width: isMobile ? '40px' : '50px', // Scale logo for smaller screens
              height: isMobile ? '40px' : '50px',
            }}
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: isMobile ? '1.2rem' : '1.5rem', // Adjust font size dynamically
            }}
          >
            E-Commerce
          </Typography>
        </Box>

        {/* Navigation Links */}
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={openMenu}
              aria-label="Open navigation menu"
            >
              <MenuIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
              <MenuItem component={Link} to="/" onClick={closeMenu}>
                Home
              </MenuItem>
              <MenuItem component={Link} to="/shop" onClick={closeMenu}>
                Shop
              </MenuItem>
              <MenuItem component={Link} to="/about" onClick={closeMenu}>
                About Us
              </MenuItem>
              <MenuItem component={Link} to="/contact" onClick={closeMenu}>
                Contact Us
              </MenuItem>
              <MenuItem component={Link} to="/adminDash" onClick={closeMenu}>
                Admin
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button component={Link} to="/" color="inherit" sx={{ fontSize: '1.1rem', textTransform: 'capitalize' }}>
              Home
            </Button>
            <Button component={Link} to="/shop" color="inherit" sx={{ fontSize: '1.1rem', textTransform: 'capitalize' }}>
              Shop
            </Button>
            <Button component={Link} to="/about" color="inherit" sx={{ fontSize: '1.1rem', textTransform: 'capitalize' }}>
              About Us
            </Button>
            <Button component={Link} to="/contact" color="inherit" sx={{ fontSize: '1.1rem', textTransform: 'capitalize' }}>
              Contact Us
            </Button>
            <Button component={Link} to="/adminDash" color="inherit" sx={{ fontSize: '1.1rem', textTransform: 'capitalize' }}>
              Admin
            </Button>
          </Box>
        )}

        {/* Profile and Cart Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* User Profile or Login */}
          {userId ? (
            <IconButton
              component={Link}
              to="/user/profile"
              color="inherit"
              aria-label="User profile"
            >
              <PersonIcon sx={{ fontSize: isMobile ? 25 : 30 }} />
            </IconButton>
          ) : (
            <Button component={Link} to="/login" color="inherit" sx={{ fontSize: '1rem', textTransform: 'capitalize' }}>
              Login
            </Button>
          )}

          {/* Cart Icon */}
          <IconButton
            component={Link}
            to="/cart"
            color="inherit"
            aria-label="View cart"
          >
            <Badge badgeContent={itemsInCart} color="error">
              <ShoppingCartCheckoutSharpIcon sx={{ fontSize: isMobile ? 25 : 30 }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
