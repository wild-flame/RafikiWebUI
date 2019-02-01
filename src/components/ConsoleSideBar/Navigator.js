import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from "redux";
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';

// for nested list
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Logo from "../../assets/Logo-cleaned.png"
import { Link, withRouter } from "react-router-dom";


const categories = [
  {
    id: 'Row-based Table',
    children: [
      { id: 'Put Data by CSV', icon: <DnsRoundedIcon />, active: true },
      { id: 'Put Data Entry', icon: <DnsRoundedIcon /> },
      { id: 'Get Dataset', icon: <DnsRoundedIcon /> },
      { id: 'Get Dataset Schema', icon: <DnsRoundedIcon /> },
      { id: 'Get Data Entries', icon: <DnsRoundedIcon /> },
      { id: 'Diff Dataset', icon: <DnsRoundedIcon /> },
    ],
  },
  {
    id: 'Column-based Table',
    children: [
      { id: 'Create Table', icon: <SettingsIcon /> },
      { id: 'Load CSV', icon: <TimerIcon /> },
      { id: 'Get Table', icon: <PhonelinkSetupIcon /> },
      { id: 'Get Column', icon: <PhonelinkSetupIcon /> },
      { id: 'List Column Branch', icon: <PhonelinkSetupIcon /> },
      { id: 'Get Row', icon: <PhonelinkSetupIcon /> },
      { id: 'Update Row', icon: <PhonelinkSetupIcon /> },
      // and some more...
    ],
  },
  {
    id: 'Data Storage',
    children: [
      { id: 'Analytics', icon: <SettingsIcon /> },
      { id: 'Performance', icon: <TimerIcon /> },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
  {
    id: 'Key-Value Database',
    children: [
      { id: 'Analytics', icon: <SettingsIcon /> },
      { id: 'Performance', icon: <TimerIcon /> },
      { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
    ],
  },
];

// Navigator basic color dark blue specified in
// ConsoleTheme MuiDrawer's paper
const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: 16,
    paddingBottom: 16,
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
  },
  logo: {
    height: 28,
    marginRight: 10
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  overviewHover: {
    '&:hover': {
      backgroundColor: 'rgba(216, 255, 255, 0.3)',
    },
  },
  itemActiveItem: {
    color: theme.palette.secondary.main,
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
    },
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Navigator extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object,
  }

  state = {
    RowBasedTableOpen: true,
    ColBasedTableOpen: false,
    DataStorageOpen: false,
    KeyValueDBOpen: false
  };

  handleClick = (categoryHeader) => {
    switch(categoryHeader) {
      case "Row":
        this.setState(state => (
          { RowBasedTableOpen: !state.RowBasedTableOpen }
        ));
        break
      case "Col":
        this.setState(state => (
          { ColBasedTableOpen: !state.ColBasedTableOpen }
        ));
        break
      case "Storage":
        this.setState(state => (
          { DataStorageOpen: !state.DataStorageOpen }
        ));
        break
      case "KeyValue":
        this.setState(state => (
          { KeyValueDBOpen: !state.KeyValueDBOpen }
        ));
        break
      default:
        this.setState(state => (
          { RowBasedTableOpen: !state.RowBasedTableOpen }
        ));
        return
    }


  };

  render() {
    const { classes, location, staticContext, ...other } = this.props;
    return (
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItem
            component={Link}
            to="/"
            className={classNames(
              classes.firebase,
              classes.item,
              classes.itemCategory)}
          >
            <img alt="logo" src={Logo} className={classes.logo} />
            ForkBase
          </ListItem>
          <ListItem 
            component={Link}
            to="/console"
            className={classNames(
              classes.item,
              classes.overviewHover,
              classes.itemCategory,
              location.pathname === "/console" &&
              classes.itemActiveItem
            )}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Database Overview
            </ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => this.handleClick("Row")}
            className={classes.categoryHeader}
          >
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary,
              }}
            >
              Row-based Table
            </ListItemText>
            {this.state.RowBasedTableOpen
              ? <ExpandLess 
                  style={{
                    color: "white"
                  }}
                />
              : <ExpandMore
                  style={{
                    color: "white"
                  }}
                />}
          </ListItem>
          <Collapse in={this.state.RowBasedTableOpen} timeout="auto" unmountOnExit>
            <ListItem
              button
              component={Link}
              to="/console/row-based-table/list-dataset"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/row-based-table/list-dataset" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                List Dataset
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/console/row-based-table/put-data-by-csv"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/row-based-table/put-data-by-csv" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Put Data by CSV
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/console/row-based-table/put-data-entry"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/row-based-table/put-data-entry" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Put Data Entry
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/console/row-based-table/get-dataset"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/row-based-table/get-dataset" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Get Dataset
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/console/row-based-table/get-dataset-schema"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/row-based-table/get-dataset-schema" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Get Dataset Schema
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/console/row-based-table/get-data-entries"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/row-based-table/get-data-entries" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Get Data Entries
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/console/row-based-table/diff-dataset"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/row-based-table/diff-dataset" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Diff Dataset
              </ListItemText>
            </ListItem>
          </Collapse>
          <Divider className={classes.divider} />
          <ListItem
            button
            onClick={() => this.handleClick("Col")}
            className={classes.categoryHeader}
          >
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary,
              }}
            >
              Column-based Table
            </ListItemText>
            {this.state.ColBasedTableOpen
              ? <ExpandLess 
                  style={{
                    color: "white"
                  }}
                />
              : <ExpandMore
                  style={{
                    color: "white"
                  }}
                />}
          </ListItem>
          <Collapse in={this.state.ColBasedTableOpen} timeout="auto" unmountOnExit>
            <ListItem
              button
              component={Link}
              to="/console/col-based-table/get-table"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/col-based-table/get-table" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Get Table
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/console/col-based-table/create-table"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/col-based-table/create-table" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Create Table
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/console/col-based-table/load-csv"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/col-based-table/load-csv" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Load CSV
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/console/col-based-table/get-col"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/col-based-table/get-col" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Get Column
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/console/col-based-table/list-col-branch"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/col-based-table/list-col-branch" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                List Column Branch
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/console/col-based-table/get-row"
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                location.pathname === "/console/col-based-table/get-row" &&
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Get Row
              </ListItemText>
            </ListItem>
          </Collapse>
          <Divider className={classes.divider} />
          <ListItem
            button
            onClick={() => this.handleClick("Storage")}
            className={classes.categoryHeader}
          >
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary,
              }}
            >
              Data Storage
            </ListItemText>
            {this.state.DataStorageOpen
              ? <ExpandLess 
                  style={{
                    color: "white"
                  }}
                />
              : <ExpandMore
                  style={{
                    color: "white"
                  }}
                />}
          </ListItem>
          <Collapse in={this.state.DataStorageOpen} timeout="auto" unmountOnExit>
            <ListItem
              button
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Put Data by CSV
              </ListItemText>
            </ListItem>
          </Collapse>
          <Divider className={classes.divider} />
          <ListItem
            button
            onClick={() => this.handleClick("KeyValue")}
            className={classes.categoryHeader}
          >
            <ListItemText
              classes={{
                primary: classes.categoryHeaderPrimary,
              }}
            >
              Key-value Database
            </ListItemText>
            {this.state.KeyValueDBOpen
              ? <ExpandLess 
                  style={{
                    color: "white"
                  }}
                />
              : <ExpandMore
                  style={{
                    color: "white"
                  }}
                />}
          </ListItem>
          <Collapse in={this.state.KeyValueDBOpen} timeout="auto" unmountOnExit>
            <ListItem
              button
              dense
              className={classNames(
                classes.item,
                classes.itemActionable,
                classes.itemActiveItem,
              )}
            >
              <ListItemIcon>
                <DnsRoundedIcon />
              </ListItemIcon>
              <ListItemText
                classes={{
                  primary: classes.itemPrimary,
                  textDense: classes.textDense,
                }}
              >
                Put Data by CSV
              </ListItemText>
            </ListItem>
          </Collapse>
          <Divider className={classes.divider} />
        </List>
      </Drawer>
    );
  }
}


export default compose(
  withRouter,
  withStyles(styles)
)(Navigator)
