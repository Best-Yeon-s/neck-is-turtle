import { get, post, put, destroy } from './AxiosCreate';
import store from '../redux/store';
import { setCompletedMissionList } from '../redux/mission/missionAction';

class MissionApi {
    getTodayCompletedMission = async () => {
        const res = await get('mission/today');
        store.dispatch(setCompletedMissionList(res.data));
    }
}
export default MissionApi;