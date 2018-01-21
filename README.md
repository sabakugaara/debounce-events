# debounce-redis [![NPM version](https://badge.fury.io/js/debounce-redis.svg)](https://npmjs.org/package/debounce-redis) [![Build Status](https://travis-ci.org/sabakugaara/debounce-redis.svg?branch=master)](https://travis-ci.org/sabakugaara/debounce-redis)

> Global events debounce using redis

## Installation

```sh
$ npm install --save debounce-redis
```

## Usage

#### Example 1:

```js
var Channel = require('debounce-redis');
var ch = new Channel(function update() {
  // do something...
});
ch.emit('update');
ch.emit('update');
ch.emit('update');
ch.emit('update'); // only update once
```

#### Example 2:

```js
var Redis = require('ioredis');
var Channel = require('debounce-redis');
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
