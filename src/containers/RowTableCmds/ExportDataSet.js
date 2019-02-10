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
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

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


class ExportDataSet extends React.Component {
  state = {
    dataset:"",
    branch:"",
    filename:"",
    filePath:""
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,

    handleHeaderTitleChange: PropTypes.func,
    requestListDS: PropTypes.func,
    resetResponses: PropTypes.func,

    DatasetList: PropTypes.array,

    requestExportDS: PropTypes.func,
    Response_ExportDS: PropTypes.array
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Row-based Table > Export Dataset")
    this.props.requestListDS()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCommit = () => {
    // temp ID random number 100,000 - 999,999
    const generateRandommID = Math.floor(Math.random()*(999999-100000+1)+100000)

    const filePath = `./static/${generateRandommID}/${this.state.filename}.csv`

    this.setState({
      filePath: `${HTTPconfig.gateway}${filePath}`
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

  componentWillUnmount() {
    this.props.resetResponses()
  }

  render() {
    const {
      classes,
      DatasetList,
      Response_ExportDS
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
                      helperText="Export as filename"
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
                    <b>{Response_ExportDS[0]}</b>
                    <br />
                    {Response_ExportDS[1]}
                    <br />
                    {Response_ExportDS[2]}
                  </Typography>
                  <br />
                  {this.state.filePath &&
                    <a href={this.state.filePath}>
                      <Button>
                        Download CSV
                      </Button>
                    </a>
                  }
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
  Response_ExportDS: state.RowTableCmds.Response_ExportDS
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestExportDS: actions.requestExportDS,
  requestListDS: actions.requestListDS,
  resetResponses: actions.resetResponses
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ExportDataSet)