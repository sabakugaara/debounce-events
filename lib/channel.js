'use strict';

const Redis = require('ioredis');
const MemoryQueue = require('./adapter/memory');
const RedisQueue = require('./adapter/redis');

const ADAPTER_MEMORY = 'memory';
const ADAPTER_REDIS = 'redis';

function Channel(listener, options) {
  options = Object.assign({
    adapter: ADAPTER_MEMORY,
    wait: 200,
  }, options || {});
  const adapter = options.adapter;

  switch(adapter) {
    case ADAPTER_MEMORY:
      this.queue = new MemoryQueue(options.wait);
      break;
    case ADAPTER_REDIS:
      const client = new Redis(options.adapterOptions);
      this.queue = new RedisQueue(client, options.wait);
      break;
    default:
      this.queue = new MemoryQueue(options.wait);
  }
  this.queue.subscribe(listener);
  this.errorListener = function() {};
}

Channel.prototype.emit = function(eventId) {
  this.queue.push(eventId);
}

// TODO
Channel.prototype.onError = function(callback) {
  this.errorListener = callback;
}

module.exports = Channel;
module.exports.ADAPTER_MEMORY = ADAPTER_MEMORY;
module.exports.ADAPTER_REDIS = ADAPTER_REDIS;
