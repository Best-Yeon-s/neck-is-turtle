import MissionApi from "../apis/MissionApi";
import PoseApi from "../apis/PoseApi";
import UserApi from "../apis/UserApi";

const userApi = new UserApi();
const missionApi = new MissionApi();
const poseApi = new PoseApi();

export const checkAuth = async () => {
    await userApi.getUserInfo();
    await missionApi.getTodayCompletedMission();
    await poseApi.getTodayPose();
}