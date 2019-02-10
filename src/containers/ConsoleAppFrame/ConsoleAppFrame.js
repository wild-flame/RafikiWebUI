import React from 'react';
import { connect } from "react-redux"
import { compose } from "redux"
import PropTypes from 'prop-types';
import { Route } from "react-router-dom"

import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import Header from '../../components/ConsoleHeader/Header';
import Navigator from '../../components/ConsoleSideBar/Navigator';
import ConsoleTheme from "./ConsoleTheme"

import DatabaseOverview from "../DatabaseOverview/DatabaseOverview"

import PutDataByCSV from "../RowTableCmds/PutDataByCSV"
import ListDataSet from "../RowTableCmds/ListDataSet"
import PutDataEntry from "../RowTableCmds/PutDataEntry"
import GetDataSet from "../RowTableCmds/GetDataSet"
import GetDatasetSchema from "../RowTableCmds/GetDatasetSchema"
import GetDataEntry from "../RowTableCmds/GetDataEntry"
import DiffDataSet from "../RowTableCmds/DiffDataSet"
import DeleteDataSet from "../RowTableCmds/DeleteDataSet"
import ExportDataSet from "../RowTableCmds/ExportDataSet"


import * as actions from "./actions"

import LoadingBar from 'react-redux-loading-bar'

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

class ConsoleAppFrame extends React.Component {
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
        <LoadingBar style={{ backgroundColor: 'orange', zIndex: 2000 }} />
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
              component={DatabaseOverview}
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
            <Route
              exact
              path='/console/row-based-table/get-dataset'
              component={GetDataSet}
            />
            <Route
              exact
              path='/console/row-based-table/get-dataset-schema'
              component={GetDatasetSchema}
            />
            <Route
              exact
              path='/console/row-based-table/get-data-entry'
              component={GetDataEntry}
            />
            <Route
              exact
              path='/console/row-based-table/diff-dataset'
              component={DiffDataSet}
            />
            <Route
              exact
              path='/console/row-based-table/delete-dataset'
              component={DeleteDataSet}
            />
            <Route
              exact
              path='/console/row-based-table/export-dataset'
              component={ExportDataSet}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  mobileOpen: state.ConsoleAppFrame.mobileOpen,
  headerTitle: state.ConsoleAppFrame.headerTitle
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
)(ConsoleAppFrame);
