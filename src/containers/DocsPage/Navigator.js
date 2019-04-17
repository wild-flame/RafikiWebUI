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
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
// row-based table (dataset)
import ListDSIcon from '@material-ui/icons/FormatListBulleted'
import CreateDSIcon from '@material-ui/icons/NoteAdd'
import ExistsDSIcon from '@material-ui/icons/Spellcheck'
import SelectDSIcon from '@material-ui/icons/TouchApp'
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


// customize scrollbar for the fixed-div navigator
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import ListSubheader from '@material-ui/core/ListSubheader';

// Navigator basic color dark blue specified in
// ConsoleTheme MuiDrawer's paper
const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  categoryHeaderPrimary: {
    color: theme.palette.text.primary,
  },
  item: {
    paddingTop: 6,
    paddingBottom: 6,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  itemActiveItem: {
    backgroundColor: theme.palette.secondary.light,
    color: 'rgba(255, 155, 100)'
  },
  itemPrimary: {
    color: 'primary',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
    },
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2,
  },
  toolbar: theme.mixins.toolbar,
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
            pathname: "/documentations/dataset/list-dataset"
          },
          {
            id: 'List Dataset All',
            icon: <ListDSIcon />,
            pathname: "/documentations/dataset/list-dataset-all"
          },
          {
            id: 'Create Dataset',
            icon: <CreateDSIcon />,
            pathname: "/documentations/dataset/create-dataset"
          },
          {
            id: 'Put Data Entry by CSV',
            icon: <PutDataCSVIcon />,
            pathname: "/documentations/dataset/put-data-entry-by-csv"
          },
          {
            id: 'Put Data Entry',
            icon: <PutDeIcon />,
            pathname: "/documentations/dataset/put-data-entry"
          },
          {
            id: 'Put Data Entry Batch',
            icon: <PutDeIcon />,
            pathname: "/documentations/dataset/put-data-entry-batch"
          },
          {
            id: 'Branch Dataset',
            icon: <BranchDsIcon />,
            pathname: "/documentations/dataset/branch-dataset"
          },
          {
            id: 'List Dataset Branch',
            icon: <ListDSIcon />,
            pathname: "/documentations/dataset/list-dataset-branch"
          },
          {
            id: 'List Data Entry Branch',
            icon: <ListDSIcon />,
            pathname: "/documentations/dataset/list-data-entry-branch"
          },
          {
            id: 'Get Dataset',
            icon: <DnsRoundedIcon />,
            pathname: "/documentations/dataset/get-dataset"
          },
          {
            id: 'Get Dataset All',
            icon: <DnsRoundedIcon />,
            pathname: "/documentations/dataset/get-dataset-all"
          },
          {
            id: 'Get Dataset Schema',
            icon: <DnsRoundedIcon />,
            pathname: "/documentations/dataset/get-dataset-schema"
          },
          {
            id: 'Get Data Entry',
            icon: <DnsRoundedIcon />,
            pathname: "/documentations/dataset/get-data-entry"
          },
          {
            id: 'Get Data Entry Batch',
            icon: <DnsRoundedIcon />,
            pathname: "/documentations/dataset/get-data-entry-batch"
          },
          {
            id: 'Exists Dataset',
            icon: <ExistsDSIcon />,
            pathname: "/documentations/dataset/exists-dataset"
          },
          {
            id: 'Exists Data Entry',
            icon: <ExistsDSIcon />,
            pathname: "/documentations/dataset/exists-data-entry"
          },
          {
            id: 'Select Data Entry',
            icon: <SelectDSIcon />,
            pathname: "/documentations/dataset/select-data-entry"
          },
          {
            id: 'Diff Dataset',
            icon: <DiffDsIcon />,
            pathname: "/documentations/dataset/diff-dataset"
          },
          {
            id: 'Delete Dataset',
            icon: <DeleteDsIcon />,
            pathname: "/documentations/dataset/delete-dataset"
          },
          {
            id: 'Delete Data Entry',
            icon: <DeleteDsIcon />,
            pathname: "/documentations/dataset/delete-data-entry"
          },
          {
            id: 'Export Dataset Binary',
            icon: <ExportDsIcon />,
            pathname: "/documentations/dataset/export-dataset-binary"
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
            pathname: "#"
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
            pathname: "#"
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
            pathname: "#"
          }
        ],
      },
    ];

    const {
      classes,
      location,
      staticContext,
      ...other
    } = this.props;

    return (
      <Drawer
        variant="permanent"
        {...other}
      >
        <SimpleBar style={{width: 255}}>
          <div className={classes.toolbar} />
          <List
            disablePadding
            subheader={<ListSubheader component="div">Documentations</ListSubheader>}
          >
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
                          color: "gray"
                        }}
                      />
                    : <ExpandMore
                        style={{
                          color: "gray"
                        }}
                      />}
                </ListItem>
                <Collapse in={collapseIn} timeout="auto" unmountOnExit>
                  {children.map(({ id: childId, icon, pathname }) => (
                    <ListItem
                      key={childId}
                      button
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
        </SimpleBar>
      </Drawer>
    );
  }
}


export default compose(
  withRouter,
  withStyles(styles)
)(Navigator)
