import {
  takeLatest,
  call,
  fork,
  put,
  take
} from "redux-saga/effects"
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import * as actions from "../containers/RowTableCmds/actions"
import * as api from "../services/RowTableAPI"
import * as OverviewActions from "../containers/StorageOverview/actions"
import { uploadAPI } from "./uploadAPI_saga"


/* Shared Util commands */
function * CreateDS(action) {
  try {
    yield put(actions.requestCreateDS(action.dataEntryForCreateDS))
    const Response_CreateDS = yield call(api.requestCreateDS, action.dataEntryForCreateDS)
    yield put(actions.populateCreateDSresponse(Response_CreateDS.data.result))
    console.log("CreateDS called, the small one :D")
  } catch(e) {
    console.error(e)
  }
}

function* BranchDS(action) {
  try {
    yield put(actions.requestBranchDS(action.dataEntryForBranchDS))
    const Response_BranchDS = yield call(api.requestBranchDS, action.dataEntryForBranchDS)
    yield put(actions.populateBranchDSresponse(Response_BranchDS.data.result))
    console.log("BranchDS called, the small one :D")
  } catch(e) {
    console.error(e)
  }
}

function* UploadCSV(action) {
  try {
    yield put(actions.requestUploadCSV())
    const channel = yield call(uploadAPI, action.formData);
    // Process events until operation completes
    while (true) {
      const { percentCompleted, result } = yield take(channel);
      console.log(percentCompleted, result)
      // Handle the data...
      if (result) {
        const UploadCSVFilePath = result
        console.log("channelEmit stopped")
        return UploadCSVFilePath
      }
      yield put(actions.populateUploadProgress(percentCompleted))
    }
  } catch(e) {
    console.error(e)
  }
}


