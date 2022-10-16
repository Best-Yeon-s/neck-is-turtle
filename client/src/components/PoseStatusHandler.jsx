import { useState, useEffect, useRef } from "react";
import usePushNotification  from "../hooks/usePushNotification";

function PoseStatusHandler({ status }) {
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

                    if (time.current == 10) {
                        fireNotification('자세를 고쳐 앉으세요');
                    }
                    break;
                case 'STRAIGHT':
                    setStraightSec(time.current);

                    if (time.current == 100) {
                        fireNotification('바른 자세를 잘 유지하고 있네요!');
                    }
                    break;
                default:
            }
            console.log(time.current, status);
        }, 1000);

        return () => clearInterval(timer.current);
    }, [status])
}
export default PoseStatusHandler;