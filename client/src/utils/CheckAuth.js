import MissionApi from "../apis/MissionApi";
import UserApi from "../apis/UserApi";

const userApi = new UserApi();
const missionApi = new MissionApi();

export const checkAuth = async () => {
    await userApi.getUserInfo();
    await missionApi.getTodayCompletedMission();
}