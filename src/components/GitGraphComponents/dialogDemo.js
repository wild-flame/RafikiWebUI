import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import GitGraphWidget from "./GitGraphWidget"


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

class SimpleDialog extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog fullScreen onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Version History
            </Typography>
            <Button color="inherit" onClick={this.handleClose}>
              Work in progress...
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <div>
          <GitGraphWidget />
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(SimpleDialog)