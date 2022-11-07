import { useRef, useState, useEffect, useMemo } from "react";
import { getDegree, getDirectionVector, getMidPoint } from "../../utils/Vector";
import WebCam from "./WebCam";
import step1 from "../../assets/images/neck-stretching-step1.png";
import './index.scss';

function Stretching() {
    const [correctPose, setCorrectPose] = useState(false); // 올바른 스트레칭 자세인지 표시
    const [step, setStep] = useState(0); // 스트레칭 단계 표시
    const timer = useRef();
    const time = useRef(0);
    const [sec, setSec] = useState(0);

    const stretchingSteps = [
        {
            img: step1, 
            action: 
            function(results) {      
                if (results.poseLandmarks?.length) {
                    const shoulderMid = getMidPoint(results.poseLandmarks[11], results.poseLandmarks[12]);
                    const neckDirectionVector = getDirectionVector(shoulderMid, results.poseLandmarks[0]);
                    const neckRotateDegree = getDegree(neckDirectionVector, { x: 0, y: 1, z: 0 });

                    // 목이 25도 이상 오른쪽으로 기울어져 있다면
                    setCorrectPose(neckRotateDegree > 25 && neckDirectionVector.x > 0);
                }
            }, 
            text: '머리에 손을 얹은 후 오른쪽으로 천천히 당겨주세요',
            duration: 5,
        },
        {
            img: step1, 
            action: 
            function(results) {      
                if (results.poseLandmarks?.length) {
                    const shoulderMid = getMidPoint(results.poseLandmarks[11], results.poseLandmarks[12]);
                    const neckDirectionVector = getDirectionVector(shoulderMid, results.poseLandmarks[0]);
                    const neckRotateDegree = getDegree(neckDirectionVector, { x: 0, y: 1, z: 0 });

                    // 목이 25도 이상 오른쪽으로 기울어져 있다면
                    setCorrectPose(neckRotateDegree > 25 && neckDirectionVector.x < 0);
                }
            }, 
            text: '머리에 손을 얹은 후 왼쪽으로 천천히 당겨주세요', 
            duration: 100,
        },
    ]

    const [completeList, setCompleteList] = useState(new Array(stretchingSteps.length, false));

    const currAction = useMemo(()=>{
        return stretchingSteps[step].action;
    }, [step])
    const currText = useMemo(()=>{
        return stretchingSteps[step].text;
    }, [step])
    const currImg = useMemo(()=>{
        return stretchingSteps[step].img;
    }, [step])
    const currDutation = useMemo(()=>{
        return stretchingSteps[step].duration;
    }, [step])

    useEffect(()=>{
        timer.current = setInterval(()=>{
            console.log(correctPose);
            if (correctPose) {
                if (time.current < currDutation) {
                    time.current += 1;
                    setSec(parseInt(time.current));
                } else {
                    setStep(step + 1);
                    time.current = 0;
                    setSec(0);
                }
            } else {
                time.current = 0;
                setSec(0);
            }
        }, 1000);

        return ()=>{
            clearInterval(timer.current);
        }
    }, [correctPose, currDutation])

    return (
        <div className="stretching">
            <div className="stretching-steps-wrapper">
            {
                stretchingSteps.map((stretching, idx)=>(
                    <div 
                        className="stretching-step"
                        onClick={()=>{setStep(idx)}}
                    >
                        <img src={stretching.img}/>
                    </div>
                ))
            }
            </div>
            <div className="webcam-container">
                <img src={stretchingSteps[step]?.img}/>
                <WebCam onResults={currAction}/>
                <h1>{ sec }</h1>
                <h1>{ stretchingSteps[step]?.text }</h1>
            </div>
        </div>
    )
}
export default Stretching;