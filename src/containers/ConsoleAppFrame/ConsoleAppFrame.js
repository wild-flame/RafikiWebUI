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
import StorageBar from "../../components/ConsoleContents/StorageBar"

import StorageOverview from "../StorageOverview/StorageOverview"

import PutDataByCSV from "../RowTableCmds/PutDataByCSV"
import ListDataSet from "../RowTableCmds/ListDataSet"
import PutDataEntry from "../RowTableCmds/PutDataEntry"
import GetDataSet from "../RowTableCmds/GetDataSet"
import GetDatasetSchema from "../RowTableCmds/GetDatasetSchema"
import GetDataEntry from "../RowTableCmds/GetDataEntry"
import DiffDataSet from "../RowTableCmds/DiffDataSet"
import DeleteDataSet from "../RowTableCmds/DeleteDataSet"
import ExportDataSet from "../RowTableCmds/ExportDataSet"
import BranchDataSet from "../RowTableCmds/BranchDataSet"

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
})

class ConsoleAppFrame extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    mobileOpen: PropTypes.bool,
    headerTitle: PropTypes.string,
    handleDrawerToggle: PropTypes.func,
    // for StorageBar
    DBSize: PropTypes.string,
    StorageBarStatus: PropTypes.string
  }

  render() {
    const {
      classes,
      handleDrawerToggle,
      headerTitle,
      mobileOpen,
      DBSize,
      StorageBarStatus
    } = this.props;

    return (
      <MuiThemeProvider theme={ConsoleTheme}>
        <LoadingBar
          // only display if the action took longer than updateTime to finish
          // default updateTime = 200ms
          updateTime={300}
          progressIncrease={10}
          style={{
            backgroundColor: '#009688',
            height: 8,
            zIndex: 2000,
            position: "fixed",
            top: 0
          }}
        />
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
            <StorageBar
              StorageSize={DBSize}
              StorageBarStatus={StorageBarStatus}
            />
            <Route
              exact
              path='/console'
              component={StorageOverview}
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
              path='/console/row-based-table/branch-dataset'
              component={BranchDataSet}
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
  headerTitle: state.ConsoleAppFrame.headerTitle,
  DBSize: state.StorageOverview.DBSize,
  StorageBarStatus: state.StorageOverview.StorageBarStatus
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
