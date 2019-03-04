export const Types = {
  REQUEST_LS_DS: "RowTableCmds/request_ls_ds",
  POPULATE_DS_LIST: "RowTableCmds/populate_ds_list",
  REQUEST_PUT_DE: "RowTableCmds/request_put_de",
  POPULATE_PUT_DE_RESPONSE: "RowTableCmds/populate_put_de_response",
  REQUEST_PUT_DATA_CSV: "RowTableCmds/request_put_data_csv",
  POPULATE_PUT_DATA_CSV_RESPONSE: "RowTableCmds/populate_put_data_csv_response",
  REQUEST_CREATE_DS: "RowTableCmds/request_create_ds",
  POPULATE_CREATE_DS_RESPONSE: "RowTableCmds/populate_create_ds_response",
  REQUEST_BRANCH_DS: "RowTableCmds/request_branch_ds",
  POPULATE_BRANCH_DS_RESPONSE: "RowTableCmds/populate_branch_ds_response",
  REQUEST_UPLOAD_CSV: "RowTableCmds/request_upload_csv",
  POPULATE_UPLOAD_PROGRESS: "RowTableCmds/populate_upload_progress",
  POPULATE_UPLOAD_CSV_RESPONSE: "RowTableCmds/populate_upload_csv_response",
  REQUEST_GET_DATASET: "RowTableCmds/request_get_dataset",
  POPULATE_GET_DATASET_RESPONSE: "RowTableCmds/populate_get_dataset_response",
  REQUEST_GET_DSSCHEMA: "RowTableCmds/request_get_dsschema",
  POPULATE_GET_DSSCHEMA_RESPONSE: "RowTableCmds/populate_get_dsschema_response",
  REQUEST_GET_DATA_ENTRY: "RowTableCmds/request_get_data_entry",
  POPULATE_GET_DATA_ENTRY_RESPONSE: "RowTableCmds/populate_get_data_entry_response",
  REQUEST_DIFF_SAME_DS: "RowTableCmds/request_diff_same_ds",
  REQUEST_DIFF_DIFFERENT_DS: "RowTableCmds/request_diff_different_ds",
  POPULATE_DIFFDS_RESPONSE: "RowTableCmds/populate_diffds_response",
  REQUEST_DELETE_DATASET: "RowTableCmds/request_delete_dataset",
  POPULATE_DELETE_DATASET_RESPONSE: "RowTableCmds/populate_delete_dataset_response",
  REQUEST_EXPORT_DS: "RowTableCmds/request_export_ds",
  POPULATE_EXPORT_DS_RESPONSE: "RowTableCmds/populate_export_ds_response",
  // combined action to trigger sagas
  COMBO_CREATE_DS_PUT_CSV: "RowTableCmds/call_combo_create_ds_put_csv",
  COMBO_BRANCH_DS_PUT_CSV: "RowTableCmds/call_combo_branch_ds_put_csv",
  COMBO_PUT_CSV: "RowTableCmds/call_combo_put_csv",
  COMBO_BRANCH_DS_PUT_DE: "RowTableCmds/call_combo_branch_ds_put_de",
  COMBO_BRANCH_DS: "RowTableCmds/call_combo_branch_ds",
  // reset responses when route change
  RESET_RESPONSES: "RowTableCmds/reset_responses",
  // formState
  LOADING_FORMSTATE: "RowTableCmds/loading_formstate",
  IDLE_FORMSTATE: "RowTableCmds/idle_responses",
  // gitgraph and meta cmds
  REQUEST_VERSION_HISTORY: "RowTableCmds/request_version_history",
  POPULATE_VERSION_HISTORY: "RowTableCmds/populate_version_history",
  CLEAR_VERSION_HISTORY: "RowTableCmds/clear_version_history",
  // diff DS view difference
  REQUEST_GETDE_FORDIFF_1: "RowTableCmds/request_getde_fordiff_1",
  POPULATE_GETDE_FORDIFF_1: "RowTableCmds/populate_getde_fordiff_1",
  REQUEST_GETDE_FORDIFF_2: "RowTableCmds/request_getde_fordiff_2",
  POPULATE_GETDE_FORDIFF_2: "RowTableCmds/populate_getde_fordiff_2",
  RESET_GETDE_FORDIFF: "RowTableCmds/reset_getde_fordiff",
}

