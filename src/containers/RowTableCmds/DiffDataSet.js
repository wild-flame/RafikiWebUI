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
import Switch from '@material-ui/core/Switch';

import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"
import DatasetName from "../../components/ConsoleContents/DatasetName"
import BranchName from "../../components/ConsoleContents/BranchName"


const styles = () => ({
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

class DiffDataSet extends React.Component {
  state = {
    dataset:"",
    branch:"",
    dataset_2:"",
    branch_2:"",
    checkedCompareDS: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    requestListDS: PropTypes.func,
    resetResponses: PropTypes.func,
    requestDiffSameDS: PropTypes.func,
    requestDiffDifferentDS: PropTypes.func,

    Response_DiffDS: PropTypes.array
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Row-based Table > Diff Dataset")
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

  handleCommit = () => {
    const dataEntryForSameDS = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.branch,
        "branch_2": this.state.branch_2
      },
      {}
    )
    const dataEntryForDifferentDS = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.branch,
        "dataset_2": this.state.dataset_2,
        "branch_2": this.state.branch_2
      },
      {}
    )

    // diff same ds
    if (!this.state.checkedCompareDS) {
      this.props.requestDiffSameDS(dataEntryForSameDS)
    // diff different ds
    } else {
      this.props.requestDiffDifferentDS(dataEntryForDifferentDS)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.checkedCompareDS !== prevState.checkedCompareDS) {
      if (!this.state.checkedCompareDS) {
        this.setState({
          dataset_2: ""
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
      Response_DiffDS,
    } = this.props;
    console.log(this.state)
    return (
      <React.Fragment>
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Typography variant="h5" gutterBottom>
                Diff Dataset
              </Typography>
            </Toolbar>
          </ContentBar>
          <div className={classes.contentWrapper}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <DatasetName
                  title="1. Dataset Name"
                  dsList={datasetBranches}
                  checkedNewDataset={false}
                  dataset={this.state.dataset}
                  newDataset=""
                  onHandleChange={this.handleChange}
                  DatasetState={"dataset"}
                  onHandleSwitch={() => {}}
                  AllowNewDataset={false}
                />
                <br />
                <BranchName
                  title="2. Branch Name"
                  dsList={datasetBranches}
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
                />
                <br />
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
                          checked={this.state.checkedCompareDS}
                          onChange={this.handleSwitch("checkedCompareDS")}
                          value="checkedCompareDS"
                        />
                      }
                      label="Compare different datasets"
                    />
                  </Grid>
                </Grid>
                <br />
                {this.state.checkedCompareDS &&
                  <DatasetName
                    title="Compare Dataset"
                    dsList={datasetBranches}
                    checkedNewDataset={false}
                    dataset={this.state.dataset_2}
                    newDataset=""
                    onHandleChange={this.handleChange}
                    DatasetState={"dataset_2"}
                    onHandleSwitch={() => {}}
                    AllowNewDataset={false}
                  />
                }
                <br />
                <BranchName
                  title="Compare Branch"
                  dsList={datasetBranches}
                  checkedNewDataset={false}
                  checkedNewBranch={false}
                  dataset={this.state.dataset_2}
                  branch={this.state.branch_2}
                  newBranch=""
                  referBranch=""
                  onHandleChange={this.handleChange}
                  BranchState={"branch_2"}
                  onHandleSwitch={() => {}}
                  AllowNewBranch={false}
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
                    <b>{Response_DiffDS[0]}</b>
                    <br />
                    {Response_DiffDS[1]}
                  </Typography>
                  <br />
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
  Response_DiffDS: state.RowTableCmds.Response_DiffDS
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  requestDiffSameDS: actions.requestDiffSameDS,
  requestDiffDifferentDS: actions.requestDiffDifferentDS,
  resetResponses: actions.resetResponses
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(DiffDataSet)