import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = () => ({
  subPaper: {
    minHeight: 150
  },
  forkbaseStatus: {
    padding: 20,
    overflowWrap: "break-word"
  }
})

class ForkbaseStatus extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
  }

  render() {
    const { classes, children } = this.props;
    return (
      <Paper className={classes.subPaper}>
        <Typography variant="h5" gutterBottom align="center">
          Forkbase Status:
        </Typography>
        <div className={classes.forkbaseStatus}>
          {children}
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(ForkbaseStatus)

