import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"

import * as actions from "./actions"
import * as ConsoleActions from "../ConsoleAppFrame/actions"

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button'

import StorageOverviewHeader from "../../components/ConsoleHeader/StorageOverviewHeader"
import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"


const styles = theme => ({
  block: {
    display: 'block',
  },
  resetButton: {
    marginRight: theme.spacing.unit,
  },
  contentWrapper: {
    margin: '10px 16px',
    minHeight: 200
  }
})


class StorageOverview extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleHeaderTitleChange: PropTypes.func,
    requestDBSize: PropTypes.func,
    requestDBInfo: PropTypes.func,
    requestResetStorage: PropTypes.func,
    DBInfo: PropTypes.string,
    DBSize: PropTypes.string
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Storage Overview")
    this.requestDBSizeInfo()
  }

  requestDBSizeInfo = () => {
    this.props.requestDBSize()
    this.props.requestDBInfo()
  }

  handleResetStorage = () => {
    this.props.requestResetStorage()
  }

  render() {
    const { classes, DBInfo, DBSize } = this.props;
    return (
      <React.Fragment>
        <StorageOverviewHeader />
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Grid container spacing={16} justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h5" gutterBottom>
                    Total Storage Size: {DBSize}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="inherit"
                    className={classes.resetButton}
                    onClick={this.handleResetStorage}
                  >
                    Reset Storage
                  </Button>
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
          </ContentBar>
            <div className={classes.contentWrapper}>
              <Typography color="textPrimary" component="pre" align="center">
                {DBInfo
                  ? <pre>{DBInfo}</pre>
                  : "loading..."
                }
              </Typography>
            </div>
        </MainContent>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  DBSize: state.StorageOverview.DBSize,
  DBInfo: state.StorageOverview.DBInfo
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestDBSize: actions.requestDBSize,
  requestDBInfo: actions.requestDBInfo,
  requestResetStorage: actions.requestResetStorage
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(StorageOverview)