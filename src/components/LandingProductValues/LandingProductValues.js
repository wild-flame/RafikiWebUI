import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LayoutBody from '../LandingComponents/LayoutBody';
import Typography from '../LandingComponents/Typography';
import EnhancedEncryption from "@material-ui/icons/EnhancedEncryption"
import GroupAdd from "@material-ui/icons/GroupAdd"
import Security from "@material-ui/icons/Security"


const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  layoutBody: {
    marginTop: theme.spacing.unit * 15,
    marginBottom: theme.spacing.unit * 20,
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `0px ${theme.spacing.unit * 5}px`,
  },
  valueIcon: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5,
  }
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <LayoutBody className={classes.layoutBody} width="large">
        <Grid container spacing={40}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <EnhancedEncryption
                className={classes.valueIcon}
                fontSize="large"
              />
              <Typography variant="h6" className={classes.title}>
                Immutability
              </Typography>
              <Typography variant="h5">
                {'ForkBase has a rich set of built-in data types (for both structured and unstructured data)'}
                {', providing immutability and versioning for stored data.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <GroupAdd
                className={classes.valueIcon}
                fontSize="large"
              />
              <Typography variant="h6" className={classes.title}>
                Collaboration
              </Typography>
              <Typography variant="h5">
                {'ForkBase supports both on-demand and on-conflict fork semantics to facilitate various types of collaboration workflows.'}
                {' It natively provides many built-in conflict resolution strategies for merging branches in various scenarios.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Security
                className={classes.valueIcon}
                fontSize="large"
              />
              <Typography variant="h6" className={classes.title}>
                Security
              </Typography>
              <Typography variant="h5">
                {'All data objects in ForkBase are tamper-evident, '}
                {'and hence can be leveraged to build better data models for blockchains. '}
                {'The detailed and structured information captured in ForkBase makes the blockchain analytics-ready.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </LayoutBody>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
