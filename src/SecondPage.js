import React, { useRef, useEffect } from 'react';
import './SecondPage.css';
import exampleImage from './logo.svg'; // Make sure you have an image in your project
import updownGif from './updown.gif';

const SecondPage = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleVideoEnd = () => {
      videoElement.play();
    };

    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  return (
    <div className="second-page">
      <h1>로그인 없이도 파일 공유 가능 ~ </h1>
      <div style={{ textAlign: 'center' }}>
      <img src={updownGif} alt="GIF" style={{ maxWidth: '80%', height: 'auto', margin: "10px"}} />
    </div>
    </div>
  );
};

export default SecondPage;
