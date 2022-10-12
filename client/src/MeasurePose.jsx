import { useState, useEffect, useRef } from "react";
import WebCam from "react-webcam";
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

let camera;

function MeasuerPose({  }) {
    const webcamRef = useRef();
    const [hideCam, setHideCam] = useState(false);
    const [faceDetected, setFaceDetected] = useState(false);
    const [faceW, setFaceW] = useState(0);
    const [shoulderW, setShoulderW] = useState(0);

    const [straightRatio, setStraightRatio] = useState(0.42);
    const [maxStraightRange, setMaxStraightRange] = useState(0.08);

    const getDistance = (p1, p2) => {
        return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2);
    }

    const onResults = (results) => {
        console.log(results.poseLandmarks);
      if (results.poseLandmarks?.length) {
        setFaceDetected(true);
        const faceWidth = getDistance(results.poseLandmarks[7], results.poseLandmarks[8])
        const shoulderWidth = getDistance(results.poseLandmarks[11], results.poseLandmarks[12]);
        setFaceW(Math.round(faceWidth * 100));
        setShoulderW(Math.round(shoulderWidth * 100));
        console.log(shoulderWidth);
      } else {
        setFaceDetected(false);
        console.log('얼굴 감지되지 않음');
      }
    }

    useEffect(() => {
        const pose = new Pose({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
          },
        });
        
        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        
        pose.onResults(onResults);
        
        if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null
        ) {
          camera = new Camera(webcamRef.current.video, {
            onFrame: async () => {
              await pose.send({ image: webcamRef.current.video });
            },
            width: 1280,
            height: 720,
          });
          camera.start();
        }
    }, [webcamRef, webcamRef.current]);

    return (
      <div className="webcam-container"
        style={{marginTop: '30px'}}
      >
        <div className="show-webcam-toggle"
          onClick={()=>{setHideCam(!hideCam)}}
        >
        </div>
        <WebCam 
          autio={"false"}
          height={300}
          ref={webcamRef}
          draggable={true}
        />
        <h1>
        {
          !!((faceW / shoulderW) - straightRatio > maxStraightRange)
          ? "바르지 않은 자세입니다"
          : "바른 자세입니다"
        }
        </h1>

        <div className="">
          <h3>측정값</h3>
            <div>얼굴 너비 : { faceW }</div>
            <div>어깨 너비 : { shoulderW }</div>
            <div>얼굴/어깨 : { (faceW / shoulderW).toFixed(3) }</div>
            <div>기준값 - 측정값 : { ((faceW / shoulderW) - straightRatio).toFixed(3) }</div>
        </div>

        <div className="">
          <h3>설정값</h3>
          <div>바른 자세 기준값(얼굴/어깨) : { straightRatio.toFixed(3) }</div>
          <button
            onClick={()=>{setStraightRatio(faceW / shoulderW)}}
          >
            현재 값으로 기준값 재설정
          </button>
        <div>
          <label>바른 자세 최대 비율 차이 : </label>
          <input
            type="number"
            min="0"
            max="1"
            step="0.01"
            value={maxStraightRange}
            onChange={(e)=>{setMaxStraightRange(e.currentTarget.value)}}
          />
        </div>
        </div>
      </div>
    )
}
export default MeasuerPose;