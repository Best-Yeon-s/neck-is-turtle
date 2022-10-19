import { useRef } from 'react';
import warningImage from '../assets/images/warning.png';
import correctImage from '../assets/images/correct.png';
import stretchingImage from '../assets/images/stretching.png';

const usePushNotification = () => {
  const notificationRef = useRef(null);
  const turtleSound = new Audio(`${process.env.PUBLIC_URL}/audio/turtle_warning.m4a`);

  const alertTypeList = [
    { typeId: 'DEFAULT', image: turtleSound, sound: turtleSound },
    { typeId: 'WARNING', image: warningImage, sound: turtleSound },
    { typeId: 'CORRECT', image: correctImage, sound: turtleSound },
    { typeId: 'MISSION', image: stretchingImage, sound: turtleSound },
  ]

  // Notification이 지원되지 않는 브라우저가 있을 수 있기 때문에, 이를 대비해 Early return 문을 걸어줌
  if (!Notification) {
    return;
  }
  
  // 만약 이미 유저가 푸시 알림을 허용해놓지 않았다면,
  if (Notification.permission !== 'granted') {  	
    // Chrome - 유저에게 푸시 알림을 허용하겠냐고 물어보고, 허용하지 않으면 return
    try {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') return;  
      })
    } catch (error) {
      // Safari - 유저에게 푸시 알림을 허용하겠냐고 물어보고, 허용하지 않으면 return
      if (error instanceof TypeError) {
        Notification.requestPermission().then((permission) => {
          if (permission !== 'granted') return;
        }); 
      } else {
      	console.error(error)
      }
    }
  }
  
  // 유저가 푸시 알림을 클릭하면, 푸시 알림이 일어난 화면으로 이동하기
  const setNotificationClickEvent = () => {
    notificationRef.current.onclick = (event) => {
      event.preventDefault();
      window.focus();
      notificationRef.current.close();
    };
  };
  
  const fireNotification = (title, alertTypeId = 'DEFAULT', options = {}) => {
    let alertType = alertTypeList.find(el=>el.typeId===alertTypeId);

    const newOption = {
      badge: '',
      icon: alertType.image,
      ...options
    }
    alertType.sound.play();
    // notificationRef에 Notification을 넣어줌
    notificationRef.current = new Notification(title, newOption)

    // 위에서 만든 클릭 이벤트 걸어줌
    setNotificationClickEvent(); 
  }
  
  return { fireNotification }
}

export default usePushNotification;