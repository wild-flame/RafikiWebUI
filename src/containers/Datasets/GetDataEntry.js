import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"
import { Link } from "react-router-dom";

import * as ConsoleActions from "../ConsoleAppFrame/actions"
import * as actions from "./actions"

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

// icon to re-direct to put-de
import PutDeIcon from '@material-ui/icons/PlaylistAdd'

import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"
import DatasetName from "../../components/ConsoleContents/DatasetName"
import BranchName from "../../components/ConsoleContents/BranchName"
import RowEntryName from "../../components/ConsoleContents/RowEntryName"
import RafikiStatus from "../../components/ConsoleContents/RafikiStatus"
import GetDataEntryResponse from "../../components/ConsoleContents/GetDataEntryResponse"

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
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
})


class GetDataEntry extends React.Component {
  state = {
    dataset:"",
    branch:"master",
    entry: "",
    EntriesLoaded: false,
    EntryArray: [],
    FormIsValid: false
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    requestGetDataEntry: PropTypes.func,
    requestGetDataset: PropTypes.func,
    requestListDS: PropTypes.func,
    resetResponses: PropTypes.func,
    resetLoadingBar: PropTypes.func,

    DatasetList: PropTypes.array,

    Response_GetDataEntry: PropTypes.array,
    Response_GetDataset: PropTypes.array,

    formState: PropTypes.string,
    loadingFormState: PropTypes.func
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Dataset > Get Data Entry")
    // read the query string from URL
    const values = queryString.parse(this.props.location.search)
    if (values.dataset && values.branch) {
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
        branch: "master",
        entry: "",
        EntriesLoaded: false,
        EntryArray: []
      })
    }
    if (name === "branch") {
      this.setState({
        entry: "",
        EntriesLoaded: false,
        EntryArray: []
      })
    }
    this.setState({
      [name]: event.target.value,
    });
  };

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
    if (
      this.state.dataset !== prevState.dataset ||
      this.state.branch !== prevState.branch ||
      this.state.entry !== prevState.entry
    ) {
      if (
        this.state.dataset &&
        this.state.branch &&
        this.state.entry
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
      Response_GetDataEntry,
      formState
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
                  AllowNewBranch={false}
                  isCorrectInput={true}
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
                  isCorrectInput={true}
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
                    <b>{Response_GetDataEntry[0]}</b>
                    <br />
                  </Typography>
                  <GetDataEntryResponse
                    entryValue={Response_GetDataEntry[1]}
                  />
                  <br />
                  {Response_GetDataEntry[1] &&
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      component={Link}
                      to={`/console/datasets/put-data-entry?dataset=${this.state.dataset}&branch=${this.state.branch}&entry=${this.state.entry}`}
                    >
                      <PutDeIcon className={classes.leftIcon} />
                      Put Data Entry
                    </Button>
                  }
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
  Response_GetDataEntry: state.RowTableCmds.Response_GetDataEntry,
  Response_GetDataset: state.RowTableCmds.Response_GetDataset,
  formState: state.RowTableCmds.formState
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  requestGetDataEntry: actions.requestGetDataEntry,
  resetResponses: actions.resetResponses,
  resetLoadingBar: ConsoleActions.resetLoadingBar,
  requestGetDataset: actions.requestGetDataset,
  loadingFormState: actions.loadingFormState
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(GetDataEntry)