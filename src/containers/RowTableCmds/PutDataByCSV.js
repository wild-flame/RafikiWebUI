import React from 'react';
import PropTypes from 'prop-types';
//axios to send ajax request
import axios from 'axios';
import HTTPconfig from "../../HTTPConfig"
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
import Header from '../../components/ConsoleHeader/Header';
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
    LSLoading: false,
    DSLoading: false,
    FileLoading: false,
    PUTCSVLoading: false,
    ResponseLS: "",
    ResponseDS: "",
    ResponseFile: "",
    ResponsePUT: "",
    mobileOpen: false,
    checkedNewDataset: false,
    checkedNewBranch: false,
    dataset:"",
    newDataset:"",
    branch:"",
    newBranch:"",
    referBranch:"",
    files: []
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

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  async componentDidMount() {
    await this.loadLS()
  }

  async loadLS() {
    await this.setState({
      LSLoading: true,
    });
    // send a GET request
    try {
      const result = await axios({
        method: 'get',
        url: `${HTTPconfig.gateway}api/ls-ds`,
      });
      await this.setState({
        LSLoading: false,
        ResponseLS: result.data.result,
      });
    } catch (error) {
      // if server service error
      console.error(error);
      // change state for UI
      await this.setState({
        LSLoading: false,
      });
    }
  }

  async combinedCall() {
    await this.createDS()
    await this.uploadData()
    await this.putCSV()
  }

  // create new dataset or new branch
  async createDS() {
    await this.setState({
      DSLoading: true,
    });
    // send a POST request
    try {
      // create new dataset
      if (this.state.checkedNewDataset) {
        const result = await axios({
          method: 'post',
          url: `${HTTPconfig.gateway}api/create-ds`,
          headers: HTTPconfig.HTTP_HEADER,
          data: Object.assign(
            {
              "dataset": this.state.newDataset,
              "branch": "master",
            },
            {}
          )
        });
        await this.setState({
          DSLoading: false,
          ResponseDS: result.data.result,
        });
        // create new branch
      } else if (this.state.checkedNewBranch) {
        const result = await axios({
          method: 'post',
          url: `${HTTPconfig.gateway}api/branch-ds`,
          headers: HTTPconfig.HTTP_HEADER,
          data: Object.assign(
            {
              "dataset": this.state.dataset,
              "branch": this.state.newBranch,
              "referBranch": this.state.referBranch
            },
            {}
          )
        });
        await this.setState({
          DSLoading: false,
          ResponseDS: result.data.result,
        });
      }
    } catch (error) {
      // if server service error
      console.error(error);
      // change state for UI
      await this.setState({
        DSLoading: false,
      });
    }
  }

  // upload csv to python server and read the response
  async uploadData() {
    await this.setState({
      FileLoading: true,
    });
    // send a POST request
    // Initial FormData
    const formData = new FormData();
    formData.append("file", this.state.files[0]);
    try {
      const result = await axios({
        method: 'post',
        url: `${HTTPconfig.gateway}api/put-de-by-csv`,
        headers: HTTPconfig.UPLOAD_FILE,
        data: formData
      });
      await this.setState({
        FileLoading: false,
        ResponseFile: result.data.result,
      });
    } catch (error) {
      // if server service error
      console.error(error);
      // change state for UI
      await this.setState({
        FileLoading: false,
      });
    }
  }

  // upload csv to python server and read the response
  async putCSV() {
    await this.setState({
      PUTCSVLoading: true,
    });
    // send a POST request
    // Initial FormData
    const formData = new FormData();
    formData.append("file", this.state.files[0]);
    try {
      const result = await axios({
        method: 'post',
        url: `${HTTPconfig.gateway}api/put-de-by-csv`,
        headers: HTTPconfig.HTTP_HEADER,
        data: formData
      });
      await this.setState({
        FileLoading: false,
        ResponseFile: result.data.result,
      });
    } catch (error) {
      // if server service error
      console.error(error);
      // change state for UI
      await this.setState({
        PUTCSVLoading: false,
      });
    }
  }

  render() {
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ))
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header
          onDrawerToggle={this.handleDrawerToggle}
          title={"Row-based Table > Put Data by CSV"}
        />
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
                          value={this.state.checkedNewDataset && this.state.newDataset}
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
                          value={this.state.checkedNewBranch && this.state.newBranch}
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
                    <div>{this.state.ResponseDS}</div>
                    <div>{this.state.ResponseFile}</div>
                    <div>{this.state.ResponsePUT}</div>
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


export default withStyles(styles)(PutDataByCSV)
