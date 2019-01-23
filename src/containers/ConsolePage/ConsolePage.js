import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './Navigator';
import Content from './Content';
import Header from './Header';
import ConsoleTheme from "./ConsoleTheme"
// import { Redirect } from "react-router-dom"

/*
    const { authStatus } = this.props
    if (!authStatus) {
      return <Redirect to="/sign-in" />
    }
*/

const drawerWidth = 256;

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1', // light grey
  },
})

class ConsolePage extends React.Component {
  state = {
    mobileOpen: false,
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={ConsoleTheme}>
        <div className={classes.root}>
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator PaperProps={{ style: { width: drawerWidth } }} />
            </Hidden>
          </nav>
          <div className={classes.appContent}>
            <Header onDrawerToggle={this.handleDrawerToggle} />
            <main className={classes.mainContent}>
              <Content />
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(ConsolePage);
