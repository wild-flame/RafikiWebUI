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

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

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
    ResultLoading: false,
    apiRes: "",
    mobileOpen: false,
    DataSetName: "",
    BranchName: "",
    files: []
  }

  onDrop = (files) => {
    this.setState({files});
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  async componentDidMount() {
    await this.loadDBInfo()
  }

  async loadDBInfo() {
    await this.setState({
      ResultLoading: true,
    });
    // send a GET request
    try {
      const result = await axios({
        method: 'get',
        url: `${HTTPconfig.gateway}api/ls-ds`,
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
    const files = this.state.files.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ))
    const { classes } = this.props;
    console.log(this.state.apiRes)
    console.log(this.state.files)
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
                    value={this.state.DataSetName}
                    onChange={() => {}}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="Please select your dataset"
                    margin="normal"
                  >
                    {currencies.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>                
                <Grid item>
                  <FormControlLabel
                    className={classes.cock}
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        value="useTeams"
                      />
                    }
                    disabled={false}
                    label="Create new dataset"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="new-dataset-name"
                    label="New Dataset"
                    className={classes.textField}
                    value={this.state.DataSetName}
                    onChange={() => console.log("textfield clicked")}
                    margin="normal"
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
                    value={this.state.BranchName}
                    onChange={() => {}}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="Please select your branch"
                    margin="normal"
                  >
                    {currencies.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item>
                  <FormControlLabel
                    className={classes.cock}
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        value="useTeams"
                      />
                    }
                    disabled={false}
                    label="Create new branch"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="new-branch-name"
                    label="New Branch"
                    className={classes.textField}
                    value={this.state.BranchName}
                    onChange={() => console.log("textfield clicked")}
                    margin="normal"
                  />              
                </Grid>
              </Grid>
              <Typography variant="h5" gutterBottom align="center">
                3. Upload CSV
              </Typography>
              <Dropzone
                accept={"text/plain, application/vnd.ms-excel"}
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
                    className={classes.cock}
                    control={
                      <Checkbox
                        checked={false}
                        onChange={() => {}}
                        value="useTeams"
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
              <Button variant="contained" color="primary">
                COMMIT
              </Button>
              </Grid>
            </div>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(PutDataByCSV)
