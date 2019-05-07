import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import LayoutBody from '../LandingComponents/LayoutBody';
import Typography from '../LandingComponents/Typography';

import './Overview.css'
import forkbaseArch from "../../assets/forkbaseArch.png"


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    marginBottom: theme.spacing.unit * 4,
  },
});

function ProductCategories(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <LayoutBody className={classes.root} component="section" width="large">
        <Typography variant="h4" marked="center" align="center" component="h2">
          ForkBase Architecture
        </Typography>
        <div className="section_center">
          <div className="center__description">
            <p className="description__text">
ForkBase internally implements Git-compatible data <b>version control
and branch management</b> based on Merkle directed acyclic
graph (DAG), which empowers tamper evidence and efficient
tracking of data provenance. ForkBase also uses a novel content-based <b>data deduplication</b> technology
that can remarkably reduce data redundancy between different data versions in the physical storage as well as efficiently
support differential queries between data versions.
{' '}
            </p>
          </div>
          <div className="img-container">
            <img src={forkbaseArch} alt="forkbaseArch" className="fullWidthImg" />
          </div>
        </div>
      </LayoutBody>
    </React.Fragment>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
