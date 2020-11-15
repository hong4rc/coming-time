import {
  nextHour, validInfo,
  oneHour, hourInDay,
} from './utils';

const comingTime = (info, timezone) => {
  const time = validInfo(info);
  const functionNext = nextHour(time.hour, timezone);
  return (now = Date.now()) => {
    const next = functionNext(now);
    next.setMinutes(next.getMinutes() + time.minutes);
    next.setSeconds(time.seconds);
    if (next - now > hourInDay * oneHour) {
      next.setDate(next.getDate() - 1);
    }
    return next;
  };
};

export default comingTime;
