import {
    takeLatest,
    call,
    put,
    fork,
    select
} from "redux-saga/effects"
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import * as actions from "../containers/Datasets/actions"
import * as api from "../services/DatasetsAPI"

function getToken(state) {
    return state.token
}

function* watchGetDSListRequest() {
    yield takeLatest(actions.Types.REQUEST_LS_DS, getDatasetList)
}
 
/* for List Dataset command */
function* getDatasetList() {
    try {
        yield put(showLoading())
        const token = yield select(getToken)
        const DSList = yield call(api.requestListDataset, {}, token)
        yield put(actions.populateDSList(DSList.data.DSList))
        yield put(hideLoading())
    } catch (e) {
        console.error(e.response)
        // TODO: implement notification for success and error of api actions
        // yield put(actions.getErrorStatus("failed to deleteUser"))
    }
}

// fork is for process creation, run in separate processes
const DatasetsSagas = [
    fork(watchGetDSListRequest)
] 

export default DatasetsSagas 