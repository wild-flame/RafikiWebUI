import React from 'react';
import { connect } from "react-redux"
import { compose } from "redux"
import PropTypes from 'prop-types';
import { Route } from "react-router-dom"

import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import Navigator from '../../components/ConsoleSideBar/Navigator';
import ConsoleTheme from "./ConsoleTheme"
import ConsoleOverviewContent from "./ConsoleOverviewContent"
import PutDataByCSV from "../RowTableCmds/PutDataByCSV"
import ListDataSet from "../RowTableCmds/ListDataSet"
import PutDataEntry from "../RowTableCmds/PutDataEntry"
import Header from '../../components/ConsoleHeader/Header';

import * as actions from "./actions"

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
  static propTypes = {
    classes: PropTypes.object.isRequired,
    mobileOpen: PropTypes.bool,
    headerTitle: PropTypes.string,
    handleDrawerToggle: PropTypes.func,
  }

  render() {
    const {
      classes,
      handleDrawerToggle,
      headerTitle,
      mobileOpen
    } = this.props;

    return (
      <MuiThemeProvider theme={ConsoleTheme}>
        <div className={classes.root}>
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator PaperProps={{ style: { width: drawerWidth } }} />
            </Hidden>
          </nav>
          <div className={classes.appContent}>
            <Header
              onDrawerToggle={handleDrawerToggle}
              title={headerTitle}
            />
            <Route
              exact
              path='/console'
              component={ConsoleOverviewContent}
            />
            <Route
              exact
              path='/console/row-based-table/list-dataset'
              component={ListDataSet}
            />
            <Route
              exact
              path='/console/row-based-table/put-data-by-csv'
              component={PutDataByCSV}
            />
            <Route
              exact
              path='/console/row-based-table/put-data-entry'
              component={PutDataEntry}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  mobileOpen: state.ConsoleOverview.mobileOpen,
  headerTitle: state.ConsoleOverview.headerTitle
})

const mapDispatchToProps = {
  handleDrawerToggle: actions.handleDrawerToggle
}


export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(ConsoleOverview);
