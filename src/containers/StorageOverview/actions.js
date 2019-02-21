export const Types = {
  REQUEST_DB_SIZE: "StorageOverview/request_db_size",
  REQUEST_DB_INFO: "StorageOverview/request_db_info",
  POPULATE_DB_SIZE: "StorageOverview/populate_db_size",
  POPULATE_DB_INFO: "StorageOverview/populate_db_info",
  REQUEST_RESET_STORAGE: "StorageOverview/reset_storage",
  ACTIVATE_STORAGEBAR_LOADING: "StorageOverview/activate_storagebar_loading",
  STOP_STORAGEBAR_LOADING: "StorageOverview/stop_storagebar_loading"
}

export const requestDBSize = () => ({
  type: Types.REQUEST_DB_SIZE
})

export const requestDBInfo = () => ({
  type: Types.REQUEST_DB_INFO
})

export const populateDBSize = (DBSize) => ({
  type: Types.POPULATE_DB_SIZE,
  DBSize
})

export const populateDBInfo = (DBInfo) => ({
  type: Types.POPULATE_DB_INFO,
  DBInfo
})

export const requestResetStorage = () => ({
  type: Types.REQUEST_RESET_STORAGE
})

export const activateStorageBarLoading = () => ({
  type: Types.ACTIVATE_STORAGEBAR_LOADING
})

export const stopStorageBarLoading = () => ({
  type: Types.STOP_STORAGEBAR_LOADING
})