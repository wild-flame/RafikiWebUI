import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography"


const styles = theme => ({
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 3,
    textDecoration: "none"
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

const SignedOutLinks = (props) => {
  const { classes } = props;
  return (
    <div className={classes.right}>
      <Typography
        variant="h6"
      >
        <Link to="/sign-in" className={classes.rightLink}>
          {'Sign In'}
        </Link>
      </Typography>
      <Typography
        variant="h6"
      >
        <Link to="/sign-up" className={classNames(classes.rightLink, classes.linkSecondary)}>
          {'Sign Up'}
        </Link>
      </Typography>
    </div>
  )
}

SignedOutLinks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignedOutLinks)
