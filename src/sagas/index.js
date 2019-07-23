import { all } from 'redux-saga/effects';
import AppRootSagas from "./AppRoot"
import StorageOverviewSagas from "./StorageOverview"
import RowTableCmdsSagas from "./RowTableCmds"
import DatasetsSagas from "./DatasetsSagas"

export default function* rootSaga() {
  // similar to promise resolve all
  yield all([
       DatasetsSagas,
    ...AppRootSagas,
    ...StorageOverviewSagas,
    ...RowTableCmdsSagas
  ]);
}
