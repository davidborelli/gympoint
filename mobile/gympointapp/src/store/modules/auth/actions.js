export function signInRequest(idUser) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { idUser },
  };
}

export function signInSuccess(idUser, name) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { idUser, name },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
