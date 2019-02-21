import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// for icons
import HomeIcon from '@material-ui/icons/Home';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
// row-based table (dataset)
import ListDSIcon from '@material-ui/icons/FormatListBulleted'
import PutDataCSVIcon from '@material-ui/icons/CloudUploadOutlined'
import PutDeIcon from '@material-ui/icons/PlaylistAdd'
import BranchDsIcon from '@material-ui/icons/CallSplit'
import DiffDsIcon from '@material-ui/icons/Compare'
import DeleteDsIcon from '@material-ui/icons/Delete'
import ExportDsIcon from '@material-ui/icons/SaveAlt'

// for nested list
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Logo from "../../assets/Logo-cleaned.png"


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
  categoryHeaderPrimaryActive: {
    color: 'inherit'
  },
  item: {
    paddingTop: 11,
    paddingBottom: 11,
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
      backgroundColor: 'rgba(216, 255, 255, 0.1)',
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
  }
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
    const categories = [
      {
        id: 'Dataset',
        collapseID: "Row",
        collapseIn: this.state.RowBasedTableOpen,
        children: [
          {
            id: 'List Dataset',
            icon: <ListDSIcon />,
            pathname: "/console/row-based-table/list-dataset"
          },
          {
            id: 'Put Data by CSV',
            icon: <PutDataCSVIcon />,
            pathname: "/console/row-based-table/put-data-by-csv"
          },
          {
            id: 'Put Data Entry',
            icon: <PutDeIcon />,
            pathname: "/console/row-based-table/put-data-entry"
          },
          {
            id: 'Branch Dataset',
            icon: <BranchDsIcon />,
            pathname: "/console/row-based-table/branch-dataset"
          },
          {
            id: 'Get Dataset',
            icon: <DnsRoundedIcon />,
            pathname: "/console/row-based-table/get-dataset"
          },
          {
            id: 'Get Dataset Schema',
            icon: <DnsRoundedIcon />,
            pathname: "/console/row-based-table/get-dataset-schema"
          },
          {
            id: 'Get Data Entry',
            icon: <DnsRoundedIcon />,
            pathname: "/console/row-based-table/get-data-entry"
          },
          {
            id: 'Diff Dataset',
            icon: <DiffDsIcon />,
            pathname: "/console/row-based-table/diff-dataset"
          },
          {
            id: 'Delete Dataset',
            icon: <DeleteDsIcon />,
            pathname: "/console/row-based-table/delete-dataset"
          },
          {
            id: 'Export Dataset',
            icon: <ExportDsIcon />,
            pathname: "/console/row-based-table/export-dataset"
          },
        ],
      },
      {
        id: 'Column-based Table',
        collapseID: "Col",
        collapseIn: this.state.ColBasedTableOpen,
        children: [
          {
            id: 'Work in progress',
            icon: <DnsRoundedIcon />,
            pathname: ""
          },
          /*
          {
            id: 'Create Table',
            icon: <DnsRoundedIcon />,
            pathname: ""
          },
          {
            id: 'Load CSV',
            icon: <DnsRoundedIcon />,
            pathname: ""
          },
          {
            id: 'Get Table',
            icon: <DnsRoundedIcon />,
            pathname: ""
          },
          {
            id: 'Get Column',
            icon: <DnsRoundedIcon />,
            pathname: ""
          },
          {
            id: 'List Column Branch',
            icon: <DnsRoundedIcon />,
            pathname: ""
          },
          {
            id: 'Get Row',
            icon: <DnsRoundedIcon />,
            pathname: ""
          },
          {
            id: 'Update Row',
            icon: <DnsRoundedIcon />,
            pathname: ""
          },
          // and some more...
          */
        ],
      },
      {
        id: 'Data Storage',
        collapseID: "Storage",
        collapseIn: this.state.DataStorageOpen,
        children: [
          {
            id: 'Work in progress',
            icon: <DnsRoundedIcon />,
            pathname: ""
          }
        ],
      },
      {
        id: 'Basic Key-Value',
        collapseID: "KeyValue",
        collapseIn: this.state.KeyValueDBOpen,
        children: [
          {
            id: 'Work in progress',
            icon: <DnsRoundedIcon />,
            pathname: ""
          }
        ],
      },
    ];

    const {
      classes,
      location,
      staticContext,
      open,
      onClose,
      ...other
    } = this.props;

    return (
      <Drawer
        variant="permanent"
        open={open}
        onClose={onClose}
        {...other}
      >
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
            onClick={onClose}
            className={classNames(
              classes.item,
              classes.overviewHover,
              classes.itemCategory,
              location.pathname === "/console" &&
              classes.itemActiveItem,
              classes.categoryHeader
            )}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              classes={
                location.pathname === "/console"
                  ? {
                    primary: classes.categoryHeaderPrimaryActive
                  }
                  : {
                    primary: classes.categoryHeaderPrimary
                  }
                }
            >
              Storage Overview
            </ListItemText>
          </ListItem>
          {categories.map(({id, collapseID, collapseIn, children }) => (
            <React.Fragment key={id}>
              <ListItem
                button
                onClick={() => this.handleClick(collapseID)}
                className={classes.categoryHeader}
              >
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary,
                  }}
                >
                  {id}
                </ListItemText>
                {collapseIn
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
              <Collapse in={collapseIn} timeout="auto" unmountOnExit>
                {children.map(({ id: childId, icon, pathname }) => (
                  <ListItem
                    key={childId}
                    button
                    onClick={onClose}
                    component={Link}
                    to={pathname}
                    dense
                    className={classNames(
                      classes.item,
                      classes.itemActionable,
                      location.pathname === pathname &&
                      classes.itemActiveItem,
                    )}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText
                      classes={{
                        primary: classes.itemPrimary,
                        textDense: classes.textDense,
                      }}
                    >
                      {childId}
                    </ListItemText>
                  </ListItem>
                ))}
              </Collapse>
              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    );
  }
}


export default compose(
  withRouter,
  withStyles(styles)
)(Navigator)
