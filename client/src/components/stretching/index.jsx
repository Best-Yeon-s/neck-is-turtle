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

                    // 목이 25도 이상 오른쪽으로 기울어져 있다면
                    if (neckRotateDegree > 25 && neckDirectionVector.x > 0) {
                        setCorrectPose(true);
                        setAlertText(`잘하고 있어요! 그대로 ${this.duration}초간 유지해볼게요`);
                    } else {
                        if (neckDirectionVector.x <= 0) { setAlertText('머리를 오른쪽으로 기울여주세요'); }
                        else if (neckRotateDegree <= 15) { setAlertText('머리를 좀 더 당겨주세요'); }
                    }
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
                    setCorrectPose(neckRotateDegree > 15 && neckDirectionVector.x < 0);
                }
            }, 
            text: '머리에 손을 얹은 후 왼쪽으로 천천히 당겨주세요', 
            duration: 100,
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
            console.log(correctPose);
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
                            <div className="stretching-step-complete"/>
                        }
                    </div>
                ))
            }
            </div>
            <div className="stretching-webcam-container">
                <div className="stretching-webcam-wrapper">
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
                        <img src={stretchingSteps[step]?.img}/>
                        { correctPose && <div className="second">{ sec }</div> }
                        <div className="curr-stretching-description">{ stretchingSteps[step]?.text }</div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Stretching;