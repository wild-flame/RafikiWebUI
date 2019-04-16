import React, { Fragment } from 'react';
import { connect } from "react-redux"
import { compose } from "redux"
import { Route } from "react-router-dom"

import LandingNavBar from "../../components/LandingNavBar/LandingNavBar"
//import LandingFooter from '../../components/LandingFooter/LandingFooter'

// temp sidebar
import { withStyles } from '@material-ui/core/styles';
import Navigator from './Navigator';

import Typography from '@material-ui/core/Typography';

import LandingProductCTA from "../../components/LandingProductCTA/LandingProductCTA"



const drawerWidth = 256;

const styles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1',
  },
  toolbar: theme.mixins.toolbar,
})

class DocsPage extends React.Component {
  render() {
    const {
      classes,
    } = this.props;
    return (
      <div className={classes.root}>
        <LandingNavBar />
        <nav className={classes.drawer}>
          <Navigator PaperProps={{ style: { width: drawerWidth } }} />
        </nav>
        <div className={classes.appContent}>
          <main className={classes.mainContent}>
            <div className={classes.toolbar} />
            <Route
              exact
              path='/documentations/dataset/list-dataset'
              component={LandingProductCTA}
            />
          </main>
        </div>
      </div>
    )
  }
}


export default withStyles(styles)(DocsPage)