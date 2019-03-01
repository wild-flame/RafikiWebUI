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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from '@material-ui/core/Switch';

import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"
import CsvDropzone from "../../components/ConsoleContents/CsvDropzone"
import DatasetName from "../../components/ConsoleContents/DatasetName"
import BranchName from "../../components/ConsoleContents/BranchName"
import ForkbaseStatus from "../../components/ConsoleContents/ForkbaseStatus"

// RegExp rules
import { validDsAndBranch } from "../../regexp-rules";

// Forkbase Status
import UploadProgressBar from "../../components/ConsoleContents/UploadProgressBar"

// read query-string
import queryString from 'query-string'


const styles = () => ({
  contentWrapper: {
    margin: '10px 16px',
  }
})


class PutDataByCSV extends React.Component {
  state = {
    checkedNewDataset: false,
    checkedNewBranch: false,
    checkedWithSchema: true,
    dataset:"",
    newDataset:"",
    branch:"master",
    newBranch:"",
    referBranch:"",
    files: [],
    validDsName: true,
    validBranchName: true,
    FormIsValid: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    triggerCreateDS_PutCSV_Combo: PropTypes.func,
    triggerBranchDS_PutCSV_Combo: PropTypes.func,
    triggerPutCSV_Combo: PropTypes.func,
    resetResponses: PropTypes.func,
    resetLoadingBar: PropTypes.func,

    DatasetList: PropTypes.array,

    Response_PutDataCSV: PropTypes.array,
    Response_CreateDS: PropTypes.array,
    Response_BranchDS: PropTypes.array,
    Response_UploadCSV: PropTypes.string,

    requestListDS: PropTypes.func,
    requestDBSize: PropTypes.func,

    percentCompleted: PropTypes.number,

    formState: PropTypes.string,
    loadingFormState: PropTypes.func
  }

