import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"

import HTTPconfig from "../../HTTPConfig"

import * as ConsoleActions from "../ConsoleAppFrame/actions"
import * as actions from "./actions"

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
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


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  contentWrapper: {
    margin: '10px 16px',
  }
})


class ExportDataSet extends React.Component {
  state = {
    dataset:"",
    branch:"master",
    filename:"",
    filePath:"",
    validFileName: true,
    FormIsValid: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    requestListDS: PropTypes.func,
    resetResponses: PropTypes.func,
    resetLoadingBar: PropTypes.func,

    DatasetList: PropTypes.array,

    requestExportDS: PropTypes.func,
    Response_ExportDS: PropTypes.array,

    formState: PropTypes.string,
    loadingFormState: PropTypes.func
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Dataset > Export Dataset")
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
    if (name === "filename") {
      if (
        validDsAndBranch.test(event.target.value) &&
        event.target.value.length <= 50
      ) {
        this.setState({
          validFileName: true
        });
      } else if (event.target.value === "") {
        this.setState({
          validFileName: true
        });
      } else {
        this.setState({
          validFileName: false
        });
      }
    }
    if (name === "dataset") {
      this.setState({
        branch: "master",
        filename: ""
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
    // append timestamp with UTC time
    const CommitTime = new Date()
    const formatTime = CommitTime
      .toUTCString()
      .replace(/\s+/g, "")
      .replace(/,+/g, "")
      .replace(/:+/g, "")
    //  = Wed13Feb2019101814GMT
    // temp ID random number 100,000 - 999,999
    const generateRandommID = Math.floor(Math.random()*(999999-100000+1)+100000)
  
    const nativeFilePath = "static/ExportDsBinary/" +
      "ForkBaseExport-" + formatTime +
      "-ID" + generateRandommID + "/" +
      this.state.filename + ".csv"

    const filePath = "../../frontend/build/" + nativeFilePath

    this.setState({
      filePath: `${HTTPconfig.gateway}${nativeFilePath}`
    })

    const dataEntryForExportDS = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.branch,
        "filename": filePath
      },
      {}
    )
    this.props.requestExportDS(dataEntryForExportDS)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.dataset !== prevState.dataset ||
      this.state.branch !== prevState.branch ||
      this.state.filename !== prevState.filename
    ) {
      if (
        this.state.dataset &&
        this.state.branch &&
        this.state.filename &&
        this.state.validFileName
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
      Response_ExportDS,
      formState
    } = this.props;

    return (
      <React.Fragment>
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Typography variant="h5" gutterBottom>
                Export Dataset
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
                  onHandleSwitch={() => {}}
                  AllowNewDataset={false}
                  isCorrectInput={true}
                />
                <br />
                <BranchName
                  title="2. Branch Name"
                  dsList={DatasetList}
                  checkedNewDataset={false}
                  checkedNewBranch={false}
                  dataset={this.state.dataset}
                  branch={this.state.branch}
                  newBranch=""
                  referBranch=""
                  onHandleChange={this.handleChange}
                  BranchState={"branch"}
                  onHandleSwitch={() => {}}
                  AllowNewBranch={false}
                  isCorrectInput={true}
                />
                <br />
                <Typography variant="h5" gutterBottom align="center">
                  3. Export as
                </Typography>
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item>
                    <TextField
                      id="outlined-adornment-weight"
                      className={classes.textField}
                      variant="outlined"
                      label="Filename"
                      value={this.state.filename}
                      onChange={this.handleChange('filename')}
                      error={!this.state.validFileName}
                      helperText={
                        this.state.validFileName
                        ? "Export as filename"
                        :"invalid filename"
                      }
                      InputProps={{
                        endAdornment: <InputAdornment position="end">.csv</InputAdornment>,
                      }}
                    />
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
                    disabled={!this.state.FormIsValid && formState !== "loading"}
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
                    <b>{Response_ExportDS[0]}</b>
                    <br />
                    {Response_ExportDS[1]}
                    <br />
                    {Response_ExportDS[2]}
                  </Typography>
                  <br />
                  {this.state.filePath && Response_ExportDS[2] &&
                    <Button
                      variant="outlined"
                      href={this.state.filePath}
                    >
                      Download CSV
                    </Button>
                  }
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
  Response_ExportDS: state.RowTableCmds.Response_ExportDS,
  formState: state.RowTableCmds.formState
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestExportDS: actions.requestExportDS,
  requestListDS: actions.requestListDS,
  resetResponses: actions.resetResponses,
  resetLoadingBar: ConsoleActions.resetLoadingBar,
  loadingFormState: actions.loadingFormState
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ExportDataSet)