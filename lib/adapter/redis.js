'use strict';
const debug = require('debug')('debounce:redis');

const prefix = '__DE__';

function RedisQueue (client, wait) {
  this.wait = wait;
  this.channels = {};
  this.listener = function() {};
  this.client = client;

  this.client.on('message', this.onMessage.bind(this));
}

RedisQueue.prototype.onMessage = function(channel, msg) {
  debug('Receive message: %s from channel: %s', msg, channel);
  if (msg === 'expired') {
    const eventId = this.channels[channel];
    if (eventId) {
      try {
        debug('emit event: ', eventId);
        this.listener(eventId);
      } catch (err) {
        // TODO
        console.error(err)
      }
      this.client.unsubscribe(channel);
    }
  }
};

RedisQueue.prototype.push = function(eventId) {
  const client = this.client;
  const key = prefix + eventId;
  const self = this;
  client.set(key, 1, 'PX', this.wait, 'NX', function (err, msg) {
    if (err) {
      // TODO error
      console.error(err);
      return;
    }

    if (msg !== 'OK') {
      return;
    }
    const channel = getSubscribeKey(key);
    debug('add new event: ', eventId);
    client.subscribe(channel, function(err, msg) {
      if (err) {
        // TODO error
        console.error(err);
      }
      self.channels[channel] = eventId;
    });
  });
}

RedisQueue.prototype.subscribe = function (listener) {
  this.listener = listener;
};

module.exports = RedisQueue;

function getSubscribeKey(id) {
  return '__keyspace@0__:' + id;
}
