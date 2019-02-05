import { combineReducers } from 'redux';

import { auth } from "../containers/LandingPage/reducer"
import { ConsoleAppFrame } from "../containers/ConsoleAppFrame/reducer"
import { DatabaseOverview } from "../containers/DatabaseOverview/reducer"


const rootReducer = combineReducers({
  auth,
  ConsoleAppFrame,
  DatabaseOverview
})

export default rootReducer;