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

// zoom addicon
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import AddIcon from "@material-ui/icons/Add";

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
    position: "relative",
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    right: theme.spacing.unit * 0.5,
    zIndex: 10
  }
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

    loadingFormState: PropTypes.func
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
    // set formState to loading
    this.props.loadingFormState()
    // sagas for version history
    this.props.requestVersionHistory(item)
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

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.DatasetList !== this.props.DatasetList) {
  //     this.props.requestDBSize()
  //   }
  // }

  componentWillUnmount() {
    this.props.resetLoadingBar()
  }

  render() {
    const {
      classes,
      DatasetList,
      Response_Version_History
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
                    to="/console/row-based-table/put-data-by-csv?addNewDS=TRUE"
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
            <Zoom in={true} unmountOnExit>
              <Fab
                className={classes.fab}
                color="primary"
                component={Link}
                to="/console/row-based-table/put-data-by-csv?addNewDS=TRUE"
              >
                <AddIcon />
              </Fab>
            </Zoom>
            <Typography color="textSecondary" align="center">
              {DatasetList.length === 0
                  ? "You do not have any dataset"
                  : "Datasets and Branches"
              }
            </Typography>
            <ListDataSetTable
              DatasetList={DatasetList}
              handleClickHistory={this.handleClickHistory}
            />
          </div>
          <GitGraphDialog
            open={this.state.open}
            onClose={this.handleClose}
            datasetSelected={this.state.datasetSelected}
            branchesSelected={this.state.branchesSelected}
            Response_Version_History={Response_Version_History}
          />
        </MainContent>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  DatasetList: state.RowTableCmds.DatasetList,
  Response_Version_History: state.RowTableCmds.Response_Version_History
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  requestDBSize: OverviewActions.requestDBSize,
  resetLoadingBar: ConsoleActions.resetLoadingBar,
  loadingFormState: actions.loadingFormState,
  requestVersionHistory: actions.requestVersionHistory,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ListDataSet)
