# debounce-redis [![NPM version](https://badge.fury.io/js/debounce-redis.svg)](https://npmjs.org/package/debounce-redis) [![Build Status](https://travis-ci.org/sabakugaara/debounce-redis.svg?branch=master)](https://travis-ci.org/sabakugaara/debounce-redis)

> Global events debounce using redis

## Installation

```sh
$ npm install --save debounce-redis
```

## Usage

#### Example 1:

```js
var Debounce = require('debounce-redis');
var debounce = new Debounce({
  // connect redis options, will pass to ioredis directly, detail see https://github.com/luin/ioredis#connect-to-redis
  host: '127.0.0.1',
  port: 6379,
});

var debounced = debounce(function update() {
  // do something...
});
debounced();
debounced();
debounced();
debounced();  // only update once
```

#### Example 2:

```js
var Debounce = require('debounce-redis');
var debounce = new Debounce({
  host: '127.0.0.1',
  port: 6379,
});

var debounced = debounce(function update() {
  // do something...
}, function eventId(id) {
  return id; 
});

debounced(1); // event one 
debounced(1); // event one will only emit once
debounced(2); // event two
debounced(2); // event two while emit once too
```

## License

MIT © [Gaara]()
