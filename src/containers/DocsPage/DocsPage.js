/* eslint import/no-webpack-loader-syntax: off */

import React from 'react';
import { Route } from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';

import LandingNavBar from "../../components/LandingNavBar/LandingNavBar"
//import LandingFooter from '../../components/LandingFooter/LandingFooter'

// Docs Page sidebar
import Navigator from './Navigator';

// for content section
import LayoutBody from '../../components/LandingComponents/LayoutBody'
import Typography from '../../components/LandingComponents/Typography'

// Dataset Routes
import ListDS from "../../components/DocsPageComponents/Dataset/ListDS"
import ListDSall from "../../components/DocsPageComponents/Dataset/ListDSall"
import CreateDS from "../../components/DocsPageComponents/Dataset/CreateDS"
import PutDEbyCSV from "../../components/DocsPageComponents/Dataset/PutDEbyCSV"
import PutDE from "../../components/DocsPageComponents/Dataset/PutDE"
import PutDEbatch from "../../components/DocsPageComponents/Dataset/PutDEbatch"
import BranchDS from "../../components/DocsPageComponents/Dataset/BranchDS"
import ListDSbranch from "../../components/DocsPageComponents/Dataset/ListDSbranch"
import ListDEbranch from "../../components/DocsPageComponents/Dataset/ListDEbranch"
import GetDS from "../../components/DocsPageComponents/Dataset/GetDS"
import GetDSall from "../../components/DocsPageComponents/Dataset/GetDSall"
import GetDSschema from "../../components/DocsPageComponents/Dataset/GetDSschema"
import GetDE from "../../components/DocsPageComponents/Dataset/GetDE"
import GetDEbatch from "../../components/DocsPageComponents/Dataset/GetDEbatch"
import ExistsDS from "../../components/DocsPageComponents/Dataset/ExistsDS"
import ExistsDE from "../../components/DocsPageComponents/Dataset/ExistsDE"
import SelectDE from "../../components/DocsPageComponents/Dataset/SelectDE"
import DiffDS from "../../components/DocsPageComponents/Dataset/DiffDS"
import DeleteDS from "../../components/DocsPageComponents/Dataset/DeleteDS"
import DeleteDE from "../../components/DocsPageComponents/Dataset/DeleteDE"
import ExportDSbinary from "../../components/DocsPageComponents/Dataset/ExportDSbinary"


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
    main: ListDS
  },
  { path: '/documentations/dataset/list-dataset-all',
    main: ListDSall
  },
  { path: '/documentations/dataset/create-dataset',
    main: CreateDS
  },
  { path: '/documentations/dataset/put-data-entry-by-csv',
    main: PutDEbyCSV
  },
  { path: '/documentations/dataset/put-data-entry',
    main: PutDE
  },
  { path: '/documentations/dataset/put-data-entry-batch',
    main: PutDEbatch
  },
  { path: '/documentations/dataset/branch-dataset',
    main: BranchDS
  },
  { path: '/documentations/dataset/list-dataset-branch',
    main: ListDSbranch
  },
  { path: '/documentations/dataset/list-data-entry-branch',
    main: ListDEbranch
  },
  { path: '/documentations/dataset/get-dataset',
    main: GetDS
  },
  { path: '/documentations/dataset/get-dataset-all',
    main: GetDSall
  },
  { path: '/documentations/dataset/get-dataset-schema',
    main: GetDSschema
  },
  { path: '/documentations/dataset/get-data-entry',
    main: GetDE
  },
  { path: '/documentations/dataset/get-data-entry-batch',
    main: GetDEbatch
  },
  { path: '/documentations/dataset/exists-dataset',
    main: ExistsDS
  },
  { path: '/documentations/dataset/exists-data-entry',
    main: ExistsDE
  },
  { path: '/documentations/dataset/select-data-entry',
    main: SelectDE
  },
  { path: '/documentations/dataset/diff-dataset',
    main: DiffDS
  },
  { path: '/documentations/dataset/delete-dataset',
    main: DeleteDS
  },
  { path: '/documentations/dataset/delete-data-entry',
    main: DeleteDE
  },
  { path: '/documentations/dataset/export-dataset-binary',
    main: ExportDSbinary
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
                  component={route.main}
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