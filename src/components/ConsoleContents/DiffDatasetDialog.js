import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// for Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import LinearProgress from '@material-ui/core/LinearProgress';


const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  dialogContent: {
    padding: 20,
    minHeight: 200
  }
};

class DiffDatasetDialog extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    GetDEforDiff_1_Response: PropTypes.string,
    GetDEforDiff_2_Response: PropTypes.string,
    dataset: PropTypes.string,
    branch: PropTypes.string,
    dataset_2: PropTypes.string,
    branch_2: PropTypes.string,
    entrySelected: PropTypes.string
  }

  componentDidMount() {
    console.log("i am mounted, and i am the dialog")
  }

  componentWillUnmount() {
    console.log("i will unmount, and i am the dialog")
  }

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const {
      classes,
      open,
      GetDEforDiff_1_Response,
      GetDEforDiff_2_Response,
      dataset,
      branch,
      dataset_2,
      branch_2,
      entrySelected
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        fullWidth
        maxWidth={"md"}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              View Difference @ {entrySelected}
            </Typography>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent
          className={classes.dialogContent}
        >
          {GetDEforDiff_1_Response && GetDEforDiff_2_Response
            ? (
              <React.Fragment>
                <Typography variant="subtitle1" color="primary">
                  Dataset: {dataset}, Branch: {branch}, Entry: {entrySelected}
                </Typography>
                <Typography component="p">
                  {GetDEforDiff_1_Response}
                </Typography>
                <br />
                <Typography variant="subtitle1" color="primary">
                  Dataset: {dataset_2 || dataset}, Branch: {branch_2}, Entry: {entrySelected}
                </Typography>
                <Typography component="p">
                  {GetDEforDiff_2_Response}
                </Typography>
                <br />
              </React.Fragment>
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

export default withStyles(styles)(DiffDatasetDialog)