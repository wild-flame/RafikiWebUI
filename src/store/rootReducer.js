import { combineReducers } from 'redux';

import { auth } from "../containers/LandingPage/reducer"
import { ConsoleAppFrame } from "../containers/ConsoleAppFrame/reducer"


const rootReducer = combineReducers({
  auth,
  ConsoleAppFrame,
})

export default rootReducer;