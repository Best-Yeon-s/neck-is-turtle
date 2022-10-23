import { ACTION_TYPES } from "./userDataTypes";

export const setAuth = (auth) => {
    return {type: ACTION_TYPES.SET_AUTH, data: auth};
}

export const setName = (name) => {
    return {type: ACTION_TYPES.SET_NAME, data: name};
}

export const setEmail = (email) => {
    return {type: ACTION_TYPES.SET_EMAIL, data: email};
}

export const setPicture = (picture) => {
    return {type: ACTION_TYPES.SET_PICTURE, data: picture};
}

export const setAdmin = (admin) => {
    return {type: ACTION_TYPES.SET_ADMIN, data: admin};
}