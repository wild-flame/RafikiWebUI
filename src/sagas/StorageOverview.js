import {
  takeLatest,
  call,
  fork,
  put
} from "redux-saga/effects"
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import * as actions from "../containers/StorageOverview/actions"
import * as api from "../services/OverviewAPI"


function* getDBSize() {
  try{
    // react-sweet-progress bar status from active to success
    yield put(actions.activateStorageBarLoading())
    const DBSize = yield call(api.requestDBSize)
    yield put(actions.populateDBSize(DBSize.data.DBSize))
    yield put(actions.stopStorageBarLoading())
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
    // StorageOverview page load trigger getDBInfo
    yield put(showLoading())
    const DBInfo = yield call(api.requestDBInfo)
    yield put(actions.populateDBInfo(DBInfo.data.DBInfo))
    yield put(hideLoading())
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
const StorageOverviewSagas = [
  fork(watchGetDBSizeRequest),
  fork(watchGetDBInfoRequest),
  fork(watchResetStorage)
]

export default StorageOverviewSagas