// LIST_DATASET{_ALL}
export const requestListDS = () => ({
  type: Types.REQUEST_LS_DS
})

export const populateDSList = DatasetList => ({
  type: Types.POPULATE_DS_LIST,
  DatasetList
})

// PUT_DATA_ENTRY
export const requestPutDE = dataEntryPutDE => ({
  type: Types.REQUEST_PUT_DE,
  dataEntryPutDE
})

export const populatePutDEresponse = Response_PutDE => ({
  type: Types.POPULATE_PUT_DE_RESPONSE,
  Response_PutDE
})

// PUT_DATA_ENTRY_BY_CSV
export const requestPutDataCSV = dataEntry => ({
  type: Types.REQUEST_PUT_DATA_CSV,
  dataEntry
})

export const populatePutDataCSVresponse = Response_PutDataCSV => ({
  type: Types.POPULATE_PUT_DATA_CSV_RESPONSE,
  Response_PutDataCSV
})

// CREATE_DATASET
export const requestCreateDS = dataEntryForCreateDS => ({
  type: Types.REQUEST_CREATE_DS,
  dataEntryForCreateDS
})

export const populateCreateDSresponse = Response_CreateDS => ({
  type: Types.POPULATE_CREATE_DS_RESPONSE,
  Response_CreateDS
})

// BRANCH_DATASET
export const requestBranchDS = dataEntryForBranchDS => ({
  type: Types.REQUEST_BRANCH_DS,
  dataEntryForBranchDS
})

export const populateBranchDSresponse = Response_BranchDS => ({
  type: Types.POPULATE_BRANCH_DS_RESPONSE,
  Response_BranchDS
})

// Upload single CSV
export const requestUploadCSV = () => ({
  type: Types.REQUEST_UPLOAD_CSV
})

export const populateUploadProgress = percentCompleted => ({
  type: Types.POPULATE_UPLOAD_PROGRESS,
  percentCompleted
})

export const populateUploadCSVresponse = Response_UploadCSV => ({
  type: Types.POPULATE_UPLOAD_CSV_RESPONSE,
  Response_UploadCSV
})

// trigger combo_CreateDS_PutCSV()
export const triggerCreateDS_PutCSV_Combo = (
  dataEntryForCreateDS,
  formData,
  dataEntryForCombo_CreateDS
) => ({
  type: Types.COMBO_CREATE_DS_PUT_CSV,
  dataEntryForCreateDS,
  formData,
  dataEntryForCombo_CreateDS
})

// trigger combo_BranchDS_PutCSV()
export const triggerBranchDS_PutCSV_Combo = (
  dataEntryForBranchDS,
  formData,
  dataEntryForCombo_BranchDS
) => ({
  type: Types.COMBO_BRANCH_DS_PUT_CSV,
  dataEntryForBranchDS,
  formData,
  dataEntryForCombo_BranchDS
})

// trigger combo_PutCSV()
export const triggerPutCSV_Combo = (
  formData,
  dataEntryForPutCSV
) => ({
  type: Types.COMBO_PUT_CSV,
  formData,
  dataEntryForPutCSV
})

// trigger combo_BranchDS_PutDE()
export const triggerBranchDS_PutDE_Combo = (
  dataEntryForBranchDS,
  dataEntryForCombo_BranchDS
) => ({
  type: Types.COMBO_BRANCH_DS_PUT_DE,
  dataEntryForBranchDS,
  dataEntryForCombo_BranchDS
})

// trigger combo_BranchDS()
// do not dispatch branchDS on its own due to saga watcher
export const triggerBranchDS_Combo = dataEntryForBranchDS => ({
  type: Types.COMBO_BRANCH_DS,
  dataEntryForBranchDS
})

