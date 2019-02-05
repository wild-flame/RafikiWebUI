import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"
//axios to send ajax request
import axios from 'axios';
import HTTPconfig from "../../HTTPConfig"

import * as ConsoleActions from "../ConsoleOverview/actions"

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


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
    ResultLoading: false,
    apiRes: "",
    dataset:"",
    branch:"",
    entry: "",
    value:""
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleHeaderTitleChange: PropTypes.func,
  }

  async componentDidMount() {
    this.props.handleHeaderTitleChange("Row-based Table > Put Data Entry")
    //await this.loadLS()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  async uploadData() {
    await this.setState({
      ResultLoading: true,
    });
    // send a POST request
    try {
      const result = await axios({
        method: 'post',
        url: `${HTTPconfig.gateway}api/put-de`,
        headers: HTTPconfig.HTTP_HEADER,
        data: Object.assign(
          {
            "dataset": this.state.dataset,
            "branch": this.state.branch,
            "entry": this.state.entry,
            "value": this.state.value
          },
          {}
        )
      });
      await this.setState({
        ResultLoading: false,
        apiRes: result.data.result,
      });
    } catch (error) {
      // if server service error
      console.error(error);
      // change state for UI
      await this.setState({
        ResultLoading: false,
      });
    }
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.apiRes)
    console.log(this.state)
    return (
      <React.Fragment>
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
                          value={this.state.branch}
                          onChange={this.handleChange("branch")}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                          helperText="Please select your branch"
                          margin="normal"
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
                          value={this.state.DataSetName}
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
                          value={this.state.DataSetName}
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
                        onClick={() => this.uploadData()}
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
                      <b>{this.state.apiRes[0]}</b>
                      <br />
                      {this.state.apiRes[1]}
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


const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange
}

export default compose(
  connect(null, mapDispatchToProps),
  withStyles(styles)
)(PutDataEntry)