# debounce-events [![NPM version](https://badge.fury.io/js/debounce-events.svg)](https://npmjs.org/package/debounce-events) [![Build Status](https://travis-ci.org/sabakugaara/debounce-events.svg?branch=master)](https://travis-ci.org/sabakugaara/debounce-events)

> Global events debounce using redis

## Installation

```sh
$ npm install --save debounce-events
```

## Usage

#### Example 1:

```js
var Channel = require('debounce-events');
var ch = new Channel(function update() {
  // do something...
});
ch.emit('update');
ch.emit('update');
ch.emit('update');
ch.emit('update'); // only update once
```

#### Example 2:

**Notice: ** need redis key space notification enable `Ex` option

```js
var Redis = require('ioredis');
var Channel = require('debounce-events');
var ch = new Channel(function update() {
  // do something
}, {
  wait: 50,
  adapter: Channel.ADAPTER_REDIS,
  redisClient: new Redis()
});

ch.emit('update1'); // emit update1 
ch.emit('update1'); // same event will only emit once
ch.emit('update2'); // emit other event: update2
```

## License

MIT © [Gaara]()
