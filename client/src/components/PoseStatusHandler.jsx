import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import usePushNotification  from "../hooks/usePushNotification";
import { detectStraight, detectTurtle } from "../redux/pose/poseAction";

function PoseStatusHandler({ status }) {
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

                    if (time.current == 10) {
                        fireNotification('자세를 고쳐 앉으세요', 'WARNING');
                    }
                    break;
                case 'STRAIGHT':
                    setStraightSec(time.current);
                    dispatch(detectStraight());

                    if (time.current == 100) {
                        fireNotification('바른 자세를 잘 유지하고 있네요!', 'CORRECT');
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