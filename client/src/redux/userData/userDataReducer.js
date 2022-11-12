import { ACTION_TYPES } from "./userDataTypes";

const initialState = {
    auth: true,
    name: '',
    email: '',
    picture: null,
    straightRatio: 0.42,
}

export const userDataReducer = (state = initialState, action) => {
    let resultState = { ...state };
  
    switch (action.type) {
        case ACTION_TYPES.SET_AUTH:
            resultState.auth = action.data;
            break;
          case ACTION_TYPES.SET_ID:
            resultState.myId = action.data;
            break;
          case ACTION_TYPES.SET_NAME:
            resultState.name = action.data;
            break;
          case ACTION_TYPES.SET_EMAIL:
            resultState.email = action.data;
            break;
          case ACTION_TYPES.SET_PICTURE:
            resultState.picture = action.data;
            break;
          case ACTION_TYPES.SET_STRAIGHT_RATIO:
            resultState.straightRatio = action.data;
            break;
      default:
    }
  
    return resultState;
  };