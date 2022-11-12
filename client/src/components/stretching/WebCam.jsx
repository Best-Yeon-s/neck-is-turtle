import { useState, useEffect, useRef } from "react";
import WebCam from "react-webcam";
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

let camera;

function StretchingWebCam({ onResults }) {
    const webcamRef = useRef();
    // const [faceDetected, setFaceDetected] = useState(false);

    useEffect(()=>{console.log("webcamRef change")}, [webcamRef])
    useEffect(()=>{console.log("webcamRef current change")}, [webcamRef.current])
    useEffect(()=>{console.log("onResult change")}, [onResults])

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

        return () => {
          pose.close();
        }
    }, [webcamRef, webcamRef.current, onResults]);

    return (
      <WebCam 
        autio={"false"}
        ref={webcamRef}
        mirrored={true}
      />
    )
}
export default StretchingWebCam;