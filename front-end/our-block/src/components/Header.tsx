import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppSelector, useAppDispatch} from '../app/hooks';
import {selectTheme, toggle} from '../features/theme/themeSlice';
import {selectUser} from '../features/user/userSlice';
import { Link, useNavigate} from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';



const pages = [{title: 'All Events', link: "/events/AllEvents"}, 
              {title: 'My Events', link: "/events/MyEvents"}];
const settings = [{title: 'Log out', link: "/profile/logout"}];


//Todo: react router dom functionality, multiple pages, wrap everything on a paper so everything gets a theme
//start backend, database, make request for image from pixabay and key from back env, also the key for the map stored on backend env. 
// create store for user, event.
//depending on user login change header, options from right side.
//finish

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //for dark mode toggling
  const dark = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  //for user
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to='/'
            style={{ textDecoration: 'none' }}
            color='inherit'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}

          >
            AroundTheBlock
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
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography 
                  textAlign="center"
                  component={Link}
                  to={page.link}
                  style={{ textDecoration: 'none' }}
                  color='inherit'
                  >{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap       
            component={Link}
            to='/'
            style={{ textDecoration: 'none' }}
            color='inherit'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            AroundTheBlock
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.link}
                style={{ textDecoration: 'none' }}
                color='inherit'
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
              {/* switch button */}
            <IconButton sx={{ ml: 1 }} onClick={()=>dispatch(toggle())} color="inherit">
                    {!dark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {user.loggedIn ?
              (<><Tooltip title="">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" > {user.username[0].toUpperCase()} </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={handleCloseNavMenu}
                component={Link}
                  to={setting.link}
                  style={{ textDecoration: 'none' }}
                  color='inherit'
                >
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>  </>)
            
            :
                (<>
                  <Tooltip title="Sign In">
              <IconButton onClick={()=>{navigate('/profile/signin')}} sx={{ p: 0 }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              </IconButton>
            </Tooltip>
            
                </>)
          }
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;