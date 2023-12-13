import React from 'react';

const DisplayTime = ({ creationTime, oneLine }) => {
  const parsedDate = new Date(creationTime);

  // Format the date as a string
  const formattedDate = parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format the time as a string
  const formattedTime = parsedDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  });

  const paragraphStyle = {
    margin: 0,
    padding: 0,
  };
  if(oneLine){
    return (<p style={paragraphStyle}>{`${formattedTime}           ${formattedDate}`}</p>);
  }
  else{
    return (
      <div>
        <p style={paragraphStyle}>{formattedDate}</p>
        <p style={paragraphStyle}>{formattedTime}</p>
      </div>
    );
  }

};

export default DisplayTime;