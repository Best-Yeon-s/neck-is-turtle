import { applyMiddleware, legacy_createStore, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userDataReducer } from './userData/userDataReducer';
import { modalReducer } from "./modal/modalReducer";
import { missionReducer } from "./mission/missionReducer";
import { poseReducer } from "./pose/poseReducer";

const rootReducer = combineReducers({
    userData: userDataReducer,
    modal: modalReducer,
    mission: missionReducer,
    pose: poseReducer,
})

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));   

const configureStore = () => {
    return legacy_createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
