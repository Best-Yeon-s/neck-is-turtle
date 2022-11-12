import { get, post, put, destroy } from './AxiosCreate';
import store from '../redux/store';
import { completeMission, setCompletedMissionList } from '../redux/mission/missionAction';

class MissionApi {
    getTodayCompletedMission = async () => {
        const res = await get('mission/today');
        store.dispatch(setCompletedMissionList(res.data));
    }

    completeMission = async (missionId) => {
        await post(`mission/${missionId}`);
        store.dispatch(completeMission(missionId));
    }
}
export default MissionApi;