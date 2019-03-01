import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';

import DiffDatasetDialog from "../ConsoleContents/DiffDatasetDialog"


class DiffDatasetResponse extends React.Component {
  static propTypes = {
    DiffDsResponse: PropTypes.string,
    dataset: PropTypes.string,
    branch: PropTypes.string,
    dataset_2: PropTypes.string,
    branch_2: PropTypes.string,
    requestGetDataEntry_forDiff_1: PropTypes.func,
    requestGetDataEntry_forDiff_2: PropTypes.func,
    GetDEforDiff_1_Response: PropTypes.string,
    GetDEforDiff_2_Response: PropTypes.string,
  }

  state = {
    open: false,
    entrySelected: ""
  }

  handleClickOpen = entry => {
    const {
      dataset,
      branch,
      dataset_2,
      branch_2,
      requestGetDataEntry_forDiff_1,
      requestGetDataEntry_forDiff_2
    } = this.props

    this.setState({
      open: true,
      entrySelected: entry
    })
    // create inputs
    const dataEntryForGetDataEntry_1 = Object.assign(
      {
        "dataset": dataset,
        "branch": branch,
        "entry": entry,
      },
      {}
    )
    let dataEntryForGetDataEntry_2
    // if same DS diff
    if (this.props.dataset_2 === "") {
      dataEntryForGetDataEntry_2 = Object.assign(
        {
          "dataset": dataset,
          "branch": branch_2,
          "entry": entry,
        },
        {}
      )
    } else {
      // for different DS diff
      dataEntryForGetDataEntry_2 = Object.assign(
        {
          "dataset": dataset_2,
          "branch": branch_2,
          "entry": entry,
        },
        {}
      )
    }
    requestGetDataEntry_forDiff_1(dataEntryForGetDataEntry_1)
    requestGetDataEntry_forDiff_2(dataEntryForGetDataEntry_2)
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const {
      DiffDsResponse,
      dataset,
      branch,
      dataset_2,
      branch_2,
      GetDEforDiff_1_Response,
      GetDEforDiff_2_Response
    } = this.props

    if (!DiffDsResponse) {
      return (
        <List
          component="nav"
          subheader={<ListSubheader component="div">Different Entries:</ListSubheader>}
        >
          <ListItem button>
            <ListItemText primary="" />
          </ListItem>
        </List>
      )
    }

    // extract the array part
    // const DiffArray = DiffDsResponse.slice(20,-3).replace (/(")/g, '').split(",")
    // the above method will introduce an empty space like " a02"
    // eslint-disable-next-line
    const DiffArray = eval(DiffDsResponse.slice(19,-1))

    if (DiffDsResponse.includes("Different Entries: []")) {
      return (
        <List
          component="nav"
          subheader={<ListSubheader component="div">Different Entries:</ListSubheader>}
        >
          <ListItem>
            <ListItemText secondary="No difference between selected datasets/branches" />
          </ListItem>
        </List>
      )
    }

    return (
      <React.Fragment>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Different Entries: (click to view the difference)</ListSubheader>}
        >
          {DiffArray.map(entry =>
            <ListItem
              button
              key={entry}
              onClick={() => this.handleClickOpen(entry)}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={entry} />
            </ListItem>
          )}
        </List>
        {this.state.open &&
          <DiffDatasetDialog
            open={this.state.open}
            onClose={this.handleClose}
            GetDEforDiff_1_Response={GetDEforDiff_1_Response}
            GetDEforDiff_2_Response={GetDEforDiff_2_Response}
            dataset={dataset}
            dataset_2={dataset_2}
            branch={branch}
            branch_2={branch_2}
            entrySelected={this.state.entrySelected}
          />
        }
      </React.Fragment>
    )
  }
}

export default DiffDatasetResponse