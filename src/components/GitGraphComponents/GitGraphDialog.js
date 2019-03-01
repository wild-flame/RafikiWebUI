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
import LinearProgress from '@material-ui/core/LinearProgress';


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    // prevent horizontal scroll
    overflowX: "hidden",
    maxWidth: "100%"
  }
};

class GitGraphDialog extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    datasetSelected: PropTypes.string,
    branchesSelected: PropTypes.array,
    Response_Version_History: PropTypes.object,
    clearVersionHistory: PropTypes.func
  }

  componentDidMount() {
    console.log("i am mounted, and i am the dialog")
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const {
      classes,
      open,
      datasetSelected,
      branchesSelected,
      Response_Version_History,
      clearVersionHistory,
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        maxWidth={"lg"}
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
        <DialogTitle disableTypography id="gitgraph-dialog-title">
          <Typography variant="subtitle1" color="primary">
            Dataset: {datasetSelected}
          </Typography>
        </DialogTitle>
        <DialogContent
          className={classes.dialogContent}
        >
          {Object.keys(Response_Version_History).length > 0
            ? (
              <OlafGitgraph
                datasetSelected={datasetSelected}
                branchesSelected={branchesSelected}
                Response_Version_History={Response_Version_History}
                clearVersionHistory={clearVersionHistory}
              />
            )
            : (
              <div>
                <LinearProgress color="secondary" />
              </div>
            )
          }
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(GitGraphDialog)