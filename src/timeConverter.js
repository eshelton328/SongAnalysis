const timeConverter = (ms) => {
  let time = 'undefined';
  if (ms !== undefined) {
    const seconds = ms / 1000;

    let minutes = seconds / 60;

    minutes = JSON.stringify(minutes);
    const arr = minutes.split('.');

    if (arr[1] === undefined) {
      arr[1][0] = '0';
      arr[1][1] = '0';
    } else if (arr[1][1] === undefined) {
      arr[1][1] = '0';
    }

    time = arr[0].concat(':').concat(arr[1][0]).concat(arr[1][1]);
  }

  return time;
}

export default timeConverter;