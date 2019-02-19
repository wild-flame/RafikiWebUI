export const Types = {
  REQUEST_DB_SIZE: "DatabaseOverview/request_db_size",
  REQUEST_DB_INFO: "DatabaseOverview/request_db_info",
  POPULATE_DB_SIZE: "DatabaseOverview/populate_db_size",
  POPULATE_DB_INFO: "DatabaseOverview/populate_db_info",
  REQUEST_RESET_STORAGE: "DatabaseOverview/reset_storage"
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