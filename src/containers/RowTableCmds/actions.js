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
  POPULATE_UPLOAD_CSV_RESPONSE: "RowTableCmds/populate_upload_csv_response",
  // combined action to trigger sagas
  COMBO_CREATE_DS_PUT_CSV: "RowTableCmds/call_combo_create_ds_put_csv",
  COMBO_BRANCH_DS_PUT_CSV: "RowTableCmds/call_combo_branch_ds_put_csv",
  COMBO_PUT_CSV: "RowTableCmds/call_combo_put_csv"
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
export const requestPutDE = dataEntry => ({
  type: Types.REQUEST_PUT_DE,
  dataEntry
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