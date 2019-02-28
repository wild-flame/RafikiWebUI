import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

class GetSchemaResponse extends React.Component {
  static propTypes = {
    schemaResponse: PropTypes.string,
  }

  render() {
    const { classes, schemaResponse } = this.props

    console.log(schemaResponse)

    if (!schemaResponse) {
      return (
        "..."
      )
    }

    const endPosition = schemaResponse.search("Indices of Entry Name Attributes")
    const schemaArray = schemaResponse.slice(9, endPosition-3).split(',')
    console.log(schemaArray)
    
    return (
      <React.Fragment>
        <Typography gutterBottom component="p">
          {schemaResponse}
        </Typography>
        <hr />
        <div className={classes.root}>
          <Grid container spacing={8}>
            {schemaArray.map((eachValue, index) => (
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

export default withStyles(styles)(GetSchemaResponse)