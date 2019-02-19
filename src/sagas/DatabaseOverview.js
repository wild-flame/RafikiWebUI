import {
  takeLatest,
  call,
  fork,
  put
} from "redux-saga/effects"
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import * as actions from "../containers/DatabaseOverview/actions"
import * as api from "../services/OverviewAPI"


function* getDBSize() {
  try{
    yield put(showLoading())
    const DBSize = yield call(api.requestDBSize)
    yield put(actions.populateDBSize(DBSize.data.DBSize))
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
    // TODO: implement notification for success and error of api actions
    // yield put(actions.getErrorStatus("failed to deleteUser"))
  }
}
function* watchGetDBSizeRequest() {
  yield takeLatest(actions.Types.REQUEST_DB_SIZE, getDBSize)
}

function* getDBInfo() {
  try{
    const DBInfo = yield call(api.requestDBInfo)
    yield put(actions.populateDBInfo(DBInfo.data.DBInfo))
  } catch(e) {
    console.error(e)
  }
}
function* watchGetDBInfoRequest() {
  yield takeLatest(actions.Types.REQUEST_DB_INFO, getDBInfo)
}

function* getResetStorageResponse() {
  try{
    yield put(showLoading())
    yield call(api.requestResetStorage)
    const DBSize = yield call(api.requestDBSize)
    yield put(actions.populateDBSize(DBSize.data.DBSize))
    const DBInfo = yield call(api.requestDBInfo)
    yield put(actions.populateDBInfo(DBInfo.data.DBInfo))
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}
function* watchResetStorage() {
  yield takeLatest(actions.Types.REQUEST_RESET_STORAGE, getResetStorageResponse)
}

// fork is for process creation, run in separate processes
const dbOverviewSagas = [
  fork(watchGetDBSizeRequest),
  fork(watchGetDBInfoRequest),
  fork(watchResetStorage)
]

export default dbOverviewSagas
