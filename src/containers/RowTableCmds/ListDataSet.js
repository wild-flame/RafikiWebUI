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

// zoom addicon
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import AddIcon from "@material-ui/icons/Add";

// table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// table icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExportDsIcon from '@material-ui/icons/SaveAlt'

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
    position: "relative",
    minHeight: 200,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit,
    right: theme.spacing.unit * 0.5,
    zIndex: 10
  },
  tableButtons : {
    margin: 3,
  }
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
            <Zoom in={true} unmountOnExit>
              <Fab
                className={classes.fab}
                color="primary"
                component={Link}
                to="/console/row-based-table/put-data-by-csv?addNewDS=TRUE"
              >
                <AddIcon />
              </Fab>
            </Zoom>
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
                  <TableCell style={{ width: "39%" }}>Actions</TableCell>
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
                        className={classes.tableButtons}
                        variant="contained"
                        color="secondary"
                        onClick={() => this.handleClickHistory(item)}
                        disabled={item["dataset"] === "..."}
                      >
                        View History
                      </Button>
                      {item["dataset"] === "..."
                        ? ""
                        : (
                          <React.Fragment>
                            <IconButton
                              className={classes.tableButtons}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              className={classes.tableButtons}
                              component={Link}
                              to="/console/row-based-table/delete-dataset?addNewDS=TRUE"
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              className={classes.tableButtons}
                              component={Link}
                              to="/console/row-based-table/export-dataset?addNewDS=TRUE"
                            >
                              <ExportDsIcon />
                            </IconButton>
                          </React.Fragment>
                        )
                      }
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
