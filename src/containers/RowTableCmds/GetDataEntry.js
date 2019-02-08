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
import TextField from '@material-ui/core/TextField';

import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"
import DatasetName from "../../components/ConsoleContents/DatasetName"
import BranchName from "../../components/ConsoleContents/BranchName"


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

class GetDataEntry extends React.Component {
  state = {
    dataset:"",
    branch:"",
    entry: "",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    requestGetDataEntry: PropTypes.func,
    requestListDS: PropTypes.func,
    resetResponses: PropTypes.func,

    Response_GetDataEntry: PropTypes.array
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Row-based Table > Get Data Entry")
    this.props.requestListDS()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCommit = () => {
    const dataEntryForGetDataEntry = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.branch,
        "entry": this.state.entry,
      },
      {}
    )
    this.props.requestGetDataEntry(dataEntryForGetDataEntry)
  }

  componentWillUnmount() {
    this.props.resetResponses()
  }

  render() {
    const {
      classes,
      Response_GetDataEntry,
    } = this.props;

    return (
      <React.Fragment>
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Typography variant="h5" gutterBottom>
                Get Data Entry
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
                  onHandleSwitch={this.handleSwitch}
                  AllowNewDataset={false}
                />
                <br />
                <BranchName
                  title="2. Branch Name"
                  dsList={datasetBranches}
                  checkedNewDataset={false}
                  checkedNewBranch={this.state.checkedNewBranch}
                  dataset={this.state.dataset}
                  branch={this.state.branch}
                  newBranch={this.state.newBranch}
                  referBranch={this.state.referBranch}
                  onHandleChange={this.handleChange}
                  onHandleSwitch={this.handleSwitch}
                  AllowNewBranch={false}
                />
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
                    <b>{Response_GetDataEntry[0]}</b>
                    <br />
                    {Response_GetDataEntry[1]}
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
  Response_GetDataEntry: state.RowTableCmds.Response_GetDataEntry
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  requestGetDataEntry: actions.requestGetDataEntry,
  resetResponses: actions.resetResponses
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(GetDataEntry)