  handleChange = name => event => {
    if (name === "newDataset") {
      if (
        validDsAndBranch.test(event.target.value) &&
        event.target.value.length <= 50
      ) {
        this.setState({
          validDsName: true
        });
      } else if (event.target.value === "") {
        this.setState({
          validDsName: true
        });
      } else {
        this.setState({
          validDsName: false
        });
      }
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
    if (name === "dataset") {
      this.setState({
        branch: "master",
        checkedNewBranch: false
      })
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

  onDrop = (files) => {
    this.setState({files});
  }

  handleRemoveCSV = () => {
    this.setState({
      files: []
    })
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Dataset > Put Data By CSV")
    this.props.requestDBSize()
    // read the query string from URL
    const values = queryString.parse(this.props.location.search)
    if (values.addNewDS === "TRUE") {
      this.setState({
        checkedNewDataset: true
      })
    } else if (values.dataset) {
      this.setState({
        dataset: values.dataset
      })
    }
    this.props.requestListDS()
  }
  
  handleCommit = () => {
    // reset the ForkBase Status field:
    this.props.resetResponses()
    // first reset COMMIT disabled
    this.setState({
      FormIsValid: false
    })
    // set formState to loading
    this.props.loadingFormState()
    // create different inputs
    const dataEntryForCreateDS = Object.assign(
      {
        "dataset": this.state.newDataset,
        "branch": "master",
      },
      {}
    )
    const dataEntryForBranchDS = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.newBranch,
        "referBranch": this.state.referBranch
      },
      {}
    )
    const dataEntryForCombo_CreateDS = Object.assign(
      {
        "dataset": this.state.newDataset,
        "branch": "master",
        "withSchema": this.state.checkedWithSchema ? "--with-schema" : ""
      },
      {}
    )
    const dataEntryForCombo_BranchDS = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.newBranch,
        "withSchema": this.state.checkedWithSchema ? "--with-schema" : ""
      },
      {}
    )
    const dataEntryForPutCSV = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.branch,
        "withSchema": this.state.checkedWithSchema ? "--with-schema" : ""
      },
      {}
    )
    // Initial FormData
    const formData = new FormData();
    formData.append("file", this.state.files[0]);

    // create new dataset
    if (this.state.checkedNewDataset) {
      // combo_CreateDS_PutCSV()
      this.props.triggerCreateDS_PutCSV_Combo(
        dataEntryForCreateDS,
        formData,
        dataEntryForCombo_CreateDS
        // filepath will be added in sagas
      )
    // create new branch
    } else if (this.state.checkedNewBranch) {
      // combo_BranchDS_PutCSV()
      this.props.triggerBranchDS_PutCSV_Combo(
        dataEntryForBranchDS,
        formData,
        dataEntryForCombo_BranchDS
      )
    } else {
      // combo_putCSV()
      this.props.triggerPutCSV_Combo(
        formData,
        dataEntryForPutCSV
      )
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.checkedNewDataset !== prevState.checkedNewDataset) {
      if (this.state.checkedNewDataset) {
        this.setState({
          checkedNewBranch: false,
          newBranch: "",
          branch: "master"
        })
      } else if (!this.state.checkedNewDataset) {
        this.setState({
          newDataset: ""
        })
      }
    }
    if (this.state.checkedNewBranch !== prevState.checkedNewBranch) {
      if (this.state.checkedNewBranch) {
        this.setState({
          checkedNewDataset: false,
          newDataset: ""
        })
      } else if (!this.state.checkedNewBranch) {
        this.setState({
          newBranch: ""
        })
      }
    }
    if (
      this.state.checkedNewDataset !== prevState.checkedNewDataset ||
      this.state.checkedNewBranch !== prevState.checkedNewBranch ||
      this.state.dataset !== prevState.dataset ||
      this.state.newDataset !== prevState.newDataset ||
      this.state.branch !== prevState.branch ||
      this.state.newBranch !== prevState.newBranch ||
      this.state.referBranch !== prevState.referBranch ||
      this.state.files !== prevState.files ||
      this.state.checkedWithSchema !== prevState.checkedWithSchema
    ) {
      if (
        this.state.checkedNewDataset &&
        this.state.newDataset &&
        this.state.branch &&
        this.state.files.length !== 0 &&
        this.state.validDsName
      ) {
        this.setState({
          FormIsValid: true
        })
      } else if (
        this.state.checkedNewBranch &&
        this.state.dataset &&
        this.state.newBranch &&
        this.state.referBranch &&
        this.state.files.length !== 0 &&
        this.state.validBranchName
      ) {
        this.setState({
          FormIsValid: true
        })
      } else if (
        !this.state.checkedNewBranch &&
        !this.state.checkedNewDataset &&
        this.state.dataset &&
        this.state.branch &&
        this.state.files.length !== 0
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
      Response_CreateDS,
      Response_BranchDS,
      Response_UploadCSV,
      Response_PutDataCSV,
      percentCompleted,
      formState
    } = this.props;

    return (
      <React.Fragment>
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Typography variant="h5" gutterBottom>
                Put Data Entry by CSV
              </Typography>
            </Toolbar>
          </ContentBar>
          <div className={classes.contentWrapper}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <DatasetName
                  title="1. Dataset Name"
                  dsList={DatasetList}
                  checkedNewDataset={this.state.checkedNewDataset}
                  dataset={this.state.dataset}
                  newDataset={this.state.newDataset}
                  onHandleChange={this.handleChange}
                  DatasetState={"dataset"}
                  onHandleSwitch={this.handleSwitch}
                  AllowNewDataset={true}
                  isCorrectInput={this.state.validDsName}
                />
                <br />
                <BranchName
                  title="2. Branch Name"
                  dsList={DatasetList}
                  checkedNewDataset={this.state.checkedNewDataset}
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
                <Typography variant="h5" gutterBottom align="center">
                  3. Upload CSV
                </Typography>
                <CsvDropzone
                  files={this.state.files}
                  onCsvDrop={this.onDrop}
                  onRemoveCSV={this.handleRemoveCSV}
                />
                <br />
                <Typography variant="h5" gutterBottom align="center">
                  4. Dataset Schema
                </Typography>
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.checkedWithSchema}
                          onChange={this.handleSwitch("checkedWithSchema")}
                          value="checkedWithSchema"
                        />
                      }
                      label="CSV 1st Row as Schema"
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
                    <br />
                    {this.state.checkedWithSchema
                      ? (
                      <Typography
                        variant="body1"
                        color="secondary"
                        gutterBottom
                        align="center"
                      >
                        CSV First Row as Schema
                      </Typography>
                      )
                      : (
                        <Typography
                          variant="body1"
                          color="primary"
                          gutterBottom
                          align="center"
                        >
                          All rows will be treated as data entry
                        </Typography>
                      )
                    }
                  </Grid>
                </Grid>
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
                    disabled={!this.state.FormIsValid && formState === "loading"}
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
                    <b>{Response_CreateDS[0]}</b>
                    <br />
                    {Response_CreateDS[1]}
                  </Typography>
                  <Typography component="p">
                    <b>{Response_BranchDS[0]}</b>
                    <br />
                    {Response_BranchDS[1]}
                  </Typography>
                  <br />
                  <UploadProgressBar
                    percentCompleted={percentCompleted}
                    fileName={Response_UploadCSV
                      ? this.state.files[0]["name"]
                      : ""
                    }
                    formState={formState}
                  />
                  <br />
                  <Typography component="p">
                    <b>{Response_PutDataCSV[0]}</b>
                    <br />
                    {Response_PutDataCSV[1]}
                    <br />
                    {Response_PutDataCSV[2]}
                  </Typography>
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
  Response_PutDataCSV: state.RowTableCmds.Response_PutDataCSV,
  Response_CreateDS: state.RowTableCmds.Response_CreateDS,
  Response_BranchDS: state.RowTableCmds.Response_BranchDS,
  Response_UploadCSV: state.RowTableCmds.Response_UploadCSV,
  percentCompleted: state.RowTableCmds.percentCompleted,
  formState: state.RowTableCmds.formState
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  triggerCreateDS_PutCSV_Combo: actions.triggerCreateDS_PutCSV_Combo,
  triggerBranchDS_PutCSV_Combo: actions.triggerBranchDS_PutCSV_Combo,
  triggerPutCSV_Combo: actions.triggerPutCSV_Combo,
  resetResponses: actions.resetResponses,
  resetLoadingBar: ConsoleActions.resetLoadingBar,
  requestDBSize: OverviewActions.requestDBSize,
  loadingFormState: actions.loadingFormState
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(PutDataByCSV)
