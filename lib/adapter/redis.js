'use strict';
const debug = require('debug')('debounce:redis');

module.exports = function(client, func, wait, getEventId) {
  function getDefaultEventId() {
    return '__debounce__' + (func.name || new Date().getTime());
  }

  if (!getEventId) {
    getEventId = getDefaultEventId;
  }

  return function debounced() {
    const args = arguments;
    const eventId = getEventId.apply(this, args)
    const channel = getSubscribeKey(eventId)
    client.set(eventId, 1, 'PX', wait, 'NX', function (err, msg) {
      if (err) {
        return func.apply(this, [err]);
      }

      if (msg !== 'OK') {
        return;
      }
      debug('subscribe: ', channel)
      client.subscribe(channel, function(err, msg) {
        if (err) {
          return func.apply(this, [err]);
        }
      });
      client.on('message', function (channel, msg) {
        debug('Receive message: %s from channel: %s', msg, channel);
        if (msg === 'expired') {
          func.apply(this, args);
          client.unsubscribe(channel);
        }
      });
    });

  }
};

function getSubscribeKey(id) {
  return '__keyspace@0__:' + id;
}
