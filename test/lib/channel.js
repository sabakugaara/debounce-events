'use strict';

const expect = require('chai').expect;
const Channel = require('../../lib/channel');
const Redis = require('ioredis');

describe('#Channel', function () {
  it('should use default memory queue success', function(done) {
    let a = 0;
    function update() {
      ++a;
    }

    const ch = new Channel(update, {
      wait: 1,
    });
    // same event only emit once at the same time
    ch.emit('update1');
    ch.emit('update1');
    ch.emit('update1');
    ch.emit('update2');
    ch.emit('update2');
    setTimeout(function() {
      try {
        expect(a).to.equal(2);
        done();
      } catch (err) {
        return done(err);
      }
    }, 2);
  });

  it('should use redis queue success', function(done) {
    let a = 0;
    function update() {
      ++a;
    }

    const ch = new Channel(update, {
      wait: 50,
      adapter: Channel.ADAPTER_REDIS,
      redisClient: new Redis()
    });
    ch.emit('update1');
    ch.emit('update1');
    ch.emit('update1');
    ch.emit('update2');
    ch.emit('update2');
    setTimeout(function() {
      try {
        expect(a).to.equal(2);
        done();
      } catch (err) {
        return done(err);
      }
    }, 200);
  });
});

