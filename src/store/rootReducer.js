import { combineReducers } from 'redux';

import { loadingBarReducer } from 'react-redux-loading-bar'

import { Root } from "../containers/Root/reducer"
import { ConsoleAppFrame } from "../containers/ConsoleAppFrame/reducer"
import { StorageOverview } from "../containers/StorageOverview/reducer"
import { RowTableCmds } from "../containers/RowTableCmds/reducer"


const rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  // app reducers:
  Root,
  ConsoleAppFrame,
  StorageOverview,
  RowTableCmds
})

export default rootReducer;