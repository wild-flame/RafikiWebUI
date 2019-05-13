import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import LayoutBody from '../LandingComponents/LayoutBody';
import Typography from '../LandingComponents/Typography';

import '../LandingMainPage/Overview.css'


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
  },
})


function ContactComponents(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <LayoutBody className={classes.root} component="section" width="large">
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Contact
        </Typography>
        <div className="section_center">
          <Typography variant="h5" gutterBottom marked="center" align="left">
            DBsystem NUS School of Computing
          </Typography>
          <div className="center__description">
          <p className="description__text">
<b>Address:</b><br/ >
School of Computing, COM 1 Building, 
13 Computing Drive, National University of Singapore<br />
Singapore, 117417<br />
<b>Website: </b><br />
<a href="https://www.comp.nus.edu.sg/~dbsystem/" target="_blank" rel="noopener noreferrer">https://www.comp.nus.edu.sg/~dbsystem/</a><br />
<b>Email: </b><br />
Professor Ooi Beng Chin: ooibc@comp.nus.edu.sg 
            </p>
          </div>

          <Typography variant="h5" gutterBottom marked="center" align="left">
            Find us on GitHub
          </Typography>
          <div className="center__description">
          <p className="description__text">
<b>Repository: </b><br />
<a href="https://github.com/ooibc88/forkbase" target="_blank" rel="noopener noreferrer">https://github.com/ooibc88/forkbase</a>
            </p>
          </div>
        </div>
      </LayoutBody>
    </React.Fragment>
  );
}

export default withStyles(styles)(ContactComponents);
