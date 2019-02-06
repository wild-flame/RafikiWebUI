import { Types } from "./actions"


const initialState = {
  DatasetList: [],
  Response_PutDE: []
};

export const RowTableCmds = (state = initialState, action) => {
  switch (action.type) {
    case Types.POPULATE_DS_LIST :
      return {
        ...state,
        DatasetList: action.DatasetList.length === 0
          ? []
          : action.DatasetList
      }
    case Types.POPULATE_PUT_DE_RESPONSE :
      return {
        ...state,
        Response_PutDE: action.Response_PutDE
      }
    default:
      return state
  }
}
