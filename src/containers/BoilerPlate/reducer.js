import { Types } from "./actions"


const initialState = {
  makeTheWorldABetterPlace: true,
  tooMuchBoilerPlate: "a little bit..."
};

export const BoilerPlate = (state = initialState, action) => {
  switch (action.type) {
    case Types.ACTION_DEMO:
      return {
        ...state,
        tooMuchBoilerPlate: "not really!"
      }
    default:
      return state
  }
}
