import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"

import * as ConsoleActions from "../ConsoleAppFrame/actions"
import * as actions from "./actions"

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from '@material-ui/core/Switch';
import Checkbox from "@material-ui/core/Checkbox";

import Dropzone from 'react-dropzone'


const styles = theme => ({
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1', // light grey
  },
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    marginBottom: 20
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  contentWrapper: {
    margin: '10px 16px',
  }
})

const datasetBranches = [
  // ls-ds-branch -t ds9
  // [SUCCESS: LIST_DATASET_BRANCH] Branches: ["master"]
  {
    dataset: 'ds1',
    branches: ["master"]
  },
  {
    dataset: 'ds9',
    branches: ["master"]
  },
  {
    dataset: 'BTC',
    branches: ["master", "dev"]
  },
  {
    dataset: 'JPY',
    branches: ["master", "newFeature"]
  },
];

const Normalized = {
  ds1: {
    branches: ["master"]
  },
  ds9: {
    branches: ["master"]
  },
  BTC: {
    branches: ["master", "dev"]
  },
}

// for file dropzone
const baseStyle = {
  width: 300,
  height: 100,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5,
  margin: "0 auto"
};
const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};
const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#c66',
  backgroundColor: '#eee'
};


class PutDataByCSV extends React.Component {
  state = {
    checkedNewDataset: false,
    checkedNewBranch: false,
    dataset:"",
    newDataset:"",
    branch:"",
    newBranch:"",
    referBranch:"",
    files: []
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    triggerCreateDS_PutCSV_Combo: PropTypes.func,
    triggerBranchDS_PutCSV_Combo: PropTypes.func,
    triggerPutCSV_Combo: PropTypes.func,
    resetResponses: PropTypes.func,

    Response_PutDataCSV: PropTypes.array,
    Response_CreateDS: PropTypes.array,
    Response_BranchDS: PropTypes.array,
    Response_UploadCSV: PropTypes.string
  }

  handleChange = name => event => {
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
  
  combinedCall() {
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
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ))
    const {
      classes,
      Response_CreateDS,
      Response_BranchDS,
      Response_UploadCSV,
      Response_PutDataCSV
    } = this.props;

    return (
      <React.Fragment>
        <main className={classes.mainContent}>
          <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
              <Toolbar>
                <Typography variant="h5" gutterBottom>
                  Put Data Entry by CSV
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Paper>
                    <Typography variant="h5" gutterBottom align="center">
                      1. Dataset Name
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      justify="space-evenly"
                      alignItems="center"
                    >
                      <Grid item>
                        <TextField
                          id="existing-dataset-names"
                          select
                          label="Select from datasets"
                          className={classes.textField}
                          value={!this.state.checkedNewDataset && this.state.dataset}
                          onChange={this.handleChange("dataset")}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                          helperText="Please select your dataset"
                          margin="normal"
                          disabled={this.state.checkedNewDataset}
                        >
                          {datasetBranches.map(option => (
                            <MenuItem key={option.dataset} value={option.dataset}>
                              {option.dataset}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>                
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={this.state.checkedNewDataset}
                              onChange={this.handleSwitch("checkedNewDataset")}
                              value="checkedNewDataset"
                            />
                          }
                          label="Create new dataset"
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="new-dataset-name"
                          label="New Dataset"
                          className={classes.textField}
                          value={this.state.newDataset}
                          onChange={this.handleChange("newDataset")}
                          margin="normal"
                          disabled={!this.state.checkedNewDataset}
                        />              
                      </Grid>
                    </Grid>
                    <Typography variant="h5" gutterBottom align="center">
                      2. Branch Name
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      justify="space-evenly"
                      alignItems="center"
                    >
                      <Grid item>
                        <TextField
                          id="existing-branch-names"
                          select
                          label="Default is master"
                          className={classes.textField}
                          value={!this.state.checkedNewBranch && this.state.branch}
                          onChange={this.handleChange("branch")}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                          helperText="Please select your branch"
                          margin="normal"
                          disabled={this.state.checkedNewBranch}
                        >
                          {this.state.dataset
                            ? (datasetBranches.filter(item => item.dataset === this.state.dataset)[0]
                                .branches.map(item => (
                                  <MenuItem key={item} value={item}>
                                    {item}
                                  </MenuItem>
                                ))
                            )
                            : (
                              <MenuItem value={"master"}>
                                {"master"}
                              </MenuItem>
                            )
                          }
                        </TextField>
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          control={
                            <Switch
                              disabled={this.state.checkedNewDataset}
                              checked={this.state.checkedNewBranch}
                              onChange={this.handleSwitch("checkedNewBranch")}
                              value="checkedNewBranch"
                            />
                          }
                          label="Create new branch"
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          id="new-branch-name"
                          label="New Branch"
                          className={classes.textField}
                          value={this.state.newBranch}
                          onChange={this.handleChange("newBranch")}
                          margin="normal"
                          disabled={this.state.checkedNewDataset || !this.state.checkedNewBranch}
                        />              
                      </Grid>
                      <Grid item>
                        <TextField
                          id="refer-branch-names"
                          select
                          label="Refer Branch"
                          className={classes.textField}
                          value={!this.state.checkedNewDataset && this.state.checkedNewBranch && this.state.referBranch}
                          onChange={this.handleChange("referBranch")}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                          helperText="Please select a refer branch"
                          margin="normal"
                          disabled={!this.state.checkedNewBranch}
                        >
                          {this.state.dataset
                            ? (datasetBranches.filter(item => item.dataset === this.state.dataset)[0]
                                .branches.map(item => (
                                  <MenuItem key={item} value={item}>
                                    {item}
                                  </MenuItem>
                                ))
                            )
                            : (
                              <MenuItem value={"master"}>
                                {"master"}
                              </MenuItem>
                            )
                          }
                        </TextField>
                      </Grid>
                    </Grid>
                    <Typography variant="h5" gutterBottom align="center">
                      3. Upload CSV
                    </Typography>
                    <Dropzone
                      accept={"*.csv, text/csv, application/vnd.ms-excel"}
                      onDrop={this.onDrop}
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
                        let styles = {...baseStyle}
                        styles = isDragActive ? {...styles, ...activeStyle} : styles
                        styles = isDragReject ? {...styles, ...rejectStyle} : styles

                        return (
                          <div
                            {...getRootProps()}
                            style={styles}
                          >
                            <input {...getInputProps()} />
                            <div>
                              {isDragAccept ? 'Drop' : 'Drag'} files here...
                            </div>
                            {isDragReject && <div>Unsupported file type...</div>}
                          </div>
                        )
                      }}
                    </Dropzone>
                    <h4>CSV File:</h4>
                    <ul>{files}</ul>
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
                      onClick={() => this.combinedCall()}
                    >
                      COMMIT
                    </Button>
                    </Grid>
                  </Paper>
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
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
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
