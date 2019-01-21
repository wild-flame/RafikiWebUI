import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '../LandingComponents/Button';
import Typography from '../LandingComponents/Typography';
import ProductHeroLayout from './LandingProductHeroLayout';

const backgroundImage =
  //'https://www.ebetfinder.com/wp-content/uploads/2016/11/dota-2-gameplay-ebetfinder-resized.jpg';
  //'https://www.comp.nus.edu.sg/~dbsystem/forkbase/pic/stack.jpg'
  //'https://www.geek.com/wp-content/uploads/2010/12/asfMod_02.jpg'
  'https://cdn.pixabay.com/photo/2017/07/06/03/00/electrical-2476782_960_720.jpg'

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    //minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * 10,
    },
  },
  more: {
    marginTop: theme.spacing.unit * 2,
  },
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <img style={{ display: 'none' }} src={backgroundImage} alt="" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        ForkBase
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        An Efficient Storage Engine for Blockchain and Forkable Applications
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component={linkProps => (
          <Link {...linkProps} href="/" variant="button" />
        )}
      >
        Request Demo
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHero);