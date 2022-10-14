import { useState, useEffect, useRef } from "react";
import WebCam from "react-webcam";
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import './MeasurePose.scss';

let camera;

function MeasuerPose({  }) {
    const webcamRef = useRef();
    const [hideCam, setHideCam] = useState(false);
    const [faceDetected, setFaceDetected] = useState(false);
    const [faceW, setFaceW] = useState(0);
    const [shoulderW, setShoulderW] = useState(0);
    const [neckDegree, setNeckDegree] = useState(0);

    const getDistance = (p1, p2) => {
        return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2);
    }

    const getMidPoint = (p1, p2) => {
      return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2, z: (p1.z + p2.z) / 2 };
    }

    const getDirectionVector = (p1, p2) => {
      return { x: p1.x - p2.x, y: p1.y - p2.y, z: p1.z - p2.z };
    }

    const onResults = (results) => {
      if (results.poseLandmarks?.length) {
        setFaceDetected(true);
        const faceWidth = getDistance(results.poseLandmarks[7], results.poseLandmarks[8]);
        const shoulderWidth = getDistance(results.poseLandmarks[11], results.poseLandmarks[12]);
        setFaceW(Math.round(faceWidth * 100));
        setShoulderW(Math.round(shoulderWidth * 100));
        // console.log(shoulderWidth);

        // let p = results.poseLandmarks[7];
        // console.log(Math.round(p.x*100), Math.round(p.y*100), Math.round(p.z*100));

        const faceMidPoint = getMidPoint(results.poseLandmarks[7], results.poseLandmarks[8]);
        const shoulderMidPoint = getMidPoint(results.poseLandmarks[11], results.poseLandmarks[12]);
        const neckDirectionVector = getDirectionVector(faceMidPoint, shoulderMidPoint);
        console.log(Math.asin(Math.abs(neckDirectionVector.z) / getDistance({x:0,y:0,z:0}, neckDirectionVector)) / Math.PI * 180);
        setNeckDegree(Math.asin(Math.abs(neckDirectionVector.z) / getDistance({x:0,y:0,z:0}, neckDirectionVector)) / Math.PI * 180);
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
        <WebCam 
          autio={"false"}
          ref={webcamRef}
          draggable={true}
        />
        {
          faceDetected
          ? <>
        <h1>
        {/* {
          !!((faceW / shoulderW) - straightRatio > maxStraightRange)
          ? "바르지 않은 자세입니다"
          : "바른 자세입니다"
        } */}
        {
          !!(neckDegree > 28)
          ? "바르지 않은 자세입니다"
          : "바른 자세입니다"
        }
        </h1>
          </>
          : <h1>얼굴이 감지되지 않았습니다</h1>
        }
      </div>
    )
}
export default MeasuerPose;