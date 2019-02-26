import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'

import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

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
      DatasetList,
      handleClickHistory
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
              <TableCell>Dataset Name</TableCell>
              <TableCell>Branches</TableCell>
              <TableCell style={{ width: "39%" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DatasetList.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" className={classes.DsName}>
                  {item["dataset"]}
                </TableCell>
                <TableCell>
                  {item["branches"].map((branch, index) =>
                    <Chip
                      key={index}
                      variant="outlined"
                      label={branch}
                      className={classes.chip}
                      onClick={e => this.onShowChipMenu(
                        item["dataset"],
                        branch,
                        e
                      )}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    className={classes.tableButtons}
                    variant="contained"
                    color="secondary"
                    onClick={() => handleClickHistory(item)}
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
                          onClick={e => this.onShowEditMenu(item["dataset"], e)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          className={classes.tableButtons}
                          component={Link}
                          to={`/console/row-based-table/delete-dataset?dataset=${item["dataset"]}`}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          className={classes.tableButtons}
                          component={Link}
                          to={`/console/row-based-table/export-dataset?dataset=${item["dataset"]}`}
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
        {currentDataset && currentBranch && (
          <Popper
            anchorEl={this.state.menuAnchor}
            open
            placement="bottom"
            transition
          >
            <Paper>
              <ClickAwayListener onClickAway={this.onCloseChipMenu}>
                <MenuList>
                  <MenuItem
                    component={Link}
                    to={`/console/row-based-table/get-dataset?dataset=${currentDataset}&branch=${currentBranch}`}
                  >
                    <ListItemIcon>
                      <DnsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>Get Dataset</ListItemText>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={`/console/row-based-table/get-dataset-schema?dataset=${currentDataset}&branch=${currentBranch}`}
                  >
                    <ListItemIcon>
                      <DnsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>Get Dataset Schema</ListItemText>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={`/console/row-based-table/get-data-entry?dataset=${currentDataset}&branch=${currentBranch}`}
                  >
                    <ListItemIcon>
                      <DnsRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>Get Data Entry</ListItemText>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={`/console/row-based-table/branch-dataset?dataset=${currentDataset}&branch=${currentBranch}`}
                  >
                    <ListItemIcon>
                      <BranchDsIcon />
                    </ListItemIcon>
                    <ListItemText>Branch Dataset</ListItemText>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        )}
        {currentDataset && !currentBranch && (
          <Popper
            anchorEl={this.state.menuAnchor}
            open
            placement="bottom"
            transition
          >
            <Paper>
              <ClickAwayListener onClickAway={this.onCloseEditMenu}>
                <MenuList>
                  <MenuItem
                    component={Link}
                    to={`/console/row-based-table/put-data-by-csv?dataset=${currentDataset}`}
                  >
                    <ListItemIcon>
                      <PutDataCSVIcon />
                    </ListItemIcon>
                    <ListItemText>Put Data by CSV</ListItemText>
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={`/console/row-based-table/put-data-entry?dataset=${currentDataset}`}
                  >
                    <ListItemIcon>
                      <PutDeIcon />
                    </ListItemIcon>
                    <ListItemText>Put Data Entry</ListItemText>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        )}
      </Fragment>
    )
  }
}

export default withStyles(styles)(ListDataSetTable);
