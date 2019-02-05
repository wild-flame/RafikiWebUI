import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"

import * as ConsoleActions from "../ConsoleAppFrame/actions"
import * as actions from "./actions"

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

// table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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


class ListDataSet extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleHeaderTitleChange: PropTypes.func,
    DatasetList: PropTypes.array,
    requestListDS: PropTypes.func
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Row-based Table > List Dataset")
    this.props.requestListDS()
  }

  render() {
    const { classes, DatasetList } = this.props;
    return (
      <React.Fragment>
        <LoadingBar />
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
                      placeholder="Search by dataset name"
                      InputProps={{
                        disableUnderline: true,
                        className: classes.searchInput,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="primary" className={classes.addUser}>
                      Search by Dataset
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
                {DatasetList.length === 0
                    ? "You do not have any dataset"
                    : "Datasets and Branches"
                }
              </Typography>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Dataset Name</TableCell>
                    <TableCell>Branches</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {DatasetList.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row[0]}
                      </TableCell>
                      <TableCell>
                        {row[1]}
                      </TableCell>
                      <TableCell>
                        <Button variant="contained" color="secondary">
                          View History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  DatasetList: state.RowTableCmds.DatasetList
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ListDataSet)
