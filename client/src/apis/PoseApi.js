import { get, post, put, destroy } from './AxiosCreate';
import store from '../redux/store';
import { setStraightTime, setTurtleTime } from '../redux/pose/poseAction';

class PoseApi {
    getTodayPose = async () => {
        const res = await get('post/today');
        store.dispatch(setStraightTime(res.data.straightTime));
        store.dispatch(setTurtleTime(res.data.turtleTime));
    }
}
export default PoseApi;