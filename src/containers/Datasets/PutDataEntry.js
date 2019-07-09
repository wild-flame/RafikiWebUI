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
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';

import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"
import DatasetName from "../../components/ConsoleContents/DatasetName"
import BranchName from "../../components/ConsoleContents/BranchName"
import RowEntryName from "../../components/ConsoleContents/RowEntryName"
import RafikiStatus from "../../components/ConsoleContents/RafikiStatus"

// RegExp rules
import { validDsAndBranch } from "../../regexp-rules";

// read query-string
import queryString from 'query-string'


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
  },
  contentWrapper: {
    margin: '10px 16px',
  }
})


class PutDataEntry extends React.Component {
  state = {
    checkedNewBranch: false,
    dataset:"",
    branch:"master",
    newBranch: "",
    referBranch:"",
    entry: "",
    value:"",
    EntriesLoaded: false,
    EntryArray: [],
    checkedNewEntry: false,
    validBranchName: true,
    validEntryName: true,
    FormIsValid: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    requestPutDE: PropTypes.func,
    resetResponses: PropTypes.func,
    resetLoadingBar: PropTypes.func,
    requestGetDataset: PropTypes.func,

    requestListDS: PropTypes.func,
    requestDBSize: PropTypes.func,

    DatasetList: PropTypes.array,

    Response_PutDE: PropTypes.array,
    Response_BranchDS: PropTypes.array,
    Response_GetDataset: PropTypes.array,
    triggerBranchDS_PutDE_Combo: PropTypes.func,

    formState: PropTypes.string,
    loadingFormState: PropTypes.func,

    requestGetDataEntry: PropTypes.func,
    Response_GetDataEntry: PropTypes.array,

    requestVersionHistory: PropTypes.func,
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Dataset > Put Data Entry")
    this.props.requestDBSize()
    // read the query string from URL
    const values = queryString.parse(this.props.location.search)
    if (values.dataset) {
      this.setState({
        dataset: values.dataset
      })
    }
    if (
      values.dataset &&
      values.branch &&
      values.entry
    ) {
      this.setState({
        dataset: values.dataset,
        branch: values.branch,
        entry: values.entry
      })
    }
    this.props.requestListDS()
  }

