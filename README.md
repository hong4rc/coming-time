# coming-time
[![codecov](https://codecov.io/gh/hong4rc/coming-time/branch/master/graph/badge.svg)](https://codecov.io/gh/hong4rc/coming-time)
[![GitHub CI](https://github.com/hong4rc/coming-time/workflows/GitHub%20CI/badge.svg)](https://github.com/hong4rc/coming-time/actions?query=workflow%3A%22GitHub+CI%22)
![Top language](https://img.shields.io/github/languages/top/hong4rc/coming-time)
[![npm package](https://img.shields.io/npm/v/coming-time)](https://www.npmjs.com/package/coming-time)

> Get coming time after input with hour, minutes, second

## Install

```
$ npm install coming-time
```

## Usage

```js
const comingTime = require('coming-time');

comingTime({ hour: 3, minutes: 3 }, 7)(new Date('Nov 13 2020 03:03:00 GMT+0700'))
//=> 2020-11-13T20:03:00.000Z
comingTime(new Date(), 7)(new Date('Nov 13 2020 03:03:00 GMT+0700'))
//=> 2020-11-13T15:20:54.000Z
comingTime('12:20:12', 7)(new Date('Nov 13 2020 03:03:00 GMT+0700'))
//=> 2020-11-13T05:20:12.000Z
```

## API

### comingTime(timeInfo, timezone?)(input?)

Return coming time after `input` with hour, minutes, seconds form timeInfo

#### timeInfo

Type: `String | Date | Object`

String format: 'hh:mm:ss' (mm and ss may be empty, example: `1`, `1:01`)
Date: valid date, we get only hour, minute and second
Object: `hour`, `minutes` and `seconds` key

#### timezone

Type: `Number`

time zone to get time

#### input

Type: `Date`

We get coming time after input
