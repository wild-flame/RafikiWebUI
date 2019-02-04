import { Types } from "./actions"


const initialState = {
  mobileOpen: false,
  headerTitle: "Database Overview"
};

export const ConsoleOverview = (state = initialState, action) => {
  switch (action.type) {
    case Types.DRAWER_TOGGLE :
      return {
        ...state,
        mobileOpen: !state.mobileOpen
      }
    case Types.CHANGE_HEADER_TITLE :
      return {
        ...state,
        headerTitle: action.headerTitle
      }
    default:
      return state
  }
}
