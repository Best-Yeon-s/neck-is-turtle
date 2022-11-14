import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import MissionApi from "../apis/MissionApi";
import usePushNotification  from "../hooks/usePushNotification";
import { completeMission } from "../redux/mission/missionAction";
import { detectStraight, detectTurtle } from "../redux/pose/poseAction";

function PoseStatusHandler({ status }) {
    const missionApi = new MissionApi();
    const dispatch = useDispatch();
    const [straightSec, setStraightSec] = useState(0);
    const [turtleSec, setTurtleSec] = useState(0);
    const {fireNotification} = usePushNotification();

    const timer = useRef(null);
    const time = useRef(0);
    const [sec, setSec] = useState(0);

    useEffect(()=>{
        time.current = 0;
        timer.current = setInterval(()=>{
            time.current += 1;
            setSec(time.current);
            switch(status) {
                case 'TURTLE':
                    setTurtleSec(time.current);
                    dispatch(detectTurtle());

                    // 거북목 자세일 때 15초마다 알람을 보내도록
                    if (time.current % 15 === 0) {
                        fireNotification('자세를 고쳐 앉으세요', 'WARNING');
                    }
                    break;
                case 'STRAIGHT':
                    setStraightSec(time.current);
                    dispatch(detectStraight());

                    if (time.current % 100 == 0) {
                        fireNotification('바른 자세를 잘 유지하고 있네요!', 'CORRECT');
                    }

                    // Mission 2. 바른 자세 연속 15분 달성
                    if (time.current === 15 * 60) {
                        missionApi.completeMission(2);
                    }
                    break;
                default:
            }
            // console.log(time.current, status);
        }, 1000);

        return () => clearInterval(timer.current);
    }, [status])
}
export default PoseStatusHandler;