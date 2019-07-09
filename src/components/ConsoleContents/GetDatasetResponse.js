import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';



class GetDatasetResponse extends React.Component {
  static propTypes = {
    entries: PropTypes.string,
    dataset: PropTypes.string,
    branch: PropTypes.string
  }

  render() {
    const { entries, dataset, branch } = this.props

    if (!entries) {
      return (
        <List
          component="nav"
          subheader={<ListSubheader component="div">Entries:</ListSubheader>}
        >
          <ListItem button>
            <ListItemText primary="" />
          </ListItem>
        </List>
      )
    }

    // eslint-disable-next-line
    const entryArray = eval(entries.slice(9))

    return (
      <List
        component="nav"
        subheader={<ListSubheader component="div">Entries: (click to Get Data Entry)</ListSubheader>}
      >
        {entryArray.map(entry =>
          <ListItem
            button
            key={entry}
            component={Link}
            to={`/console/datasets/get-data-entry?dataset=${dataset}&branch=${branch}&entry=${entry}`}
          >
            <ListItemIcon>
              <DnsRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={entry} />
          </ListItem>
        )}
      </List>
    )
  }
}

export default GetDatasetResponse