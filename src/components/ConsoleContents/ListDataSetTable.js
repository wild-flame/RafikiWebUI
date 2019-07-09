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
    } = this.props

    const Datasets = [
      {
          "datetime_created": "Wed, 19 Jun 2019 13:31:56 GMT",
          "id": "59fe7d7a-7056-4f40-bafc-35da06e08766",
          "name": "fashion_minist_app_train",
          "size_bytes": 34864119,
          "task": "IMAGE_CLASSIFICATION"
      },
      {
          "datetime_created": "Wed, 19 Jun 2019 13:32:23 GMT",
          "id": "65500bed-338e-4491-9761-dbbecb811c90",
          "name": "fashion_minist_app_test",
          "size_bytes": 6116386,
          "task": "IMAGE_CLASSIFICATION"
      },
      {
          "datetime_created": "Wed, 19 Jun 2019 13:54:04 GMT",
          "id": "75ba930a-e021-4626-9bf1-3a88ecd8ae33",
          "name": "fashion_minist_app_val",
          "size_bytes": 1830882,
          "task": "IMAGE_CLASSIFICATION"
      },
      {
          "datetime_created": "Wed, 19 Jun 2019 13:55:36 GMT",
          "id": "22bf449e-da09-45c9-af22-22c0be400e95",
          "name": "fashion_minist_app_val_2",
          "size_bytes": 1830882,
          "task": "IMAGE_CLASSIFICATION"
      },
      {
          "datetime_created": "Wed, 19 Jun 2019 13:56:12 GMT",
          "id": "623c71a2-6bed-4981-9435-638182a8c7f5",
          "name": "fashion_minist_app_val_3",
          "size_bytes": 1830882,
          "task": "IMAGE_CLASSIFICATION"
      },
      {
          "datetime_created": "Wed, 19 Jun 2019 13:58:14 GMT",
          "id": "2943057b-26b1-4b76-b408-2362e2d81433",
          "name": "fashion_minist_app_val_4",
          "size_bytes": 1830882,
          "task": "IMAGE_CLASSIFICATION"
      },
      {
          "datetime_created": "Thu, 20 Jun 2019 03:03:41 GMT",
          "id": "d59cdb66-6745-4f02-9d25-6c06f1277805",
          "name": "fashion_minist_app_train_v2",
          "size_bytes": 34864119,
          "task": "IMAGE_CLASSIFICATION"
      }
  ]

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
