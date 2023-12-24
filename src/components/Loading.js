import React from 'react';
import '../css/loading.css'; // Make sure to create a Loading.css file for the styles

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
