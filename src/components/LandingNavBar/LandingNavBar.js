import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography"
import AppBar from '../LandingComponents/AppBar';
import Toolbar, { styles as toolbarStyles } from '../LandingComponents/Toolbar';
import Logo from "../../assets/Logo-cleaned.png"
import SignedInLinks from "./SignInLinks"
import SignedOutLinks from "./SignOutLinks"


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
});

class LandingNavBar extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object
  }

  render() {
    const { auth, classes } = this.props;

    const links = auth.uid
      ? <SignedInLinks />
      : <SignedOutLinks />

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
                <Link to="/" className={classes.rightLink}>
                  {'Features'}
                </Link>
              </Typography>
              <Typography
                variant="h5"
              >
                <Link to="/" className={classes.rightLink}>
                  {'Use Cases'}
                </Link>
              </Typography>
              <Typography
                variant="h5"
              >
                <Link to="/" className={classes.rightLink}>
                  {'Docs'}
                </Link>
              </Typography>
              <Typography
                variant="h5"
              >
                <Link to="/" className={classes.rightLink}>
                  {'About Us'}
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

export default withStyles(styles)(LandingNavBar);