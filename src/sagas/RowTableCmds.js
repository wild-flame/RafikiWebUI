import {
  takeLatest,
  call,
  fork,
  put
} from "redux-saga/effects"
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import * as actions from "../containers/RowTableCmds/actions"
import * as api from "../services/RowTableAPI"

/* for List Dataset command */
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


/* for Put Data Entry page */
function* getPutDEresponse(action) {
  try{
    yield put(showLoading())
    const Response_PutDE = yield call(api.requestPutDataEntry, action.dataEntryPutDE)
    yield put(hideLoading())
    yield put(actions.populatePutDEresponse(Response_PutDE.data.result))
  } catch(e) {
    console.error(e)
  }
}

function* watchGetPutDEresponse() {
  yield takeLatest(actions.Types.REQUEST_PUT_DE, getPutDEresponse)
}


function* getBranchDS_PutDEresponse(action) {
  try {
    yield put(actions.requestBranchDS(action.dataEntryForBranchDS))
    const Response_BranchDS = yield call(api.requestBranchDS, action.dataEntryForBranchDS)
    yield put(actions.populateBranchDSresponse(Response_BranchDS.data.result))

    // yield put(actions.requestPutDE(action.dataEntryForCombo_BranchDS))
    const Response_PutDE = yield call(api.requestPutDataEntry, action.dataEntryForCombo_BranchDS)
    yield put(actions.populatePutDEresponse(Response_PutDE.data.result))
  } catch(e) {
    console.error(e)
  }
}

function* watchBranchDSPutDECombo() {
  yield takeLatest(actions.Types.COMBO_BRANCH_DS_PUT_DE, getBranchDS_PutDEresponse)
}


/* for Put Data Entry by CSV page, combining createDS, branchDS and uploadCSV */
function* getCreateDS_PutCSVresponse(action) {
  try{
    yield put(actions.requestCreateDS(action.dataEntryForCreateDS))
    const Response_CreateDS = yield call(api.requestCreateDS, action.dataEntryForCreateDS)
    yield put(actions.populateCreateDSresponse(Response_CreateDS.data.result))

    yield put(actions.requestUploadCSV())
    const Response_UploadCSV = yield call(api.requestUploadCSV, action.formData)
    yield put(actions.populateUploadCSVresponse(Response_UploadCSV.data.result))

    const UploadCSVFilePath = Response_UploadCSV.data.result
    yield put(actions.requestPutDataCSV(Object.assign(
      {
        "filepath": UploadCSVFilePath,
      },
      action.dataEntryForCombo_CreateDS
    )))
    const Response_PutDataCSV = yield call(
      api.requestPutCSV,
      Object.assign(
        {
          "filepath": UploadCSVFilePath,
        },
        action.dataEntryForCombo_CreateDS
      )
    )
    yield put(actions.populatePutDataCSVresponse(Response_PutDataCSV.data.result))
  } catch(e) {
    console.error(e)
  }
}

function* watchCreateDSPutCSVCombo() {
  yield takeLatest(actions.Types.COMBO_CREATE_DS_PUT_CSV, getCreateDS_PutCSVresponse)
}


function* getBranchDS_PutCSVresponse(action) {
  try{
    yield put(actions.requestBranchDS(action.dataEntryForBranchDS))
    const Response_BranchDS = yield call(api.requestBranchDS, action.dataEntryForBranchDS)
    yield put(actions.populateBranchDSresponse(Response_BranchDS.data.result))

    yield put(actions.requestUploadCSV())
    const Response_UploadCSV = yield call(api.requestUploadCSV, action.formData)
    yield put(actions.populateUploadCSVresponse(Response_UploadCSV.data.result))

    const UploadCSVFilePath = Response_UploadCSV.data.result
    yield put(actions.requestPutDataCSV(Object.assign(
      {
        "filepath": UploadCSVFilePath,
      },
      action.dataEntryForCombo_BranchDS
    )))
    const Response_PutDataCSV = yield call(
      api.requestPutCSV,
      Object.assign(
        {
          "filepath": UploadCSVFilePath,
        },
        action.dataEntryForCombo_BranchDS
      )
    )
    yield put(actions.populatePutDataCSVresponse(Response_PutDataCSV.data.result))
  } catch(e) {
    console.error(e)
  }
}

function* watchBranchDSPutCSVCombo() {
  yield takeLatest(actions.Types.COMBO_BRANCH_DS_PUT_CSV, getBranchDS_PutCSVresponse)
}


function* getPutCSVComboResponse(action) {
  try{
    yield put(actions.requestUploadCSV())
    const Response_UploadCSV = yield call(api.requestUploadCSV, action.formData)
    yield put(actions.populateUploadCSVresponse(Response_UploadCSV.data.result))

    const UploadCSVFilePath = Response_UploadCSV.data.result
    yield put(actions.requestPutDataCSV(Object.assign(
      {
        "filepath": UploadCSVFilePath,
      },
      action.dataEntryForPutCSV
    )))
    const Response_PutDataCSV = yield call(
      api.requestPutCSV,
      Object.assign(
        {
          "filepath": UploadCSVFilePath,
        },
        action.dataEntryForPutCSV
      )
    )
    yield put(actions.populatePutDataCSVresponse(Response_PutDataCSV.data.result))
  } catch(e) {
    console.error(e)
  }
}

function* watchPutCSVCombo() {
  yield takeLatest(actions.Types.COMBO_PUT_CSV, getPutCSVComboResponse)
}

/* for Get Dataset */
function* getGetDatasetResponse(action) {
  try{
    const Response_GetDataset = yield call(api.requestGetDataset, action.dataEntryForGetDS)
    yield put(actions.populateGetDatasetResponse(Response_GetDataset.data.result))
  } catch(e) {
    console.error(e)
  }
}

function* watchGetDataset() {
  yield takeLatest(actions.Types.REQUEST_GET_DATASET, getGetDatasetResponse)
}


// fork is for process creation, run in separate processes
const RowTableCmdsSagas = [
  fork(watchGetDSListRequest),
  fork(watchGetPutDEresponse),
  fork(watchBranchDSPutDECombo),
  fork(watchCreateDSPutCSVCombo),
  fork(watchBranchDSPutCSVCombo),
  fork(watchPutCSVCombo),
  fork(watchGetDataset)
]

export default RowTableCmdsSagas
