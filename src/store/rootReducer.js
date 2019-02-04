import { combineReducers } from 'redux';

import { BoilerPlate } from "../containers/BoilerPlate/reducer"
import { auth } from "../containers/LandingPage/reducer"
import { ConsoleOverview } from "../containers/ConsoleOverview/reducer"


const rootReducer = combineReducers({
  BoilerPlate,
  auth,
  ConsoleOverview,
})

export default rootReducer;