/* for List Dataset command */
function* getDatasetList() {
  try{
    yield put(showLoading())
    const DSList = yield call(api.requestListDataset)
    yield put(actions.populateDSList(DSList.data.DSList))
    yield put(hideLoading())
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
    yield put(actions.populatePutDEresponse(Response_PutDE.data.result))
    yield put(OverviewActions.requestDBSize())
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}

function* watchGetPutDEresponse() {
  yield takeLatest(actions.Types.REQUEST_PUT_DE, getPutDEresponse)
}


function* getBranchDS_PutDEresponse(action) {
  try {
    yield put(showLoading())
    yield BranchDS(action)

    // skip the requestPutDE action as the watcher will pick up a sagas above
    // yield put(actions.requestPutDE(action.dataEntryForCombo_BranchDS))
    const Response_PutDE = yield call(api.requestPutDataEntry, action.dataEntryForCombo_BranchDS)
    yield put(actions.populatePutDEresponse(Response_PutDE.data.result))
    yield put(OverviewActions.requestDBSize())
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}

function* watchBranchDSPutDECombo() {
  yield takeLatest(actions.Types.COMBO_BRANCH_DS_PUT_DE, getBranchDS_PutDEresponse)
}

/* for only Branch Dataset request */
function* getBranchDSresponse(action) {
  try {
    yield put(showLoading())
    yield BranchDS(action)
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}
// not really a combo, just to prevent a separate watcher for BranchDS
function* watchBranchDSCombo() {
  yield takeLatest(actions.Types.COMBO_BRANCH_DS, getBranchDSresponse)
}


/* for Put Data Entry by CSV page, combining createDS, branchDS and uploadCSV */
function* getCreateDS_PutCSVresponse(action) {
  try{
    yield put(showLoading())
    yield CreateDS(action)

    const UploadCSVFilePath = yield UploadCSV(action)

    yield put(actions.populateUploadCSVresponse(UploadCSVFilePath))

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
    yield put(OverviewActions.requestDBSize())
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}

function* watchCreateDSPutCSVCombo() {
  yield takeLatest(actions.Types.COMBO_CREATE_DS_PUT_CSV, getCreateDS_PutCSVresponse)
}


function* getBranchDS_PutCSVresponse(action) {
  try{
    yield put(showLoading())
    yield BranchDS(action)

    const UploadCSVFilePath = yield UploadCSV(action)
    yield put(actions.populateUploadCSVresponse(UploadCSVFilePath))

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
    yield put(OverviewActions.requestDBSize())
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}

function* watchBranchDSPutCSVCombo() {
  yield takeLatest(actions.Types.COMBO_BRANCH_DS_PUT_CSV, getBranchDS_PutCSVresponse)
}


function* getPutCSVComboResponse(action) {
  try{
    yield put(showLoading())
    const UploadCSVFilePath = yield UploadCSV(action)
    yield put(actions.populateUploadCSVresponse(UploadCSVFilePath))

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
    yield put(OverviewActions.requestDBSize())
    yield put(hideLoading())
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
    yield put(showLoading())
    const Response_GetDataset = yield call(api.requestGetDataset, action.dataEntryForGetDS)
    yield put(actions.populateGetDatasetResponse(Response_GetDataset.data.result))
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}

function* watchGetDataset() {
  yield takeLatest(actions.Types.REQUEST_GET_DATASET, getGetDatasetResponse)
}


/* for Get Dataset Schema */
function* getGetDSSchemaResponse(action) {
  try{
    yield put(showLoading())
    const Response_GetDSSchema = yield call(api.requestGetDSSchema, action.dataEntryForGetDSSchema)
    yield put(actions.populateGetDSSchemaResponse(Response_GetDSSchema.data.result))
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}

function* watchGetDSSchema() {
  yield takeLatest(actions.Types.REQUEST_GET_DSSCHEMA, getGetDSSchemaResponse)
}


/* for Get Data Entry */
function* getGetDataEntryResponse(action) {
  try{
    yield put(showLoading())
    const Response_GetDataEntry = yield call(api.requestGetDataEntry, action.dataEntryForGetDataEntry)
    yield put(actions.populateGetDataEntryResponse(Response_GetDataEntry.data.result))
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}

function* watchGetDataEntry() {
  yield takeLatest(actions.Types.REQUEST_GET_DATA_ENTRY, getGetDataEntryResponse)
}

/* for Diff Dataset */
function* getDiffSameDSresponse(action) {
  try{
    yield put(showLoading())
    const Response_DiffDS = yield call(api.requestDiffSameDS, action.dataEntryForSameDS)
    yield put(actions.populateDiffDSresponse(Response_DiffDS.data.result))
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}

function* watchDiffSameDS() {
  yield takeLatest(actions.Types.REQUEST_DIFF_SAME_DS, getDiffSameDSresponse)
}

function* getDiffDifferentDSresponse(action) {
  try{
    yield put(showLoading())
    const Response_DiffDS = yield call(api.requestDiffDifferentDS, action.dataEntryForDifferentDS)
    yield put(actions.populateDiffDSresponse(Response_DiffDS.data.result))
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}

function* watchDiffDifferentDS() {
  yield takeLatest(actions.Types.REQUEST_DIFF_DIFFERENT_DS, getDiffDifferentDSresponse)
}

/* for Delete Dataset */
function* getDeleteDatasetResponse(action) {
  try{
    yield put(showLoading())
    const Response_DeleteDS = yield call(api.requestDeleteDataset, action.dataEntryForDeleteDS)
    yield put(actions.populateDeleteDatasetResponse(Response_DeleteDS.data.result))
    yield put(OverviewActions.requestDBSize())
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}

function* watchDeleteDS() {
  yield takeLatest(actions.Types.REQUEST_DELETE_DATASET, getDeleteDatasetResponse)
}

/* for Export Dataset Binary */
function* getExportDSresponse(action) {
  try{
    yield put(showLoading())
    const Response_ExportDS = yield call(api.requestExportDS, action.dataEntryForExportDS)
    yield put(actions.populateExportDSresponse(Response_ExportDS.data.result))
    yield put(hideLoading())
  } catch(e) {
    console.error(e)
  }
}

function* watchExportDS() {
  yield takeLatest(actions.Types.REQUEST_EXPORT_DS, getExportDSresponse)
}


// fork is for process creation, run in separate processes
const RowTableCmdsSagas = [
  fork(watchGetDSListRequest),
  fork(watchGetPutDEresponse),
  fork(watchBranchDSPutDECombo),
  fork(watchBranchDSCombo),
  fork(watchCreateDSPutCSVCombo),
  fork(watchBranchDSPutCSVCombo),
  fork(watchPutCSVCombo),
  fork(watchGetDataset),
  fork(watchGetDSSchema),
  fork(watchGetDataEntry),
  fork(watchDiffSameDS),
  fork(watchDiffDifferentDS),
  fork(watchDeleteDS),
  fork(watchExportDS)
]

export default RowTableCmdsSagas
