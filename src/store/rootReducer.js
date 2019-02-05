import { combineReducers } from 'redux';

import { auth } from "../containers/LandingPage/reducer"
import { ConsoleOverview } from "../containers/ConsoleOverview/reducer"


const rootReducer = combineReducers({
  auth,
  ConsoleOverview,
})

export default rootReducer;