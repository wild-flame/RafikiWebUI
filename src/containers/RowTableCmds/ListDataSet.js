import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import { compose } from "redux"
import { Link } from 'react-router-dom'

import * as ConsoleActions from "../ConsoleAppFrame/actions"
import * as OverviewActions from "../StorageOverview/actions"
import * as actions from "./actions"

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

// table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Chip from '@material-ui/core/Chip';

import MainContent from '../../components/ConsoleContents/MainContent'
import ContentBar from "../../components/ConsoleContents/ContentBar"

import SimpleDialogWrapped from "../../components/GitGraphComponents/dialogDemo"

const styles = theme => ({
  block: {
    display: 'block',
  },
  addDS: {
    marginRight: theme.spacing.unit,
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  chip: {
    margin: theme.spacing.unit,
  },
})


class ListDataSet extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleHeaderTitleChange: PropTypes.func,
    DatasetList: PropTypes.array,
    requestListDS: PropTypes.func,
    requestDBSize: PropTypes.func,
    resetLoadingBar: PropTypes.func,
  }

  state = {
    open: false
  }

  handleClickHistory = item => {
    console.log(item)
    this.setState({
      open: true,
    })
  }

  handleClose = value => {
    this.setState({ open: false })
  }

  reloadSizeAndDS = () => {
    this.props.requestDBSize()
    this.props.requestListDS()
  }

  componentDidMount() {
    this.props.handleHeaderTitleChange("Dataset > List Dataset")
    this.props.requestDBSize()
    this.props.requestListDS()
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.DatasetList !== this.props.DatasetList) {
  //     this.props.requestDBSize()
  //   }
  // }

  componentWillUnmount() {
    this.props.resetLoadingBar()
  }

  render() {
    const { classes, DatasetList } = this.props;
    return (
      <React.Fragment>
        <MainContent>
          <ContentBar>
            <Toolbar>
              <Grid container spacing={16} justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h5" gutterBottom>
                    List Dataset
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.addDS}
                    component={Link}
                    to="/console/row-based-table/put-data-by-csv?addNewDS=TRUE"
                  >
                    Add Dataset
                  </Button>
                  <Tooltip title="Reload">
                    <IconButton
                      onClick={this.reloadSizeAndDS}
                    >
                      <RefreshIcon className={classes.block} color="inherit" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </ContentBar>
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
                {DatasetList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {item["dataset"]}
                    </TableCell>
                    <TableCell>
                      {item["branches"].map((item, index) =>
                        <Chip
                          key={index}
                          label={item}
                          className={classes.chip}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.handleClickHistory(item)}
                        disabled={item["dataset"] === "..."}
                      >
                        View History
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <SimpleDialogWrapped
            open={this.state.open}
            onClose={this.handleClose}
          />
        </MainContent>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  DatasetList: state.RowTableCmds.DatasetList
})

const mapDispatchToProps = {
  handleHeaderTitleChange: ConsoleActions.handleHeaderTitleChange,
  requestListDS: actions.requestListDS,
  requestDBSize: OverviewActions.requestDBSize,
  resetLoadingBar: ConsoleActions.resetLoadingBar,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ListDataSet)
