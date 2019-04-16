/* eslint import/no-webpack-loader-syntax: off */

import React from 'react';
import { Route } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';

import LandingNavBar from "../../components/LandingNavBar/LandingNavBar"
//import LandingFooter from '../../components/LandingFooter/LandingFooter'

// Docs Page sidebar
import Navigator from './Navigator';

// for content section
import Markdown from '../../components/LandingComponents/Markdown';
import LayoutBody from '../../components/LandingComponents/LayoutBody'
import Typography from '../../components/LandingComponents/Typography'

// docs markdown files
import ListDS from "!raw-loader!../../components/DocsPageComponents/Dataset/ListDS.md"
import SampleCard from "./SampleCard"


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
  layoutBody: { 
    marginBottom: theme.spacing.unit * 14,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    marginLeft: 24
  },
  toolbar: theme.mixins.toolbar,
})


const routes = [
  { path: '/documentations/dataset/list-dataset',
    docsMD: SampleCard
  },
]


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
            <LayoutBody className={classes.layoutBody}>
              <Typography variant="h3" gutterBottom marked="center" align="center">
                documentations
              </Typography>
              <br />
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact
                  component={route.docsMD}
                />
              ))}
            </LayoutBody>
          </main>
        </div>
      </div>
    )
  }
}


export default withStyles(styles)(DocsPage)