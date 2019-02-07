import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';


const styles = () => ({
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1', // light grey
  },
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    marginBottom: 20
  }
})

class MainContent extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
  }

  render() {
    const { classes, children } = this.props;
    return (
      <main className={classes.mainContent}>
        <Paper className={classes.paper}>
          {children}
        </Paper>
      </main>
    )
  }
}

export default withStyles(styles)(MainContent)