import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography"
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: "center"
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
  avatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  },
  iconButtonAvatar: {
    padding: 4,
    marginLeft: theme.spacing.unit * 3,
    textDecoration: "none"
  }
})

const SignedInLinks = (props) => {
  const { classes } = props;
  return (
    <div className={classes.right}>
      <Typography
        variant="h6"
      >
        <Link to="/console" className={classes.rightLink}>
          {'Go To Console'}
        </Link>
      </Typography>
      <Typography
        variant="h6"
      >
        <IconButton color="inherit" className={classes.iconButtonAvatar}>
          <Avatar className={classes.avatar}>KY</Avatar>
        </IconButton>
      </Typography>
    </div>
  )
}

SignedInLinks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignedInLinks)
