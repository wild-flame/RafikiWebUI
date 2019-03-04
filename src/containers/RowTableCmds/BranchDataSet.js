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

// RegExp rules
import { validDsAndBranch } from "../../regexp-rules";

// read query-string
import queryString from 'query-string'


const styles = () => ({
  contentWrapper: {
    margin: '10px 16px',
  }
})


class BranchDataSet extends React.Component {
  state = {
    dataset:"",
    branch:"",
    newBranch: "",
    referBranch:"",
    validBranchName: true,
    FormIsValid: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,

    requestListDS: PropTypes.func,
    resetResponses: PropTypes.func,
    resetLoadingBar: PropTypes.func,

    DatasetList: PropTypes.array,

    triggerBranchDS_Combo: PropTypes.func,
    Response_BranchDS: PropTypes.array,

    formState: PropTypes.string,
    loadingFormState: PropTypes.func
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Dataset > Branch Dataset")
    // read the query string from URL
    const values = queryString.parse(this.props.location.search)
    if (values.dataset && values.branch) {
      this.setState({
        dataset: values.dataset,
        referBranch: values.branch
      })
    }
    this.props.requestListDS()
  }

  handleChange = name => event => {
    if (name === "dataset") {
      this.setState({
        newBranch: "",
        referBranch: "",
      })
    }
    if (name === "newBranch") {
      if (
        validDsAndBranch.test(event.target.value) &&
        event.target.value.length <= 50
      ) {
        this.setState({
          validBranchName: true
        });
      } else if (event.target.value === "") {
        this.setState({
          validBranchName: true
        });
      } else {
        this.setState({
          validBranchName: false
        });
      }
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
    const dataEntryForBranchDS = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.newBranch,
        "referBranch": this.state.referBranch
      },
      {}
    )
    this.props.triggerBranchDS_Combo(dataEntryForBranchDS)
  }

  componentDidUpdate(prevProps, prevState) {
    // validate when to enable COMMIT button
    if (
      this.state.dataset !== prevState.dataset ||
      this.state.newBranch !== prevState.newBranch ||
      this.state.referBranch !== prevState.referBranch
    ) {
      if (
        this.state.dataset &&
        this.state.newBranch &&
        this.state.validBranchName &&
        this.state.referBranch
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
      Response_BranchDS,
      formState
    } = this.props;

    return (
      <React.Fragment>
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Typography variant="h5" gutterBottom>
                Branch Dataset
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
                  checkedNewBranch={true}
                  dataset={this.state.dataset}
                  branch={this.state.branch}
                  newBranch={this.state.newBranch}
                  referBranch={this.state.referBranch}
                  onHandleChange={this.handleChange}
                  BranchState={"branch"}
                  onHandleSwitch={() => {}}
                  AllowNewBranch={false}
                  isCorrectInput={this.state.validBranchName}
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
                    <b>{Response_BranchDS[0]}</b>
                    <br />
                    {Response_BranchDS[1]}
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
  Response_BranchDS: state.RowTableCmds.Response_BranchDS,
  formState: state.RowTableCmds.formState
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  resetResponses: actions.resetResponses,
  resetLoadingBar: ConsoleActions.resetLoadingBar,
  triggerBranchDS_Combo: actions.triggerBranchDS_Combo,
  loadingFormState: actions.loadingFormState
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(BranchDataSet)