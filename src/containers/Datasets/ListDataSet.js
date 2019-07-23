import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"
import { Link } from 'react-router-dom'

import * as ConsoleActions from "../ConsoleAppFrame/actions"
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

    Cache_Version_History: PropTypes.object,
  }

  state = {
    open: false,
    datasetSelected: "",
    branchesSelected: [],
  }

  handleClose = () => {
    this.setState({
      open: false,
      datasetSelected: "",
      branchesSelected: [],
    })
  }

  reloadSizeAndDS = () => {
    this.props.requestListDS()
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Dataset > List Dataset")
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
                  : "Datasets"
              }
            </Typography>
            <ListDataSetTable
              Datasets={DatasetList}
              handleClickHistory={this.handleClickHistory}
            />
          </div>
          {this.state.open &&
            <GitGraphDialog
              open={this.state.open}
              onClose={this.handleClose}
              datasetSelected={this.state.datasetSelected}
              branchesSelected={this.state.branchesSelected}
            />
          }
        </MainContent>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  DatasetList: state.DatasetsReducer.DatasetList,
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  resetLoadingBar: ConsoleActions.resetLoadingBar,
  requestVersionHistory: actions.requestVersionHistory,
  transferCachedHistory: actions.transferCachedHistory,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ListDataSet)
