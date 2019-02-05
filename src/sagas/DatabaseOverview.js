import {
  takeLatest,
  call,
  fork,
  put
} from "redux-saga/effects"
import * as actions from "../containers/DatabaseOverview/actions"
import * as api from "../services/OverviewAPI"


function* getDBSize() {
  try{
    const DBSize = yield call(api.requestDBSize)
    yield put(actions.populateDBSize(DBSize.data.DBSize))
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


// fork is for process creation, run in separate processes
const dbOverviewSagas = [
  fork(watchGetDBSizeRequest),
  fork(watchGetDBInfoRequest)
]

export default dbOverviewSagas