// GET_DATASET{_ALL}
export const requestGetDataset = dataEntryForGetDS => ({
  type: Types.REQUEST_GET_DATASET,
  dataEntryForGetDS
})

export const populateGetDatasetResponse = Response_GetDataset => ({
  type: Types.POPULATE_GET_DATASET_RESPONSE,
  Response_GetDataset
})

// GET_DATASET_SCHEMA
export const requestGetDSSchema = dataEntryForGetDSSchema => ({
  type: Types.REQUEST_GET_DSSCHEMA,
  dataEntryForGetDSSchema
})

export const populateGetDSSchemaResponse = Response_GetDSSchema => ({
  type: Types.POPULATE_GET_DSSCHEMA_RESPONSE,
  Response_GetDSSchema
})

// GET_DATA_ENTRY
export const requestGetDataEntry = dataEntryForGetDataEntry => ({
  type: Types.REQUEST_GET_DATA_ENTRY,
  dataEntryForGetDataEntry
})

export const populateGetDataEntryResponse = Response_GetDataEntry => ({
  type: Types.POPULATE_GET_DATA_ENTRY_RESPONSE,
  Response_GetDataEntry
})

// DIFF_DS
export const requestDiffSameDS = dataEntryForSameDS => ({
  type: Types.REQUEST_DIFF_SAME_DS,
  dataEntryForSameDS
})

export const requestDiffDifferentDS = dataEntryForDifferentDS => ({
  type: Types.REQUEST_DIFF_DIFFERENT_DS,
  dataEntryForDifferentDS
})

export const populateDiffDSresponse = Response_DiffDS => ({
  type: Types.POPULATE_DIFFDS_RESPONSE,
  Response_DiffDS
})

// DELETE_DATASET
export const requestDeleteDataset = dataEntryForDeleteDS => ({
  type: Types.REQUEST_DELETE_DATASET,
  dataEntryForDeleteDS
})

export const populateDeleteDatasetResponse = Response_DeleteDS => ({
  type: Types.POPULATE_DELETE_DATASET_RESPONSE,
  Response_DeleteDS
})

// EXPORT_DATASET_BINARY
export const requestExportDS = dataEntryForExportDS => ({
  type: Types.REQUEST_EXPORT_DS,
  dataEntryForExportDS
})

export const populateExportDSresponse = Response_ExportDS => ({
  type: Types.POPULATE_EXPORT_DS_RESPONSE,
  Response_ExportDS
})

// clear the Response_* when route unmount
export const resetResponses = () => ({
  type: Types.RESET_RESPONSES
})

// formState change
export const loadingFormState = () => ({
  type: Types.LOADING_FORMSTATE
})

export const idleFormState = () => ({
  type: Types.IDLE_FORMSTATE
})

// gitgraph and meta cmds
export const requestVersionHistory = item => ({
  type: Types.REQUEST_VERSION_HISTORY,
  item
})

export const populateVersionHistory = Response_Version_History => ({
  type: Types.POPULATE_VERSION_HISTORY,
  Response_Version_History
})

export const clearVersionHistory = () => ({
  type: Types.CLEAR_VERSION_HISTORY
})

// diff DS view difference
export const requestGetDataEntry_forDiff_1 = dataEntryForGetDataEntry_1 => ({
  type: Types.REQUEST_GETDE_FORDIFF_1,
  dataEntryForGetDataEntry_1
})

export const populateGetDataEntry_forDiff_1 = GetDEforDiff_1_Response => ({
  type: Types.POPULATE_GETDE_FORDIFF_1,
  GetDEforDiff_1_Response
})

export const requestGetDataEntry_forDiff_2 = dataEntryForGetDataEntry_2 => ({
  type: Types.REQUEST_GETDE_FORDIFF_2,
  dataEntryForGetDataEntry_2
})

export const populateGetDataEntry_forDiff_2 = GetDEforDiff_2_Response => ({
  type: Types.POPULATE_GETDE_FORDIFF_2,
  GetDEforDiff_2_Response
})

export const resetGetDEforDiff = () => ({
  type: Types.RESET_GETDE_FORDIFF
})
