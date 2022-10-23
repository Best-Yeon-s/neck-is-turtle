import { ACTION_TYPES } from "./modalTypes";

const initialState = {
  showLogin: false,
}

export const modalReducer = (state = initialState, action) => {
  let resultState = { ...state };

  switch (action.type) {
    case ACTION_TYPES.SET_SHOW_LOGIN:
      resultState.showLogin = action.data;
      break;
    default:
  }

  return resultState;
};