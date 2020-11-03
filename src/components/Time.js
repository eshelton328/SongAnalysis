import React from 'react';

const Time = ({ ms }) => {
  let time = 'undefined'
  if (ms !== undefined) {
    const seconds = ms / 1000;

    let minutes = seconds / 60;
    minutes = JSON.stringify(minutes);
    const arr = minutes.split('.');

    time = arr[0].concat(':').concat(arr[1][0]).concat(arr[1][1]);
  }

  return (
    <span>{time}</span>
  );
};

export default Time;