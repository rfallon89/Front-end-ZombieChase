export const timerFormat = (sec) => {
  const timeDemon = [3600, 60];
  let timeFormat = [];
  timeDemon.forEach((demonination) => {
    if (sec / demonination >= 1) {
      let result = Math.floor(sec / demonination);
      sec = sec % demonination;
      if (result > 0) {
        if (result < 10) {
          timeFormat.push(`0${result}`);
        } else {
          timeFormat.push(`${result}`);
        }
      }
    } else {
      timeFormat.push("00");
    }
  });
  sec >= 10 ? timeFormat.push(`${sec}`) : timeFormat.push(`0${sec}`);

  return `${timeFormat[0]}:${timeFormat[1]}:${timeFormat[2]}`;
};
