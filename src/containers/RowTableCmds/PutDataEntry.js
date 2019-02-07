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

import LoadingBar from 'react-redux-loading-bar'


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

class PutDataEntry extends React.Component {
  state = {
    checkedNewBranch: false,
    dataset:"",
    branch:"",
    newBranch: "",
    referBranch:"",
    entry: "",
    value:""
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    requestPutDE: PropTypes.func,
    requestListDS: PropTypes.func,
    resetResponses: PropTypes.func,

    Response_PutDE: PropTypes.array,
    Response_BranchDS: PropTypes.array,
    triggerBranchDS_PutDE_Combo: PropTypes.func
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Row-based Table > Put Data Entry")
    this.props.requestListDS()
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

  combinedCall() {
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
    if (this.state.checkedNewBranch !== prevState.checkedNewBranch) {
      if (!this.state.checkedNewBranch) {
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
      Response_PutDE,
      Response_BranchDS
    } = this.props;

    return (
      <React.Fragment>
        <LoadingBar />
        <main className={classes.mainContent}>
          <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
              <Toolbar>
                <Typography variant="h5" gutterBottom>
                  Put Data Entry
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
                          value={this.state.dataset}
                          onChange={this.handleChange('dataset')}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                          helperText="Please select your dataset"
                          margin="normal"
                        >
                          {datasetBranches.map(option => (
                            <MenuItem key={option.dataset} value={option.dataset}>
                              {option.dataset}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                    <br />
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
                          disabled={!this.state.checkedNewBranch}
                        />              
                      </Grid>
                      <Grid item>
                        <TextField
                          id="refer-branch-names"
                          select
                          label="Refer Branch"
                          className={classes.textField}
                          value={this.state.checkedNewBranch && this.state.referBranch}
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
                    <br />
                    <Typography variant="h5" gutterBottom align="center">
                      3. Row Entry Key
                    </Typography>
                    <Grid
                      container
                      direction="row"
                      justify="space-evenly"
                      alignItems="center"
                    >
                      <Grid item>
                        <TextField
                          id="row-entry-key"
                          label="Row Entry Key"
                          className={classes.textField}
                          value={this.state.entry}
                          onChange={this.handleChange("entry")}
                          margin="normal"
                        />
                      </Grid>
                    </Grid>
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
                          id="put-value"
                          label="Value"
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
                      <b>{Response_BranchDS[0]}</b>
                      <br />
                      {Response_BranchDS[1]}
                    </Typography>
                    <Typography component="p">
                      <b>{Response_PutDE[0]}</b>
                      <br />
                      {Response_PutDE[1]}
                    </Typography>
                    <br />
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
  Response_PutDE: state.RowTableCmds.Response_PutDE,
  Response_BranchDS: state.RowTableCmds.Response_BranchDS,
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestPutDE: actions.requestPutDE,
  requestListDS: actions.requestListDS,
  triggerBranchDS_PutDE_Combo: actions.triggerBranchDS_PutDE_Combo,
  resetResponses: actions.resetResponses
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(PutDataEntry)