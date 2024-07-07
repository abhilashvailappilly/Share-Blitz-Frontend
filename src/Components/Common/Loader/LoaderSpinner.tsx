import React from 'react';
import './LoaderSpinner.css';  

const LoaderSpinner: React.FC = () => {
  return (
    <div className="spinner ">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
}

export default LoaderSpinner;
