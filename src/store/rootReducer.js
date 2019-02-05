import { combineReducers } from 'redux';

import { loadingBarReducer } from 'react-redux-loading-bar'

import { auth } from "../containers/LandingPage/reducer"
import { ConsoleAppFrame } from "../containers/ConsoleAppFrame/reducer"
import { DatabaseOverview } from "../containers/DatabaseOverview/reducer"


const rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  // app reducers:
  auth,
  ConsoleAppFrame,
  DatabaseOverview
})

export default rootReducer;