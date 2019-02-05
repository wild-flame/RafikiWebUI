import { all } from 'redux-saga/effects';
import dbOverviewSagas from "./DatabaseOverview"


export default function* rootSaga() {
  // similar to promise resolve all
  yield all([
    ...dbOverviewSagas,
  ]);
}
