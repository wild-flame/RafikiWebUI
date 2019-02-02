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
import Header from '../../components/ConsoleHeader/Header';


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

class PutDataEntry extends React.Component {
  state = {
    ResultLoading: false,
    apiRes: "",
    mobileOpen: false,
    putDeInput: {
      key:"ds9",
      branch:"master",
      entry: "row2",
      value:"this is the first key i put into the forkbase"
    }
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
    // send a POST request
    try {
      const result = await axios({
        method: 'post',
        url: `${HTTPconfig.gateway}api/put-de`,
        headers: HTTPconfig.HTTP_HEADER,
        data: this.state.putDeInput,
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
    return (
      <React.Fragment>
        <Header
          onDrawerToggle={this.handleDrawerToggle}
          title={"Row-based Table > Put Data Entry"}
        />
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
                    onChange={() => console.log("textfield clicked")}
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
                    onChange={() => console.log("textfield clicked")}
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


export default withStyles(styles)(PutDataEntry)
