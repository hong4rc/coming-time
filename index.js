const { nextHour, validInfo } = require('./utils');

const nextTime = (info, timezone) => {
  const time = validInfo(info);
  const functionNext = nextHour(time.hour, timezone);
  return (now = Date.now()) => {
    const next = functionNext(now);
    next.setMinutes(time.minutes);
    next.setSeconds(time.seconds);
    if (next - now > 24 * 60 * 60 * 1000) {
      next.setDate(next.getDate() - 1);
    }
    return next;
  };
};

module.exports = nextTime;
