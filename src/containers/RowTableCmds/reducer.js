import { Types } from "./actions"


const StatesToReset = {
  // put-de
  Response_PutDE: [],
  // put-csv
  Response_PutDataCSV: [],
  Response_CreateDS: [],
  Response_BranchDS: [],
  Response_UploadCSV: "",
  percentCompleted: 0,
  // get-ds
  Response_GetDataset: [],
  // get-ds-sch
  Response_GetDSSchema: [],
  // get-de
  Response_GetDataEntry: [],
  // diff-ds
  Response_DiffDS: [],
  // delete-dataset
  Response_DeleteDS: [],
  // export-ds-bin
  Response_ExportDS: [],
  // ForkBase Status
  formState: "init"
}

const initialState = {
  // Ls-ds
  DatasetList: [
    {
      'dataset': '...',
      'branches': ['']
    }
  ],
  ...StatesToReset
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
    case Types.POPULATE_UPLOAD_PROGRESS :
      return {
        ...state,
        percentCompleted: action.percentCompleted
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
    case Types.POPULATE_GET_DATASET_RESPONSE :
      return {
        ...state,
        Response_GetDataset: action.Response_GetDataset
      }
    case Types.POPULATE_GET_DSSCHEMA_RESPONSE :
      return {
        ...state,
        Response_GetDSSchema: action.Response_GetDSSchema
      }
    case Types.POPULATE_GET_DATA_ENTRY_RESPONSE :
      return {
        ...state,
        Response_GetDataEntry: action.Response_GetDataEntry
      }
    case Types.POPULATE_DIFFDS_RESPONSE :
      return {
        ...state,
        Response_DiffDS: action.Response_DiffDS
      }
    case Types.POPULATE_DELETE_DATASET_RESPONSE :
      return {
        ...state,
        Response_DeleteDS: action.Response_DeleteDS
      }
    case Types.POPULATE_EXPORT_DS_RESPONSE :
      return {
        ...state,
        Response_ExportDS: action.Response_ExportDS
      }
    case Types.RESET_RESPONSES :
      return {
        ...state,
        ...StatesToReset
      }
    case Types.LOADING_FORMSTATE :
      return {
        ...state,
        formState: "loading"
      }
    case Types.IDLE_FORMSTATE :
      return {
        ...state,
        formState: "idle"
      }
    default:
      return state
  }
}
