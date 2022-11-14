import { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getDegree, getDirectionVector, getMidPoint } from "../../utils/Vector";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import MissionApi from "../../apis/MissionApi";
import WebCam from "./WebCam";
import step1 from "../../assets/images/neck_stretching_1.jpeg";
import step2 from "../../assets/images/neck_stretching_2.png";
import step3 from "../../assets/images/neck_stretching_3.png";
import './index.scss';

function Stretching() {
    const navigation = useNavigate();
    const missionApi = new MissionApi();
    const [correctPose, setCorrectPose] = useState(false); // 올바른 스트레칭 자세인지 표시
    const [step, setStep] = useState(0); // 스트레칭 단계 표시
    const timer = useRef();
    const time = useRef(0);
    const [sec, setSec] = useState(0);
    const [alertText, setAlertText] = useState('');

    const stretchingSteps = [
        {
            img: step1, 
            action: 
            function(results) {      
                if (results.poseLandmarks?.length) {
                    const shoulderMid = getMidPoint(results.poseLandmarks[11], results.poseLandmarks[12]);
                    const neckDirectionVector = getDirectionVector(shoulderMid, results.poseLandmarks[0]);
                    const neckRotateDegree = getDegree(neckDirectionVector, { x: 0, y: 1, z: 0 });

                    // 목이 10도 이상 오른쪽으로 기울어져 있다면
                    if (neckRotateDegree > 10 && neckDirectionVector.x > 0) {
                        setCorrectPose(true);
                        setAlertText(`잘하고 있어요! 그대로 5초간 유지해볼게요`);
                        console.log("오른쪽 잘하고있음")
                    } else {
                        setCorrectPose(false);
                        if (neckDirectionVector.x <= 0) { setAlertText('머리를 오른쪽으로 기울여주세요'); }
                        else if (neckRotateDegree <= 10) { setAlertText('머리를 좀 더 당겨주세요'); }
                    }
                }
            }, 
            text: '머리에 손을 얹은 후 오른쪽으로 천천히 당겨주세요',
            duration: 5,
        },
        {
            img: step2, 
            action: 
            function(results) {      
                if (results.poseLandmarks?.length) {
                    const shoulderMid = getMidPoint(results.poseLandmarks[11], results.poseLandmarks[12]);
                    const neckDirectionVector = getDirectionVector(shoulderMid, results.poseLandmarks[0]);
                    const neckRotateDegree = getDegree(neckDirectionVector, { x: 0, y: 1, z: 0 });

                    // 목이 10도 이상 왼쪽으로 기울어져 있다면
                    if (neckRotateDegree > 10 && neckDirectionVector.x < 0) {
                        setCorrectPose(true);
                        setAlertText(`잘하고 있어요! 그대로 5초간 유지해볼게요`);
                    } else {
                        setCorrectPose(false);
                        if (neckDirectionVector.x >= 0) { setAlertText('머리를 왼쪽으로 기울여주세요'); }
                        else if (neckRotateDegree <= 10) { setAlertText('머리를 좀 더 당겨주세요'); }
                    }
                }
            }, 
            text: '머리에 손을 얹은 후 왼쪽으로 천천히 당겨주세요', 
            duration: 5,
        },
        {
            img: step3, 
            action: 
            function(results) {      
                if (results.poseLandmarks?.length) {
                    console.log(results.poseLandmarks[11].y , results.poseLandmarks[13].y )
                    const raiseRightArm = results.poseLandmarks[12].y > results.poseLandmarks[14].y;
                    const raiseLeftArm = results.poseLandmarks[11].y > results.poseLandmarks[13].y;

                    // 양 팔을 모두 들었다면
                    if (raiseLeftArm && raiseRightArm) {
                        setCorrectPose(true);
                        setAlertText(`잘하고 있어요! 그대로 5초간 유지해볼게요`);
                    } else {
                        setCorrectPose(false);
                        setAlertText('깍지 낀 손을 높게 들어주세요');
                    }
                }
            }, 
            text: '손에 깍지를 끼고 기지개를 펴듯 올려볼게요', 
            duration: 5,
        },
    ]

    const [completeList, setCompleteList] = useState(new Array(stretchingSteps.length));

    const completeStretching = (_step) => {
        let tempCompleteList = [...completeList];
        tempCompleteList[_step] = true;
        setCompleteList(tempCompleteList);
        setAlertText(null);

        if (_step < stretchingSteps.length - 1) {
            setStep(_step + 1);
        } else {
            missionApi.completeMission(4);
            navigation('/');
        }
    }

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
            if (correctPose) {
                if (time.current < currDutation) {
                    time.current += 1;
                    setSec(parseInt(time.current));
                } else {
                    completeStretching(step);
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
                        style={{backgroundImage: `url(${stretching.img})`}}
                        id={step===idx ? 'current-stretching' : null}
                    >
                        <div className="stretching-step-num">{ idx + 1 }</div>
                        {
                            !!(completeList[idx]) &&
                            <div className="stretching-step-complete">
                                <BsFillCheckCircleFill/>
                            </div>
                        }
                    </div>
                ))
            }
            </div>
            <div className="stretching-webcam-container">
                <div className="stretching-webcam-wrapper">
                    <div className="stretching-webcam">
                        <WebCam onResults={currAction}/>
                    </div>
                    <div className="curr-stretching-info-wrapper">
                        {
                            alertText &&
                            <div className="stretching-alert-text" id={correctPose ? 'correct' : 'incorrect'}>
                                { alertText }
                            </div>
                        }
                        <div className="curr-stretching-info">
                            <img src={ currImg }/>
                            { correctPose && <div className="second">{ sec }</div> }
                            <div className="curr-stretching-description">{ currText }</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Stretching;