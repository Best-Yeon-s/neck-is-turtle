import { ACTION_TYPES } from "./missionType";

export const setCompletedMissionList = (completedMissionList) => {
    return {type: ACTION_TYPES.SET_COMPLETED_MISSION_LIST, data: completedMissionList};
}

export const completeMission = (missionId) => {
    return {type: ACTION_TYPES.COMPLETE_MISSION, data: missionId};
}