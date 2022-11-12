import { ACTION_TYPES } from "./poseType";

const initialState = {
  straightTime: 0,
  turtleTime: 0,
}

export const poseReducer = (state = initialState, action) => {
  let resultState = { ...state };

  switch (action.type) {
    case ACTION_TYPES.SET_STRAIGHT_TIME:
      resultState.straightTime = action.data;
      break;
    case ACTION_TYPES.SET_TURTLE_TIME:
      resultState.turtleTime = action.data;
      break;
    case ACTION_TYPES.DETECT_STRAIGHT:
      resultState.straightTime += 1;
      break;
    case ACTION_TYPES.DETECT_TURTLE:
      resultState.turtleTime += 1;
      break;
    default:
  }

  return resultState;
};