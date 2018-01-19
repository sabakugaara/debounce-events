'use strict';

const Redis = require('ioredis');

const memory = require('./lib/adapter/memory');
const redis = require('./lib/adapter/redis');
// const debounce = require('./lib/debounce');

const ADAPTER_MEMORY = 'memory';
const ADAPTER_REDIS = 'redis';

/**
 * @param {Object} options
 * adapter: ['memory', 'redis']
 */
module.exports = function create(options) {
  options = Object.assign({
    adapter: ADAPTER_MEMORY,
    wait: 200,
  }, options);
  const adapter = options.adapter;

  switch(adapter) {
    case ADAPTER_MEMORY:
      return function (func, wait) {
        wait = wait || options.wait;
        return memory(func, wait);
      }
    case ADAPTER_REDIS:
      const client = new Redis(options.adapterOptions);
      return function (func, wait, getEventId) {
        wait = wait || options.wait;
        return redis(client, func, wait, getEventId);
      }
    default:
      throw new Error('please select a adapter.');
  }
};
