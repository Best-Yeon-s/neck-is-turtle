import { ACTION_TYPES } from "./poseType";

export const setStraightTime = (time) => {
    return {type: ACTION_TYPES.SET_STRAIGHT_TIME, data: time};
}

export const setTurtleTime = (time) => {
    return {type: ACTION_TYPES.SET_TURTLE_TIME, data: time};
}