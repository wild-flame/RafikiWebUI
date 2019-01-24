import { combineReducers } from 'redux';

import { BoilerPlate } from "../containers/BoilerPlate/reducer"
import { auth } from "../containers/LandingPage/reducer"


const rootReducer = combineReducers({
  BoilerPlate,
  auth
})

export default rootReducer;