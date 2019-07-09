import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"
import { Link } from 'react-router-dom'

import * as ConsoleActions from "../ConsoleAppFrame/actions"
import * as OverviewActions from "../StorageOverview/actions"
import * as actions from "./actions"

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"

import GitGraphDialog from "../../components/GitGraphComponents/GitGraphDialog"
import ListDataSetTable from '../../components/ConsoleContents/ListDataSetTable'


const styles = theme => ({
  block: {
    display: 'block',
  },
  addDS: {
    marginRight: theme.spacing.unit,
  },
  contentWrapper: {
    margin: '40px 16px',
    //position: "relative",
    minHeight: 200,
  },
})


class ListDataSet extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleHeaderTitleChange: PropTypes.func,
    DatasetList: PropTypes.array,
    requestListDS: PropTypes.func,
    requestDBSize: PropTypes.func,
    resetLoadingBar: PropTypes.func,

    requestVersionHistory: PropTypes.func,
    Response_Version_History: PropTypes.object,

    Cache_Version_History: PropTypes.object,
    clearVersionHistory: PropTypes.func
  }

  state = {
    open: false,
    datasetSelected: "",
    branchesSelected: [],
  }

  handleClickHistory = item => {
    console.log("View history of: ", item)
    this.setState({
      open: true,
      datasetSelected: item.dataset,
      branchesSelected: item.branches,
    })
    // transfer cached part of cache_version_history to
    // Response_Version_History
    this.props.transferCachedHistory(item)
  }

  handleClose = () => {
    this.setState({
      open: false,
      datasetSelected: "",
      branchesSelected: [],
    })
  }

  reloadSizeAndDS = () => {
    this.props.requestDBSize()
    this.props.requestListDS()
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Dataset > List Dataset")
    this.props.requestDBSize()
    this.props.requestListDS()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.DatasetList !== this.props.DatasetList) {
      if (this.props.DatasetList) {
          for (let item of this.props.DatasetList) {
            // sagas for version history
            this.props.requestVersionHistory(item)
          }
      }
    }
  }

  componentWillUnmount() {
    this.props.resetLoadingBar()
  }

  render() {
    const {
      classes,
      DatasetList,
      Response_Version_History,
      clearVersionHistory,
      Cache_Version_History
    } = this.props;

    return (
      <React.Fragment>
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Grid container spacing={16} justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h5" gutterBottom>
                    List Dataset
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.addDS}
                    component={Link}
                    to="/console/datasets/upload-datasets?addNewDS=TRUE"
                  >
                    Add Dataset
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={this.reloadSizeAndDS}
                    >
                      <RefreshIcon className={classes.block} color="inherit" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </ContentBar>
          <div className={classes.contentWrapper}>
            <Typography color="textSecondary" align="center">
              {DatasetList.length === 0
                  ? "You do not have any dataset"
                  : "Datasets and Branches"
              }
            </Typography>
            <ListDataSetTable
              DatasetList={DatasetList}
              handleClickHistory={this.handleClickHistory}
              Cache_Version_History={Cache_Version_History}
            />
          </div>
          {this.state.open &&
            <GitGraphDialog
              open={this.state.open}
              onClose={this.handleClose}
              datasetSelected={this.state.datasetSelected}
              branchesSelected={this.state.branchesSelected}
              Response_Version_History={Response_Version_History}
              clearVersionHistory={clearVersionHistory}
            />
          }
        </MainContent>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  DatasetList: state.RowTableCmds.DatasetList,
  Response_Version_History: state.RowTableCmds.Response_Version_History,
  Cache_Version_History: state.RowTableCmds.Cache_Version_History
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  requestDBSize: OverviewActions.requestDBSize,
  resetLoadingBar: ConsoleActions.resetLoadingBar,
  requestVersionHistory: actions.requestVersionHistory,
  clearVersionHistory: actions.clearVersionHistory,
  transferCachedHistory: actions.transferCachedHistory,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ListDataSet)