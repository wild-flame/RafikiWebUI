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
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
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
  addUser: {
    marginRight: theme.spacing.unit,
  },
  contentWrapper: {
    margin: '40px 16px',
  },
})

class ConsoleOverviewContent extends React.Component {
  state = {
    ResultLoading: false,
    apiRes: "",
    mobileOpen: false
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
    const { classes } = this.props;
    console.log(this.state.apiRes)
    return (
      <React.Fragment>
        <Header
          onDrawerToggle={this.handleDrawerToggle}
          title={"Row-based Table"}
          Tab1={"List DataSet"}
          Tab2={""}
        />
        <main className={classes.mainContent}>
        <Paper className={classes.paper}>
          <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
            <Toolbar>
              <Grid container spacing={16} alignItems="center">
                <Grid item>
                  <SearchIcon className={classes.block} color="inherit" />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Search by email address, phone number, or user UID"
                    InputProps={{
                      disableUnderline: true,
                      className: classes.searchInput,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" className={classes.addUser}>
                    Add user
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton>
                      <RefreshIcon className={classes.block} color="inherit" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <div className={classes.contentWrapper}>
            <Typography color="textSecondary" align="center">
              No users for this project yet
            </Typography>
          </div>
        </Paper>
          <pre>{this.state.apiRes}</pre>
        </main>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(ConsoleOverviewContent)
