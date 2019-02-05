import {
  takeLatest,
  call,
  fork,
  put
} from "redux-saga/effects"
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import * as actions from "../containers/RowTableCmds/actions"
import * as api from "../services/RowTableAPI"


function* getDatasetList() {
  try{
    yield put(showLoading())
    const DSList = yield call(api.requestListDataset)
    yield put(hideLoading())
    yield put(actions.populateDSList(DSList.data.DSList))
  } catch(e) {
    console.error(e)
    // TODO: implement notification for success and error of api actions
    // yield put(actions.getErrorStatus("failed to deleteUser"))
  }
}
function* watchGetDSListRequest() {
  yield takeLatest(actions.Types.REQUEST_LS_DS, getDatasetList)
}

// fork is for process creation, run in separate processes
const RowTableCmdsSagas = [
  fork(watchGetDSListRequest),
]

export default RowTableCmdsSagas
