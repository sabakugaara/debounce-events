'use strict';
const debug = require('debug')('debounce:memory');

function MemoryQueue(wait) {
  this.wait = wait;
  this.events = {};
  this.listener = function() {};
};

MemoryQueue.prototype.push = function (eventId) {
  if (typeof this.events[eventId] !== 'undefined') {
    return;
  }

  const func = this.listener;

  debug('add new event: ', eventId);
  this.events[eventId] = setTimeout(function() {
    debug('emit event: ', eventId);
    func.apply(this);
  }, this.wait);
};

MemoryQueue.prototype.subscribe = function (listener) {
  this.listener = listener;
};

module.exports = MemoryQueue;
