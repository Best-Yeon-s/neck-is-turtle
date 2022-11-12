import { ACTION_TYPES } from "./missionType";

const initialState = {
  completedMissionList: [],
}

export const missionReducer = (state = initialState, action) => {
  let resultState = { ...state };

  switch (action.type) {
    case ACTION_TYPES.SET_COMPLETED_MISSION_LIST:
      resultState.completedMissionList = action.data;
      break;
    case ACTION_TYPES.COMPLETE_MISSION:
      resultState.completedMissionList = [...resultState.completedMissionList, action.data];
      break;
    default:
  }

  return resultState;
};