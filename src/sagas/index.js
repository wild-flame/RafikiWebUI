import { all } from 'redux-saga/effects';
import dbOverviewSagas from "./DatabaseOverview"
import RowTableCmdsSagas from "./RowTableCmds"


export default function* rootSaga() {
  // similar to promise resolve all
  yield all([
    ...dbOverviewSagas,
    ...RowTableCmdsSagas
  ]);
}
