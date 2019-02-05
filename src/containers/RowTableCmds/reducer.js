import { Types } from "./actions"


const initialState = {
  DatasetList: []
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
    default:
      return state
  }
}
