import { ACTION_TYPES } from "./poseType";

export const setStraightTime = (time) => {
    return {type: ACTION_TYPES.SET_STRAIGHT_TIME, data: time};
}

export const setTurtleTime = (time) => {
    return {type: ACTION_TYPES.SET_TURTLE_TIME, data: time};
}

export const detectStraight = () => {
    return {type: ACTION_TYPES.DETECT_STRAIGHT, data: 1};
}

export const detectTurtle = () => {
    return {type: ACTION_TYPES.DETECT_TURTLE, data: 1};
}