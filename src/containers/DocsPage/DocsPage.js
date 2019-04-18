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

// Basic Key-value routes
import GET from "../../components/DocsPageComponents/BasicKeyValue/GET"
import PUT from "../../components/DocsPageComponents/BasicKeyValue/PUT"
import APPEND from "../../components/DocsPageComponents/BasicKeyValue/APPEND"
import UPDATE from "../../components/DocsPageComponents/BasicKeyValue/UPDATE"
import INSERT from "../../components/DocsPageComponents/BasicKeyValue/INSERT"
import DELETE from "../../components/DocsPageComponents/BasicKeyValue/DELETE"
import BRANCH from "../../components/DocsPageComponents/BasicKeyValue/BRANCH"
import MERGE from "../../components/DocsPageComponents/BasicKeyValue/MERGE"
import RENAME_BRANCH from "../../components/DocsPageComponents/BasicKeyValue/RENAME_BRANCH"
import DELETE_BRANCH from "../../components/DocsPageComponents/BasicKeyValue/DELETE_BRANCH"
import HEAD from "../../components/DocsPageComponents/BasicKeyValue/HEAD"
import IS_HEAD from "../../components/DocsPageComponents/BasicKeyValue/IS_HEAD"
import LATEST from "../../components/DocsPageComponents/BasicKeyValue/LATEST"
import IS_LATEST from "../../components/DocsPageComponents/BasicKeyValue/IS_LATEST"
import EXISTS from "../../components/DocsPageComponents/BasicKeyValue/EXISTS"
import LIST_BRANCH from "../../components/DocsPageComponents/BasicKeyValue/LIST_BRANCH"
import LIST_KEY from "../../components/DocsPageComponents/BasicKeyValue/LIST_KEY"
import META from "../../components/DocsPageComponents/BasicKeyValue/META"


// Dataset Routes
import ListDS from "../../components/DocsPageComponents/Dataset/ListDS"
import CreateDS from "../../components/DocsPageComponents/Dataset/CreateDS"
import PutDEbyCSV from "../../components/DocsPageComponents/Dataset/PutDEbyCSV"
import PutDE from "../../components/DocsPageComponents/Dataset/PutDE"
import PutDEbatch from "../../components/DocsPageComponents/Dataset/PutDEbatch"
import BranchDS from "../../components/DocsPageComponents/Dataset/BranchDS"
import ListDSbranch from "../../components/DocsPageComponents/Dataset/ListDSbranch"
import ListDEbranch from "../../components/DocsPageComponents/Dataset/ListDEbranch"
import GetDS from "../../components/DocsPageComponents/Dataset/GetDS"
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
  // Basic Key-values
  { path: '/docs/basic/get',
    main: GET
  },
  { path: '/docs/basic/put',
    main: PUT
  },
  { path: '/docs/basic/append',
    main: APPEND
  },
  { path: '/docs/basic/update',
    main: UPDATE
  },
  { path: '/docs/basic/insert',
    main: INSERT
  },
  { path: '/docs/basic/delete',
    main: DELETE
  },
  { path: '/docs/basic/branch',
    main: BRANCH
  },
  { path: '/docs/basic/merge',
    main: MERGE
  },
  { path: '/docs/basic/rename-branch',
    main: RENAME_BRANCH
  },
  { path: '/docs/basic/delete-branch',
    main: DELETE_BRANCH
  },
  { path: '/docs/basic/head',
    main: HEAD
  },
  { path: '/docs/basic/is-head',
    main: IS_HEAD
  },
  { path: '/docs/basic/latest',
    main: LATEST
  },
  { path: '/docs/basic/is-latest',
    main: IS_LATEST
  },
  { path: '/docs/basic/exists',
    main: EXISTS
  },
  { path: '/docs/basic/list-branch',
    main: LIST_BRANCH
  },
  { path: '/docs/basic/list-key',
    main: LIST_KEY
  },
  { path: '/docs/basic/meta',
    main: META
  },
  // Dataset Commands
  { path: '/docs/dataset/list-dataset',
    main: ListDS
  },
  { path: '/docs/dataset/create-dataset',
    main: CreateDS
  },
  { path: '/docs/dataset/put-data-entry-by-csv',
    main: PutDEbyCSV
  },
  { path: '/docs/dataset/put-data-entry',
    main: PutDE
  },
  { path: '/docs/dataset/put-data-entry-batch',
    main: PutDEbatch
  },
  { path: '/docs/dataset/branch-dataset',
    main: BranchDS
  },
  { path: '/docs/dataset/list-dataset-branch',
    main: ListDSbranch
  },
  { path: '/docs/dataset/list-data-entry-branch',
    main: ListDEbranch
  },
  { path: '/docs/dataset/get-dataset',
    main: GetDS
  },
  { path: '/docs/dataset/get-dataset-schema',
    main: GetDSschema
  },
  { path: '/docs/dataset/get-data-entry',
    main: GetDE
  },
  { path: '/docs/dataset/get-data-entry-batch',
    main: GetDEbatch
  },
  { path: '/docs/dataset/exists-dataset',
    main: ExistsDS
  },
  { path: '/docs/dataset/exists-data-entry',
    main: ExistsDE
  },
  { path: '/docs/dataset/select-data-entry',
    main: SelectDE
  },
  { path: '/docs/dataset/diff-dataset',
    main: DiffDS
  },
  { path: '/docs/dataset/delete-dataset',
    main: DeleteDS
  },
  { path: '/docs/dataset/delete-data-entry',
    main: DeleteDE
  },
  { path: '/docs/dataset/export-dataset-binary',
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
                documentation
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