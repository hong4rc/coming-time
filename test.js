import { nextHour, validInfo } from './src/utils';
import comingTime from './src';

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

describe('next-hour', () => {
  describe('Fixed timezone 7', () => {
    // 3h in timezone 7
    const expectTime = new Date('Nov 14 2020 03:00:00 GMT+0700');
    // 2020-11-13T20:00:00.000Z
    const expectTimeISO = expectTime.toISOString();

    it('3h in timezone 7', () => {
      expect(
        nextHour(3, 7)(new Date('Nov 14 2020 01:18:47 GMT+0700')).toISOString(),
      ).toBe(expectTimeISO);
    });
    it('next date for same time', () => {
      expect(
        nextHour(3, 7)(new Date('Nov 13 2020 03:00:00 GMT+0700')).toISOString(),
      ).toBe(expectTimeISO);
      expect(
        nextHour(3, 7)(expectTime) - expectTime,
      ).toBe(24 * 60 * 60 * 1000);
    });
    it('get next second', () => {
      expect(
        nextHour(3, 7)(new Date(expectTime - 1)).toISOString(),
      ).toBe(expectTimeISO);
    });
    it('random time', () => {
      for (let index = 0; index < 6; index += 1) {
        const rdDelta = random(1, 24 * 60 * 60 * 1000);
        expect(
          nextHour(3, 7)(new Date(expectTime - rdDelta)).toISOString(),
        ).toBe(expectTimeISO);
      }
    });
  });

  describe('Use current timezone', () => {
    it('next hour', () => {
      const hour = 4;
      const next = nextHour(hour)();
      expect(next.getHours()).toBe(hour);
      expect(+next).toBeGreaterThan(+Date.now());
    });
    it('next day', () => {
      const hour = 4;
      const next = nextHour(hour)();
      expect(nextHour(hour)(next) - next).toBe(24 * 60 * 60 * 1000);
    });
  });
});

describe('next-time', () => {
  describe('normal', () => {
    it('same hour, few minutes less', () => {
      expect(
        comingTime({ hour: 3, minutes: 3 }, 6.5)(new Date('Nov 13 2020 03:01:00 GMT+0630')).toISOString(),
      ).toBe(new Date('Nov 13 2020 03:03:00 GMT+0630').toISOString());
    });
    it('same hour, few minutes left over', () => {
      expect(
        comingTime({ hour: 3, minutes: 3 }, 7)(new Date('Nov 13 2020 03:04:00 GMT+0700')).toISOString(),
      ).toBe(new Date('Nov 14 2020 03:03:00 GMT+0700').toISOString());
    });
    it('match time', () => {
      expect(
        comingTime({ hour: 3, minutes: 3 }, 7)(new Date('Nov 13 2020 03:03:00 GMT+0700')).toISOString(),
      ).toBe(new Date('Nov 14 2020 03:03:00 GMT+0700').toISOString());
    });
    it('now', () => {
      comingTime({ hour: 4 })();
    });
  });
});

describe('valid-info', () => {
  describe('valid', () => {
    it('date', () => {
      const now = new Date();
      now.setHours(3);
      now.setMinutes(3);
      expect(validInfo(now)).toEqual({
        hour: 3,
        minutes: 3,
        seconds: expect.any(Number),
      });
    });
    it('h:m:s', () => {
      expect(validInfo('3:03:5')).toEqual({
        hour: 3,
        minutes: 3,
        seconds: 5,
      });
    });
    it('only h', () => {
      expect(validInfo('3')).toEqual({
        hour: 3,
        minutes: 0,
        seconds: 0,
      });
    });
  });

  describe('invalid', () => {
    it('empty string', () => {
      expect(() => validInfo('')).toThrow(new RangeError('length = 0'));
    });
    it('invalid type', () => {
      expect(() => validInfo(console)).toThrow(new RangeError('Do not support this type'));
    });
    describe('object', () => {
      it('hour: -1', () => {
        expect(() => validInfo({ hour: -1 })).toThrow(new RangeError('`hour` must be >= 0 and <= 23'));
      });
      it('minutes: -1', () => {
        expect(() => validInfo({ hour: 0, minutes: -1 })).toThrow(new RangeError('`minutes` must be >= 0 and <= 59'));
      });
      it('seconds: -1', () => {
        expect(() => validInfo({ hour: 0, minutes: 0, seconds: -1 })).toThrow(new RangeError('`seconds` must be >= 0 and <= 59'));
      });
    });
    describe('date', () => {
      it('invalid date', () => {
        expect(() => validInfo(new Date('invalid :)'))).toThrow(new RangeError('Invalid Date'));
      });
    });
  });
});
