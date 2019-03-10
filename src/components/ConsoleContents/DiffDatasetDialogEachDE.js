import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    padding: 5,
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    maxWidth: "100%"
  },
})

class GetDataEntryResponse extends React.Component {
  static propTypes = {
    entryValue: PropTypes.string,
  }

  render() {
    const { classes, entryValue } = this.props

    console.log(entryValue)

    if (!entryValue) {
      return (
        ""
      )
    }

    const entryValueArray = entryValue.slice(8,-2).replace (/(")/g, '').split(",")
    console.log(entryValueArray)
    entryValueArray.map(eachValue =>
      console.log(eachValue)
    )
    
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid container spacing={0} zeroMinWidth>
            {entryValueArray.map((eachValue, index) => (
              <Paper
                className={classes.paper}
                key={index}
              >
                {eachValue}
              </Paper>
            ))}
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(GetDataEntryResponse)