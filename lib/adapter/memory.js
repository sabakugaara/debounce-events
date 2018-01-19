'use strict';

module.exports = function(func, wait) {
  let timeout = null;

  return function debounced() {
    const args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function () {
      timeout = null;
      func.apply(this, args);
    }, wait);
  }
};
