import { Types } from "./actions"


const initialState = {
  DBSize: "...loading",
  DBInfo: "",
  StorageBarStatus: "success"
};

export const StorageOverview = (state = initialState, action) => {
  switch (action.type) {
    case Types.POPULATE_DB_SIZE :
      return {
        ...state,
        DBSize: action.DBSize
      }
    case Types.POPULATE_DB_INFO :
      return {
        ...state,
        DBInfo: action.DBInfo
      }
    case Types.ACTIVATE_STORAGEBAR_LOADING :
      return {
        ...state,
        StorageBarStatus: "active"
      }
    case Types.STOP_STORAGEBAR_LOADING :
      return {
        ...state,
        StorageBarStatus: "success"
      }
    default:
      return state
  }
}
