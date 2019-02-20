import { Types } from "./actions"


const initialState = {
  DBSize: "...Bytes",
  DBInfo: "",
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
    default:
      return state
  }
}
