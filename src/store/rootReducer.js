import { combineReducers } from 'redux';

import { loadingBarReducer } from 'react-redux-loading-bar'

import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"

import authReducer from "./authReducer"
import { ConsoleAppFrame } from "../containers/ConsoleAppFrame/reducer"
import { StorageOverview } from "../containers/StorageOverview/reducer"
import { RowTableCmds } from "../containers/RowTableCmds/reducer"


const rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  // for firebase-login
  authReducer,
  firestoreReducer,
  firebaseReducer,
  // app reducers:
  ConsoleAppFrame,
  StorageOverview,
  RowTableCmds
})

export default rootReducer;