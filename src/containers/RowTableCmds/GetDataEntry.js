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

import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"
import DatasetName from "../../components/ConsoleContents/DatasetName"
import BranchName from "../../components/ConsoleContents/BranchName"
import RowEntryName from "../../components/ConsoleContents/RowEntryName"


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


class GetDataEntry extends React.Component {
  state = {
    dataset:"",
    branch:"",
    entry: "",
    EntriesLoaded: false,
    EntryArray: []
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    requestGetDataEntry: PropTypes.func,
    requestGetDataset: PropTypes.func,
    requestListDS: PropTypes.func,
    resetResponses: PropTypes.func,

    DatasetList: PropTypes.array,

    Response_GetDataEntry: PropTypes.array,
    Response_GetDataset: PropTypes.array
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

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.branch !== prevState.branch &&
      this.state.dataset !== "") ||
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
  }

  componentWillUnmount() {
    this.props.resetResponses()
  }

  render() {
    const {
      classes,
      DatasetList,
      Response_GetDataEntry
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
                  dsList={DatasetList}
                  checkedNewDataset={false}
                  dataset={this.state.dataset}
                  newDataset=""
                  onHandleChange={this.handleChange}
                  DatasetState={"dataset"}
                  onHandleSwitch={this.handleSwitch}
                  AllowNewDataset={false}
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
                />
                <br />
                <RowEntryName
                  title="3. Row Entry Key"
                  EntryArray={this.state.EntryArray}
                  checkedNewEntry={false}
                  entry={this.state.entry}
                  onHandleChange={this.handleChange}
                  RowEntryState={"entry"}
                  onHandleSwitch={() => {}}
                  disabled={!this.state.EntriesLoaded}
                  AllowNewEntry={false}
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
  DatasetList: state.RowTableCmds.DatasetList,
  Response_GetDataEntry: state.RowTableCmds.Response_GetDataEntry,
  Response_GetDataset: state.RowTableCmds.Response_GetDataset
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  requestGetDataEntry: actions.requestGetDataEntry,
  resetResponses: actions.resetResponses,
  requestGetDataset: actions.requestGetDataset,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(GetDataEntry)