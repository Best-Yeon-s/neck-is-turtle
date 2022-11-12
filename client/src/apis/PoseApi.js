import { get, post, put, destroy } from './AxiosCreate';
import store from '../redux/store';
import { setStraightTime, setTurtleTime } from '../redux/pose/poseAction';

class PoseApi {
    getTodayPose = async () => {
        const res = await get('pose/today');
        if (res.data.straightTime === null) {
            await this.postTodayPoseTime();
        }
        store.dispatch(setStraightTime(res.data.straightTime ? res.data.straightTime : 0));
        store.dispatch(setTurtleTime(res.data.turtleTime ? res.data.turtleTime : 0));
    }

    postTodayPoseTime = async () => {
        const res = await post('pose/today', {
            straightTime: 0,
            turtleTime: 0
        });
    }

    setTodayStraightTime = async (time) => {
        const res = await put('pose/straight', {
            straightTime: time
        });
        console.log('straight',time);
    }

    setTodayTurtleTime = async (time) => {
        const res = await put('pose/turtle', {
            turtleTime: time
        });
        console.log('turtle',time);
    }
}
export default PoseApi;