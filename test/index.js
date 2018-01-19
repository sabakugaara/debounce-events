const {expect} = require('chai');
const Debounce = require('../');

describe('index', function() {

  describe('Adapter#memory', function () {
    it('should use memory debounce success', function(done) {
      let a = 0;
      function update() {
        ++a;
      }
      const debounce = Debounce({
        wait: 50
      });
      const debounced = debounce(update);
      debounced();
      debounced();
      debounced();
      debounced();
      setTimeout(function() {
        expect(a).to.equal(1);
        done();
      }, 50);
    });
  });

  describe('Adapter#redis', function () {
    it('should use redis debounce success', function(done) {
      let a = 0;
      function update(err) {
        if (err) {
          return done(err);
        }
        ++a;
      }
      const debounce = Debounce({
        adapterOptions: {
          host: '127.0.0.1',
          port: 6379,
        },
        adapter: 'redis',
        wait: 50,
      });
      const debounced = debounce(update, 50, function () {
        return 'abc';
      });
      debounced();
      debounced();
      debounced();
      debounced();
      setTimeout(function() {
        expect(a).to.equal(1);
        done();
      }, 200);
    });

    it('should use redis debounce with specific event id success', function(done) {
      let a = 0;
      function update(err) {
        if (err) {
          return done(err);
        }
        ++a;
      }
      const debounce = Debounce({
        adapterOptions: {
          host: '127.0.0.1',
          port: 6379,
        },
        adapter: 'redis',
        wait: 50,
      });
      const debounced = debounce(update, );
      debounced();
      debounced();
      debounced();
      debounced();
      setTimeout(function() {
        expect(a).to.equal(1);
        done();
      }, 200);
    });
  });
});
