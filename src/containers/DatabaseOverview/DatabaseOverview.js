import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"

import * as actions from "./actions"
import * as ConsoleActions from "../ConsoleAppFrame/actions"

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

import LoadingBar from 'react-redux-loading-bar'


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

class DatabaseOverview extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleHeaderTitleChange: PropTypes.func,
    requestDBSize: PropTypes.func,
    requestDBInfo: PropTypes.func,
    DBInfo: PropTypes.string,
    DBSize: PropTypes.string
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Database Overview")
    this.requestDBSizeInfo()
  }

  requestDBSizeInfo = () => {
    this.props.requestDBSize()
    this.props.requestDBInfo()
  }

  render() {
    const { classes, DBInfo, DBSize } = this.props;
    return (
      <React.Fragment>
        <LoadingBar />
        <main className={classes.mainContent}>
          <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
              <Toolbar>
                <Grid container spacing={16} justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography variant="h5" gutterBottom>
                      Total Database Size: {DBSize}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Reload">
                      <IconButton
                        onClick={this.requestDBSizeInfo}
                      >
                        <RefreshIcon className={classes.block} color="inherit" />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
              <Typography color="textPrimary" component="pre" align="center">
                <pre>{DBInfo}</pre>
              </Typography>
            </div>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  DBSize: state.DatabaseOverview.DBSize,
  DBInfo: state.DatabaseOverview.DBInfo
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestDBSize: actions.requestDBSize,
  requestDBInfo: actions.requestDBInfo
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(DatabaseOverview)