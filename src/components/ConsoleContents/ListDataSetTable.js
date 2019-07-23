import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'

import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from '@material-ui/core/Tooltip';

// table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// table icons
import IconButton from '@material-ui/core/IconButton';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ExportDsIcon from '@material-ui/icons/SaveAlt'

// dropdown menu with popper
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PutDataCSVIcon from '@material-ui/icons/CloudUploadOutlined'
import PutDeIcon from '@material-ui/icons/PlaylistAdd'
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import BranchDsIcon from '@material-ui/icons/CallSplit'
import DiffDsIcon from '@material-ui/icons/Compare'

import * as moment from 'moment';

import Chip from '@material-ui/core/Chip';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  tableButtons : {
    margin: 3,
  },
  chip: {
    margin: theme.spacing.unit,
  },
  DsName: {
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeightNormal,
  }
})

class ListDataSetTable extends React.Component {
  static propTypes = {
    DatasetList: PropTypes.array,
    handleClickHistory: PropTypes.func,
  }

  state = {
    menuAnchor: null,
    currentDataset: "",
    currentBranch: ""
  }

  onShowChipMenu = (datasetName, branchName, e) => {
    this.setState({
      menuAnchor: e.target,
      currentDataset: datasetName,
      currentBranch: branchName
    })
  }

  onCloseChipMenu = () => {
    this.setState({
      menuAnchor: false,
      currentDataset: "",
      currentBranch: ""
    })
  }
  
  onShowEditMenu = (datasetName, e) => {
    this.setState({
      menuAnchor: e.target,
      currentDataset: datasetName
    })
  }

  onCloseEditMenu = () => {
    this.setState({
      menuAnchor: false,
      currentDataset: ""
    })
  }

  render() {
    const {
      classes,
      Datasets
    } = this.props

    const {
      currentDataset,
      currentBranch
    } = this.state

    return (
      <Fragment>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Uploaded At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Datasets.map(x => {
            return (
              <TableRow key={x.id} hover>
                <TableCell>{x.id}</TableCell>
                <TableCell>{x.name}</TableCell>
                <TableCell>{x.task}</TableCell>
                <TableCell>{x.size_bytes} bytes</TableCell>
                <TableCell>{moment(x.datetime_created).fromNow()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        </Table>
      </Fragment>
    )
  }
}

export default withStyles(styles)(ListDataSetTable);
