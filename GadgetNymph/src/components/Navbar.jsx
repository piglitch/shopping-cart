import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';


const pages = ['Home', 'Store', 'About'];
const Lists = ['Home', 'Store', 'About', 'Cart', 'Wishlist']

function Navbar({ wishList, setWishList, cart, setCart }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // Get the current pathname from the location object
  const currentPathname = window.location.pathname; 

  return (
    <AppBar id='Navbar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Inter',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <span className='text-red-500 text-3xl'>Web</span><span className='text-white text-sm'>Nymph</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Lists.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    { page === 'Home' ? <Link to="/">{page}</Link> : <Link to={`/${page}`}>{page}</Link>} 
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          ><Link to={`/`}><span className='text-red-500 text-3xl'>Web</span><span className='text-white text-sm'>Nymph</span></Link>            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                id='navoptions'
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                { page === 'Home' ? (
                  <Link to="/" className={currentPathname === '/' ? 'underlined' : ''}>
                    {page}
                  </Link>
                ) : (
                  <Link to={`/${page}`} className={currentPathname === `/${page}` ? 'underlined' : ''}>
                    {page}
                  </Link>
                )}  
              </Button>
            ))}
          </Box>
          <Box className="flex justify-end gap-10" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Badge color="secondary" variant={ wishList.length > 0 ? 'dot' : '' }>
              <Link to="/wishlist" className={currentPathname === '/wishlist' ? 'wishListClicked' : ''}>
                <FavoriteIcon id='wishlist' />
              </Link>
            </Badge>
            <Badge color="secondary" variant={ cart.length > 0 ? 'dot' : '' }>
              <Link to="/shoppingcart" className={currentPathname === '/shoppingcart' ? 'cartClicked' : ''}>
                <ShoppingCartIcon id='cart'/>
              </Link>
            </Badge>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
Navbar.propTypes = {
  wishList: PropTypes.array,
  setWishList: PropTypes.any,
  cart: PropTypes.array,
  setCart: PropTypes.any,
}
export default Navbar;
