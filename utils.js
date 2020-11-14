const oneHour = 60 * 60 * 1000;
const hour2Min = 60;
const hourInDay = 24;

const nextHour = (hour, timezone = -new Date().getTimezoneOffset() / hour2Min) => {
  const deltaMin = timezone * hour2Min + new Date().getTimezoneOffset();
  return (now = Date.now()) => {
    const next = new Date(+now + oneHour - (now % oneHour));
    const hourInTimezone = (next.getHours() + deltaMin / hour2Min) % hourInDay;
    const deltaHour = (hour - hourInTimezone + hourInDay) % hourInDay;
    next.setMinutes(deltaHour * hour2Min + next.getMinutes());
    return next;
  };
};
const formatInfo = (info) => {
  if (info instanceof Date) {
    if (info.toString() === 'Invalid Date') {
      throw new RangeError('Invalid Date');
    }
    return {
      hour: info.getHours(),
      minutes: info.getMinutes(),
      seconds: info.getSeconds(),
    };
  }
  if (typeof info === 'string') {
    if (info === '') {
      throw new RangeError('length = 0');
    }
    const data = info.split(':').map((text) => Number.parseInt(text, 10));
    return {
      hour: data[0],
      minutes: data[1] || 0,
      seconds: data[2] || 0,
    };
  }
  if (Number.isInteger(info.hour)) {
    return {
      hour: info.hour,
      minutes: info.minutes || 0,
      seconds: info.seconds || 0,
    };
  }
  throw new TypeError('Do not support this type');
};

const validInfo = (info) => {
  const format = formatInfo(info);
  if (!(format.hour >= 0 && format.hour <= 23)) {
    throw new RangeError('`hour` must be >= 0 and <= 23');
  }
  if (!(format.minutes >= 0 && format.minutes <= 59)) {
    throw new RangeError('`minutes` must be >= 0 and <= 59');
  }
  if (!(format.seconds >= 0 && format.seconds <= 59)) {
    throw new RangeError('`seconds` must be >= 0 and <= 59');
  }
  return format;
};

module.exports = {
  nextHour,
  validInfo,
};
