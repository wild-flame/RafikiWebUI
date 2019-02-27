import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// for Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import OlafGitgraph from "./OlafGitgraph"


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

class GitGraphDialog extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const {
      classes,
      open,
      selectedValue,
      ...other
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        {...other}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Version History
            </Typography>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogTitle id="gitgraph-dialog-title">Dataset: xxx</DialogTitle>
        <DialogContent>
          <OlafGitgraph />
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(GitGraphDialog)