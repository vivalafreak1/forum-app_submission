import React from 'react';
// import LoadingBar from 'react-redux-loading-bar';
import { Audio } from 'react-loader-spinner';

function Loading() {
  return (
    <div className="loading">
      <Audio
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible
      />
      {/* <LoadingBar /> */}
    </div>
  );
}

export default Loading;
