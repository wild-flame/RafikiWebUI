const iniState = {
  authError: ""
}

const authReducer = (state=iniState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error")
      return {
        ...state,
        authError: "Login failed"
      }
    case "LOGIN_SUCCESS":
      console.log("login success")
      return {
        ...state,
        authError: ""
      }
    case "SIGNOUT_SUCCESS":
      console.log("signOUT sucess")
      return state
    case "SIGNOUT_ERROR":
      console.log("signOUT failed")
      return state
    case "SIGNUP_SUCCESS":
      console.log("signUP sucess")
      return {
        ...state,
        authError: ""
      }
    case "SIGNUP_ERROR":
      console.log("signUP failed")
      return {
        ...state,
        authError: action.err.message
      }
    default: 
      return state
  }
}

export default authReducer