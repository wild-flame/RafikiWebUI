import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import { compose } from "redux";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography"
import AppBar from '../LandingComponents/AppBar';
// for login menu
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Avatar from '@material-ui/core/Avatar';
import AppBarMenuItems from "./AppBarMenuItems"

import Toolbar, { styles as toolbarStyles } from '../LandingComponents/Toolbar';
import Logo from "../../assets/Logo-cleaned.png"

import * as actions from "../../containers/Root/actions"


const styles = theme => ({
  title: {
    fontSize: 24,
    cursor: "pointer",
    color: "white",
    textDecoration: "none"
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: "center"
  },
  logo: {
    height: 36,
    marginRight: 20
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3,
    textDecoration: "none"
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  },
  iconButtonAvatar: {
    padding: 4,
    marginLeft: theme.spacing.unit * 3,
    textDecoration: "none"
  }
});

class LandingNavBar extends React.Component {
  handleMenuOpen = event => {
    this.props.loginMenuOpen(event.currentTarget.id);
  };

  handleMenuClose = () => {
    this.props.loginMenuClose();
  };

  handleLogout = () => {
    console.log("logging out, clearing token")
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    this.props.history.push(`/`);
    window.location.reload();
  };

  render() {
    const {
      anchorElId,
      isAuthenticated,
      classes
    } = this.props;

    const links = isAuthenticated
      ? (
        <Fragment>
          <Typography
            variant="h6"
          >
            <Link to="/console/row-based-table/list-dataset" className={classes.rightLink}>
              {'Go To Console'}
            </Link>
          </Typography>
          <IconButton
            aria-haspopup="true"
            aria-label="More"
            aria-owns="Open right Menu"
            color="inherit"
            id="loginMenuButton"
            onClick={this.handleMenuOpen}
            className={classes.iconButtonAvatar}
          >
            <Avatar
              className={classes.avatar}
              style={{
                backgroundColor: "orange" //bgColor
              }}
            >
              {"KY" /*initials*/}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={
              (anchorElId && document.getElementById(anchorElId)) ||
              document.body
            }
            id="menuRight"
            onClose={this.handleMenuClose}
            open={!!anchorElId}
          >
            <AppBarMenuItems
              isAuth={isAuthenticated}
              logout={this.handleLogout}
              onClick={this.handleMenuClose}
            />
          </Menu>
        </Fragment>
      )
      : (
        <Fragment>
          <Button
            color="inherit"
            style={{
              textDecoration: "none",
              fontSize: 16,
            }}
            component={Link}
            to={"/sign-in"}
          >
            Sign in
          </Button>
        </Fragment>
      )

    // use complex button from MUI for hover effects
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <div className={classes.left}>
              <Link to="/">
                <img alt="logo" src={Logo} className={classes.logo} />
              </Link>
              <Typography
                variant="h6"
              >
                <Link to="/" className={classes.title}>
                  {'ForkBase'}
                </Link>
              </Typography>
              <Typography
                variant="h5"
              >
                <Link to="/demo-features" className={classes.rightLink}>
                  {'Demo'}
                </Link>
              </Typography>
              <Typography
                variant="h5"
              >
                <Link to="/publications" className={classes.rightLink}>
                  {'Publications'}
                </Link>
              </Typography>
              <Typography
                variant="h5"
              >
                <Link to="/documentations" className={classes.rightLink}>
                  {'Docs'}
                </Link>
              </Typography>
              <Typography
                variant="h5"
              >
                <Link to="/contact" className={classes.rightLink}>
                  {'Contact'}
                </Link>
              </Typography>
            </div>
            {links}
          </Toolbar>
        </AppBar>
        <div className={classes.placeholder} />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  anchorElId: state.Root.dropdownAnchorElId,
  isAuthenticated: state.Root.token !== null,
  // initials: state.firebaseReducer.profile.initials,
  // bgColor: state.firebaseReducer.profile.color
});

const mapDispatchToProps = {
  loginMenuOpen: actions.loginMenuOpen,
  loginMenuClose: actions.loginMenuClose,
}


export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withStyles(styles)
)(LandingNavBar);
