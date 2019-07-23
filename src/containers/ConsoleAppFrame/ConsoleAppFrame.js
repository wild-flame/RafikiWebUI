import React from 'react';
import { connect } from "react-redux"
import { compose } from "redux"
import PropTypes from 'prop-types';
import { Route, Redirect } from "react-router-dom"

import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import Header from '../../components/ConsoleHeader/Header';
import Navigator from '../../components/ConsoleSideBar/Navigator';
import ConsoleTheme from "./ConsoleTheme"
import StorageBar from "../../components/ConsoleContents/StorageBar"

import PutDataByCSV from "../Datasets/UploadDataset"
import ListDataSet from "../Datasets/ListDataSet"
import PutDataEntry from "../Datasets/PutDataEntry"
import GetDataSet from "../Datasets/GetDataSet"
import GetDatasetSchema from "../Datasets/GetDatasetSchema"
import GetDataEntry from "../Datasets/GetDataEntry"
import DiffDataSet from "../Datasets/DiffDataSet"
import DeleteDataSet from "../Datasets/DeleteDataSet"
import ExportDataSet from "../Datasets/ExportDataSet"
import BranchDataSet from "../Datasets/BranchDataSet"

import * as actions from "./actions"

import LoadingBar from 'react-redux-loading-bar'


const drawerWidth = 256;

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
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
      authStatus,
      classes,
      handleDrawerToggle,
      headerTitle,
      mobileOpen,
      DBSize,
      StorageBarStatus
    } = this.props;

 //   if (!authStatus) {
 //     return <Redirect to="/sign-in" />
 //   }

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
            <Hidden mdUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            </Hidden>
            <Hidden smDown implementation="css">
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
              path='/console/datasets/list-dataset'
              component={ListDataSet}
            />
            <Route
              exact
              path='/console/datasets/upload-datasets'
              component={PutDataByCSV}
            />
            <Route
              exact
              path='/console/datasets/put-data-entry'
              component={PutDataEntry}
            />
            <Route
              exact
              path='/console/datasets/branch-dataset'
              component={BranchDataSet}
            />
            <Route
              exact
              path='/console/datasets/get-dataset'
              component={GetDataSet}
            />
            <Route
              exact
              path='/console/datasets/get-dataset-schema'
              component={GetDatasetSchema}
            />
            <Route
              exact
              path='/console/datasets/get-data-entry'
              component={GetDataEntry}
            />
            <Route
              exact
              path='/console/datasets/diff-dataset'
              component={DiffDataSet}
            />
            <Route
              exact
              path='/console/datasets/delete-dataset'
              component={DeleteDataSet}
            />
            <Route
              exact
              path='/console/datasets/export-dataset'
              component={ExportDataSet}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  authStatus: !!state.Root.token,
  mobileOpen: state.ConsoleAppFrame.mobileOpen,
  headerTitle: state.ConsoleAppFrame.headerTitle,
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
