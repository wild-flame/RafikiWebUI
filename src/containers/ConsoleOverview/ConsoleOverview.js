import React from 'react';
import PropTypes from 'prop-types';
import { Route } from "react-router-dom"
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Navigator from '../../components/ConsoleSideBar/Navigator';
import ConsoleAuth from '../ConsoleAuth/ConsoleAuth';
import Header from '../../components/ConsoleHeader/Header';
import ConsoleTheme from "./ConsoleTheme"
import ConsoleOverviewContent from "./ConsoleOverviewContent"
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

class ConsoleOverview extends React.Component {
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
            <Header
              onDrawerToggle={this.handleDrawerToggle}
              title={"Database Overview"}
            />
            <main className={classes.mainContent}>
              <Route
                exact
                path='/console'
                component={ConsoleOverviewContent}
              />
              <Route
                exact
                path='/console/row-based-table/put-data-by-csv'
                component={() => <h1>put-data-by-csv</h1>}
              />
              <Route
                exact
                path='/console/authentication/users'
                component={ConsoleAuth}
              />
            </main>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}


export default withStyles(styles)(ConsoleOverview);
