export const Types = {
  NOTIFICATION_SHOW: "NOTIFICATION_SHOW",
  NOTIFICATION_HIDE: "NOTIFICATION_HIDE",
  AUTH_START: "AUTH_START",
  AUTH_SUCCESS: "AUTH_SUCCESS",
  AUTH_FAIL: "AUTH_FAIL",
  AUTH_LOGOUT: "AUTH_LOGOUT",
  // for sagas
  SIGN_IN_REQUEST: "SIGN_IN_REQUEST",
  AUTH_CHECK_STATE: "AUTH_CHECK_STATE",
}


export const notificationShow = message => ({
  type: Types.NOTIFICATION_SHOW,
  message
});

export const notificationHide = () => ({
  type: Types.NOTIFICATION_HIDE
});

// for authentication actions
export const authStart = () => ({
  type: Types.AUTH_START
})

export const authSuccess = token => ({
  type: Types.AUTH_SUCCESS,
  token
})

export const authFail = error => ({
  type: Types.AUTH_FAIL,
  error
})

export const logout = () => ({
  type: Types.AUTH_LOGOUT
})

// for sagas
export const signInRequest = (authData) => ({
  type: Types.SIGN_IN_REQUEST,
  authData
});

export const authCheckState = () => ({
  type: Types.AUTH_CHECK_STATE
})


export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS
});

export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const signOutRequest = () => ({
  type: SIGN_OUT_REQUEST
});

export const SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS";
export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS
});
