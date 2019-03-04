import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"

import * as ConsoleActions from "../ConsoleAppFrame/actions"
import * as OverviewActions from "../StorageOverview/actions"
import * as actions from "./actions"

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"
import DatasetName from "../../components/ConsoleContents/DatasetName"
import BranchName from "../../components/ConsoleContents/BranchName"
import ForkbaseStatus from "../../components/ConsoleContents/ForkbaseStatus"

// read query-string
import queryString from 'query-string'


const styles = () => ({
  contentWrapper: {
    margin: '10px 16px',
  }
})


class DeleteDataSet extends React.Component {
  state = {
    dataset:"",
    branch:"",
    FormIsValid: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    requestDeleteDataset: PropTypes.func,
    resetResponses: PropTypes.func,

    requestListDS: PropTypes.func,
    requestDBSize: PropTypes.func,
    resetLoadingBar: PropTypes.func,

    DatasetList: PropTypes.array,

    Response_DeleteDS: PropTypes.array,

    formState: PropTypes.string,
    loadingFormState: PropTypes.func
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Dataset > Delete Dataset")
    this.props.requestDBSize()
    // read the query string from URL
    const values = queryString.parse(this.props.location.search)
    if (values.dataset) {
      this.setState({
        dataset: values.dataset
      })
    }
    this.props.requestListDS()
  }

  handleChange = name => event => {
    if (name === "dataset") {
      this.setState({
        branch: ""
      })
    }
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCommit = () => {
    // reset the ForkBase Status field:
    this.props.resetResponses()
    // first reset COMMIT disabled
    this.setState({
      FormIsValid: false
    })
    // set formState to loading
    this.props.loadingFormState()
    // create inputs
    const dataEntryForDeleteDS = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.branch
      },
      {}
    )
    // reset dataset ro prevent BranchName from crashing
    this.setState({
      dataset: ""
    })
    // dispatch DeleteSD
    this.props.requestDeleteDataset(dataEntryForDeleteDS)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.dataset !== prevState.dataset ||
      this.state.branch !== prevState.branch
    ) {
      if (
        this.state.dataset &&
        this.state.branch
      ) {
        this.setState({
          FormIsValid: true
        })
      } else {
        this.setState({
          FormIsValid: false
        })
      }
    }
    // for DS commands with updates,
    // call ls-ds again after result from ustore has returned
    if (prevProps.formState !== this.props.formState) {
      if (this.props.formState === "idle") {
        this.props.requestListDS()
      }
    }
  }

  componentWillUnmount() {
    this.props.resetResponses()
    this.props.resetLoadingBar()
  }

  render() {
    const {
      classes,
      DatasetList,
      Response_DeleteDS,
      formState
    } = this.props;

    return (
      <React.Fragment>
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Typography variant="h5" gutterBottom>
                Delete Dataset
              </Typography>
            </Toolbar>
          </ContentBar>
          <div className={classes.contentWrapper}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <DatasetName
                  title="1. Dataset Name"
                  dsList={DatasetList}
                  checkedNewDataset={false}
                  dataset={this.state.dataset}
                  newDataset=""
                  onHandleChange={this.handleChange}
                  DatasetState={"dataset"}
                  onHandleSwitch={this.handleSwitch}
                  AllowNewDataset={false}
                  isCorrectInput={true}
                />
                <br />
                <BranchName
                  title="2. Branch Name"
                  dsList={DatasetList}
                  checkedNewDataset={false}
                  checkedNewBranch={this.state.checkedNewBranch}
                  dataset={this.state.dataset}
                  branch={this.state.branch}
                  newBranch={this.state.newBranch}
                  referBranch={this.state.referBranch}
                  onHandleChange={this.handleChange}
                  BranchState={"branch"}
                  onHandleSwitch={this.handleSwitch}
                  AllowNewBranch={false}
                  isCorrectInput={true}
                />
                <br />
                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleCommit}
                    disabled={!this.state.FormIsValid || formState === "loading"}
                  >
                    COMMIT
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <ForkbaseStatus
                  formState={formState}
                >
                  {formState === "loading" &&
                    <React.Fragment>
                      <LinearProgress color="secondary" />
                      <br />
                    </React.Fragment>
                  }
                  <Typography component="p">
                    <b>{Response_DeleteDS[0]}</b>
                    <br />
                    {Response_DeleteDS[1]}
                  </Typography>
                  <br />
                </ForkbaseStatus>
              </Grid>
            </Grid>
          </div>
        </MainContent>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  DatasetList: state.RowTableCmds.DatasetList,
  Response_DeleteDS: state.RowTableCmds.Response_DeleteDS,
  formState: state.RowTableCmds.formState
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  requestDeleteDataset: actions.requestDeleteDataset,
  resetResponses: actions.resetResponses,
  resetLoadingBar: ConsoleActions.resetLoadingBar,
  requestDBSize: OverviewActions.requestDBSize,
  loadingFormState: actions.loadingFormState
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(DeleteDataSet)