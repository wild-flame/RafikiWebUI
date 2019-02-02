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
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
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

class ConsoleOverviewContent extends React.Component {
  state = {
    ResultLoading: false,
    apiResInfo: "",
    apiResSize: "",
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
      const DBInfo = await axios({
        method: 'get',
        url: `${HTTPconfig.gateway}api/info`,
      });
      const DBSize = await axios({
        method: 'get',
        url: `${HTTPconfig.gateway}api/size`,
      })
      console.log(DBSize)
      await this.setState({
        ResultLoading: false,
        apiResInfo: DBInfo.data.DBInfo,
        apiResSize: DBSize.data.DBSize
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
    return (
      <React.Fragment>
        <Header
          onDrawerToggle={this.handleDrawerToggle}
          title={"Database Overview"}
        />
        <main className={classes.mainContent}>
          <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
              <Toolbar>
                <Grid container spacing={16} justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h5" gutterBottom>
                      Total Database Size: {this.state.apiResSize}
                    </Typography>
                  </Grid>
                  <Grid item>
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
                {this.state.ResultLoading
                  ? "updating..."
                  : <pre>{this.state.apiResInfo}</pre>
                }
              </Typography>
            </div>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}


export default withStyles(styles)(ConsoleOverviewContent)
