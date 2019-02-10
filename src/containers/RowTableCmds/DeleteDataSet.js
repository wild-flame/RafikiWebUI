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


const styles = () => ({
  contentWrapper: {
    margin: '10px 16px',
  }
})


class DeleteDataSet extends React.Component {
  state = {
    dataset:"",
    branch:"",
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    requestDeleteDataset: PropTypes.func,
    requestListDS: PropTypes.func,
    resetResponses: PropTypes.func,

    DatasetList: PropTypes.array,

    Response_DeleteDS: PropTypes.array
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Row-based Table > Delete Dataset")
    this.props.requestListDS()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCommit = () => {
    const dataEntryForDeleteDS = Object.assign(
      {
        "dataset": this.state.dataset,
        "branch": this.state.branch
      },
      {}
    )
    this.props.requestDeleteDataset(dataEntryForDeleteDS)
  }

  componentWillUnmount() {
    this.props.resetResponses()
  }

  render() {
    const {
      classes,
      DatasetList,
      Response_DeleteDS,
    } = this.props;

    return (
      <React.Fragment>
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Typography variant="h5" gutterBottom>
                Delete Dataset
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
                    <b>{Response_DeleteDS[0]}</b>
                    <br />
                    {Response_DeleteDS[1]}
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
  Response_DeleteDS: state.RowTableCmds.Response_DeleteDS
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  requestDeleteDataset: actions.requestDeleteDataset,
  resetResponses: actions.resetResponses
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(DeleteDataSet)