import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = props => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isLoggedIn = props.user;

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = pageURL => {
    if(pageURL == '/users/logout') {
      localStorage.clear()
      window.location = "/";
    } else {
      history.push(pageURL);
    }
  };

  const handleButtonClick = pageURL => {
    if(pageURL == '/users/logout') {
      localStorage.clear()
      window.location = "/";
    } else {
      history.push(pageURL);
    }
  };

  const menuItems =
    isLoggedIn ?
      [
        {
          menuTitle: "Search",
          pageURL: "/search"
        },
        {
          menuTitle: "Logout",
          pageURL: "/users/logout"
        }
      ]
    :
      [
        {
          menuTitle: "Login",
          pageURL: "/login"
        },
        {
          menuTitle: "SignUp",
          pageURL: "/signup"
        }
      ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={() => handleMenuClick("/")}>
            OpenMovies
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map((menuItem, index) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem key={index} onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : (
            <>
              {menuItems.map((menuItem, index) => {
                const { menuTitle, pageURL } = menuItem;
                return (
                  <Button key={index}
                    variant="contained"
                    onClick={() => handleButtonClick(pageURL)}
                  >
                    {menuTitle}
                  </Button>
                );
              })}
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
