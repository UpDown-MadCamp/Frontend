import React, { useEffect, useState } from 'react';
import './MainPage.css';

function MainPage() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start the animation when the component mounts
    setAnimate(true);
  }, []);

  return (
    <div className="main-page">
        <div className="content-column-main">
      <div className={`upload-text ${animate ? 'animate' : ''}`}>
        UpDown
      </div>

      <div className={`upload-sub-text ${animate ? 'animate-sub' : ''}`}>
        your files now
      </div>
      </div>
    </div>
  );
}

export default MainPage;