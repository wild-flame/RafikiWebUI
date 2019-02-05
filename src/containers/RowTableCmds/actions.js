export const Types = {
  REQUEST_LS_DS: "RowTableCmds/request_ls_ds",
  POPULATE_DS_LIST: "RowTableCmds/populate_ds_list"
}

export const requestListDS = () => ({
  type: Types.REQUEST_LS_DS
})

export const populateDSList = DatasetList => ({
  type: Types.POPULATE_DS_LIST,
  DatasetList
})