import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import LinearProgress from '@material-ui/core/LinearProgress';


const styles = () => ({
  subPaper: {
    minHeight: 150
  },
  RafikiStatus: {
    padding: 20,
    overflowWrap: "break-word"
  }
})

class RafikiStatus extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    formState: PropTypes.string
  }

  render() {
    const { classes, children, formState } = this.props;
    return (
      <Paper className={classes.subPaper}>
        <Typography variant="h5" gutterBottom align="center">
          rafiki Status:
        </Typography>
        <div className={classes.RafikiStatus}>
          {formState === "init"
            ? <LinearProgress color="secondary" variant="determinate" value={0} />
            : children
          }
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(RafikiStatus)
