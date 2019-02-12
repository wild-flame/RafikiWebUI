import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"

import * as ConsoleActions from "../ConsoleAppFrame/actions"
import * as actions from "./actions"

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import FormHelperText from '@material-ui/core/FormHelperText';

import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"
import CsvDropzone from "../../components/ConsoleContents/CsvDropzone"
import DatasetName from "../../components/ConsoleContents/DatasetName"
import BranchName from "../../components/ConsoleContents/BranchName"

// RegExp rules
import { validDsAndBranch } from "../../regexp-rules";



const styles = () => ({
  contentWrapper: {
    margin: '10px 16px',
  }
})


class PutDataByCSV extends React.Component {
  state = {
    checkedNewDataset: false,
    checkedNewBranch: false,
    dataset:"",
    newDataset:"",
    branch:"",
    newBranch:"",
    referBranch:"",
    files: [],
    validDsName: true,
    validBranchName: true
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    triggerCreateDS_PutCSV_Combo: PropTypes.func,
    triggerBranchDS_PutCSV_Combo: PropTypes.func,
    triggerPutCSV_Combo: PropTypes.func,
    resetResponses: PropTypes.func,

    DatasetList: PropTypes.array,

    Response_PutDataCSV: PropTypes.array,
    Response_CreateDS: PropTypes.array,
    Response_BranchDS: PropTypes.array,
    Response_UploadCSV: PropTypes.string
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

  componentDidMount() {
    this.props.handleHeaderTitleChange("Row-based Table > Put Data By CSV")
    this.props.requestListDS()
  }
  
  handleCommit = () => {
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
        "withSchema": "--with-schema"
      },
      {}
    )
    const dataEntryForCombo_BranchDS = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.newBranch,
        "withSchema": ""
      },
      {}
    )
    const dataEntryForPutCSV = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.branch,
        "withSchema": ""
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
          newBranch: ""
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
  }

  componentWillUnmount() {
    this.props.resetResponses()
  }

  render() {
    const {
      classes,
      DatasetList,
      Response_CreateDS,
      Response_BranchDS,
      Response_UploadCSV,
      Response_PutDataCSV
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
                        <Checkbox
                          checked={this.state.checkedNewDataset}
                          value="checkedWithSchema"
                        />
                      }
                      disabled={false}
                      label="CSV First Row as Schema"
                    />
                    <FormHelperText>Auto-select for new dataset</FormHelperText>
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
                  >
                    COMMIT
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <Typography variant="h5" gutterBottom align="center">
                    Forkbase Status:
                  </Typography>
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
                  {Response_UploadCSV &&
                    <div>{this.state.files[0]["name"]} uploaded!</div>
                  }
                  <Typography component="p">
                    <b>{Response_PutDataCSV[0]}</b>
                    <br />
                    {Response_PutDataCSV[1]}
                    <br />
                    {Response_PutDataCSV[2]}
                  </Typography>
                </Paper>
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
  Response_UploadCSV: state.RowTableCmds.Response_UploadCSV
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  triggerCreateDS_PutCSV_Combo: actions.triggerCreateDS_PutCSV_Combo,
  triggerBranchDS_PutCSV_Combo: actions.triggerBranchDS_PutCSV_Combo,
  triggerPutCSV_Combo: actions.triggerPutCSV_Combo,
  resetResponses: actions.resetResponses
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(PutDataByCSV)
