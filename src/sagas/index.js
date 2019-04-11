import { all } from 'redux-saga/effects';
import AppRootSagas from "./AppRoot"
import StorageOverviewSagas from "./StorageOverview"
import RowTableCmdsSagas from "./RowTableCmds"


export default function* rootSaga() {
  // similar to promise resolve all
  yield all([
    ...AppRootSagas,
    ...StorageOverviewSagas,
    ...RowTableCmdsSagas
  ]);
}
