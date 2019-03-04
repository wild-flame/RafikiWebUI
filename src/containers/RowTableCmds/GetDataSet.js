import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"

import * as ConsoleActions from "../ConsoleAppFrame/actions"
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
import GetDatasetResponse from "../../components/ConsoleContents/GetDatasetResponse"

// read query-string
import queryString from 'query-string'


const styles = () => ({
  contentWrapper: {
    margin: '10px 16px',
  }
})


class GetDataSet extends React.Component {
  state = {
    dataset:"",
    branch:"master",
    FormIsValid: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    requestGetDataset: PropTypes.func,
    requestListDS: PropTypes.func,
    resetResponses: PropTypes.func,
    resetLoadingBar: PropTypes.func,

    DatasetList: PropTypes.array,

    Response_GetDataset: PropTypes.array,

    formState: PropTypes.string,
    loadingFormState: PropTypes.func
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Dataset > Get Dataset")
    // read the query string from URL
    const values = queryString.parse(this.props.location.search)
    if (values.dataset && values.branch) {
      this.setState({
        dataset: values.dataset,
        branch: values.branch
      })
    }
    this.props.requestListDS()
  }

  handleChange = name => event => {
    if (name === "dataset") {
      this.setState({
        branch: "master"
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
    const dataEntryForGetDS = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.branch
      },
      {}
    )
    this.props.requestGetDataset(dataEntryForGetDS)
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
  }

  componentWillUnmount() {
    this.props.resetResponses()
    this.props.resetLoadingBar()
  }

  render() {
    const {
      classes,
      DatasetList,
      Response_GetDataset,
      formState
    } = this.props;

    return (
      <React.Fragment>
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Typography variant="h5" gutterBottom>
                Get Dataset
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
                    <b>{Response_GetDataset[0]}</b>
                    <br />
                  </Typography>
                  <GetDatasetResponse
                    entries={Response_GetDataset[1]}
                    dataset={this.state.dataset}
                    branch={this.state.branch}
                  />
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
  Response_GetDataset: state.RowTableCmds.Response_GetDataset,
  formState: state.RowTableCmds.formState
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  requestGetDataset: actions.requestGetDataset,
  resetResponses: actions.resetResponses,
  resetLoadingBar: ConsoleActions.resetLoadingBar,
  loadingFormState: actions.loadingFormState
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(GetDataSet)