  handleChange = name => event => {
    if (name === "dataset") {
      this.setState({
        branch: "",
        newBranch: "",
        referBranch: "",
        entry: "",
        EntriesLoaded: false,
        EntryArray: []
      })
    }
    if (name === "branch" || name === "referBranch") {
      this.setState({
        entry: "",
        EntriesLoaded: false,
        EntryArray: []
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
    if (name === "entry") {
      if (
        //validDsAndBranch.test(event.target.value) &&
        event.target.value.length <= 50
      ) {
        this.setState({
          validEntryName: true
        });
      } else if (event.target.value === "") {
        this.setState({
          validEntryName: true
        });
      } else {
        this.setState({
          validEntryName: false
        });
      }
    }
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSwitch = name => event => {
    this.setState({
      [name]: event.target.checked
    });
  }

  handleCommit = () => {
    // reset the Rafiki Status field:
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
    const dataEntryForCombo_BranchDS = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.newBranch,
        "entry": this.state.entry,
        "value": this.state.value
      },
      {}
    )
    const dataEntryPutDE = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.branch,
        "entry": this.state.entry,
        "value": this.state.value
      },
      {}
    )
    // create new branch
    if (this.state.checkedNewBranch) {
      // combo_BranchDS_PutDE()
      this.props.triggerBranchDS_PutDE_Combo(
        dataEntryForBranchDS,
        dataEntryForCombo_BranchDS
      )
    // or raw put data entry
    } else {
      this.props.requestPutDE(
        dataEntryPutDE
      )
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // when toggle "Create new branch" option, reset state
    if (this.state.checkedNewBranch !== prevState.checkedNewBranch) {
      this.setState({
        branch: "",
        newBranch: "",
        referBranch: "",
        entry: "",
        EntriesLoaded: false,
        EntryArray: []
      })
    }
    // when toggle "Create new entry" option, reset entry state
    if (this.state.checkedNewEntry !== prevState.checkedNewEntry) {
      this.setState({
        entry: ""
      })
    }
    // if referBranch and dataset both selected, call getDS
    if (
      this.state.checkedNewBranch &&
      ((this.state.referBranch !== prevState.referBranch &&
      this.state.dataset !== "" &&
      this.state.referBranch !=="") ||
      (this.state.dataset !== prevState.dataset &&
      this.state.referBranch !== "" &&
      this.state.branch !== ""))
    ) {
      this.setState({
        EntriesLoaded: false
      })
      const dataEntryForGetDS = Object.assign(
        {
          "dataset": this.state.dataset,
          "branch": this.state.referBranch
        },
        {}
      )
      this.props.requestGetDataset(dataEntryForGetDS)
    }
    // if branch and dataset both selected, call getDS
    if (
      (this.state.branch !== prevState.branch &&
      this.state.dataset !== "" &&
      this.state.branch !== "") ||
      (this.state.dataset !== prevState.dataset &&
      this.state.branch !== "")
    ) {
      this.setState({
        EntriesLoaded: false
      })
      const dataEntryForGetDS = Object.assign(
        {
          "dataset": this.state.dataset,
          "branch": this.state.branch
        },
        {}
      )
      this.props.requestGetDataset(dataEntryForGetDS)
    }
    // when GetDataset response arrives, convert to array
    if (
      this.props.Response_GetDataset !== prevProps.Response_GetDataset
    ) {
      if (this.props.Response_GetDataset.length !== 0) {
        // eslint-disable-next-line
        const EntryArray = eval(
          this.props.Response_GetDataset[1].slice(9)
        )
        this.setState({
          EntriesLoaded: true,
          EntryArray
        })
      }
    }
    if (this.state.entry !== prevState.entry) {
      // when referBranch, dataset, and getDS all ready, call getDE
      if (
        this.state.checkedNewBranch &&
        this.state.dataset !== "" &&
        this.state.referBranch !==""
      ) {
        // create inputs
        let dataEntryForGetDataEntry = Object.assign(
          {
            "dataset": this.state.dataset,
            "branch": this.state.referBranch,
            "entry": this.state.entry,
          },
          {}
        )
        this.props.requestGetDataEntry(dataEntryForGetDataEntry)
      }
      // when branch, dataset, and getDS all ready, call getDE
      if (this.state.dataset !== "" &&
        this.state.branch !== ""
      ) {
        // create inputs
        let dataEntryForGetDataEntry = Object.assign(
          {
            "dataset": this.state.dataset,
            "branch": this.state.branch,
            "entry": this.state.entry,
          },
          {}
        )
        this.props.requestGetDataEntry(dataEntryForGetDataEntry)
      }
    }
    // validate when to enable COMMIT button
    if (
      this.state.dataset !== prevState.dataset ||
      this.state.branch !== prevState.branch ||
      this.state.newBranch !== prevState.newBranch ||
      this.state.referBranch !== prevState.referBranch ||
      this.state.entry !== prevState.entry ||
      this.state.value !== prevState.value
    ) {
      if (
        this.state.checkedNewBranch &&
        this.state.dataset &&
        this.state.newBranch &&
        this.state.validBranchName &&
        this.state.referBranch &&
        this.state.entry &&
        this.state.validEntryName &&
        this.state.value
      ) {
        this.setState({
          FormIsValid: true
        })
      } else if (
        !this.state.checkedNewBranch &&
        this.state.dataset &&
        this.state.branch &&
        this.state.entry &&
        this.state.validEntryName &&
        this.state.value
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
      if (this.props.formState === "idle" && prevProps.Response_PutDE.length !== 0) {
        this.props.requestListDS()
      }
    }
  }

  componentWillUnmount() {
    for (let item of this.props.DatasetList) {
      // sagas for version history
      this.props.requestVersionHistory(item)
    }
    this.props.resetResponses()
    this.props.resetLoadingBar()
  }

  render() {
    const {
      classes,
      DatasetList,
      Response_PutDE,
      Response_BranchDS,
      formState,
      Response_GetDataEntry
    } = this.props;

    return (
      <React.Fragment>
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Typography variant="h5" gutterBottom>
                Put Data Entry
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
                  AllowNewBranch={true}
                  isCorrectInput={this.state.validBranchName}
                />
                <br />
                <RowEntryName
                  title="3. Row Entry Key"
                  EntryArray={this.state.EntryArray}
                  checkedNewEntry={this.state.checkedNewEntry}
                  entry={this.state.entry}
                  onHandleChange={this.handleChange}
                  RowEntryState={"entry"}
                  onHandleSwitch={this.handleSwitch}
                  disabled={!this.state.EntriesLoaded}
                  AllowNewEntry={true}
                  isCorrectInput={this.state.validEntryName}
                />
                <br />
                <Typography variant="h5" gutterBottom align="center">
                  4. Value
                </Typography>
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      id="current-value"
                      label="Current-Value"
                      multiline
                      rowsMax={"10"}
                      className={classes.textField}
                      value={
                        Response_GetDataEntry[1]
                        ? (
                          Response_GetDataEntry[1].replace('Value: "', "").slice(0,-2)
                        )
                        : (
                          "Preparing..."
                        )
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      id="put-value"
                      label="Put-Value"
                      multiline
                      rowsMax={"10"}
                      className={classes.textField}
                      value={this.state.value}
                      onChange={this.handleChange("value")}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
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
                <RafikiStatus
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
                  <Typography component="p">
                    <b>{Response_PutDE[0]}</b>
                    <br />
                    {Response_PutDE[1]}
                  </Typography>
                  <br />
                </RafikiStatus>
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
  Response_PutDE: state.RowTableCmds.Response_PutDE,
  Response_BranchDS: state.RowTableCmds.Response_BranchDS,
  Response_GetDataset: state.RowTableCmds.Response_GetDataset,
  formState: state.RowTableCmds.formState,
  Response_GetDataEntry: state.RowTableCmds.Response_GetDataEntry,
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestPutDE: actions.requestPutDE,
  requestListDS: actions.requestListDS,
  triggerBranchDS_PutDE_Combo: actions.triggerBranchDS_PutDE_Combo,
  resetResponses: actions.resetResponses,
  resetLoadingBar: ConsoleActions.resetLoadingBar,
  requestGetDataset: actions.requestGetDataset,
  requestDBSize: OverviewActions.requestDBSize,
  loadingFormState: actions.loadingFormState,
  requestGetDataEntry: actions.requestGetDataEntry,
  requestVersionHistory: actions.requestVersionHistory,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(PutDataEntry)