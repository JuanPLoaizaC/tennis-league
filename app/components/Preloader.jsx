// components/Preloader.js
import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const Preloader = ({ visible }) => {  
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        overlay
      />
    </div>
  );
};

export default Preloader;
