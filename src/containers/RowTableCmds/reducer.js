import { Types } from "./actions"


const initialState = {
  // Ls-ds
  DatasetList: [],
  // put-de
  Response_PutDE: [],
  // put-csv
  Response_PutDataCSV: [],
  Response_CreateDS: [],
  Response_BranchDS: [],
  Response_UploadCSV: ""
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
    case Types.POPULATE_CREATE_DS_RESPONSE :
      return {
        ...state,
        Response_CreateDS: action.Response_CreateDS
      }
    case Types.POPULATE_BRANCH_DS_RESPONSE :
      return {
        ...state,
        Response_BranchDS: action.Response_BranchDS
      }
    case Types.POPULATE_UPLOAD_CSV_RESPONSE :
      return {
        ...state,
        Response_UploadCSV: action.Response_UploadCSV
      }
    case Types.POPULATE_PUT_DATA_CSV_RESPONSE :
      return {
        ...state,
        Response_PutDataCSV: action.Response_PutDataCSV
      }
    default:
      return state
  }
}
