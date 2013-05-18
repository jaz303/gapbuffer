var GapBuffer = require('./').GapBuffer;

function random(max) {
  return Math.floor(Math.random() * max);
}

exports.compare = {
  "array": function() {
    var array = [];
    for (var i = 0; i < 500; i++) {
      var ix = random(array.length);
      for (var j = 0; j < 100; ++j) {
        array.splice(ix + j, 0, true);
      }
    }
  },
  "gap buffer": function() {
    var buffer = new GapBuffer;
    for (var i = 0; i < 500; i++) {
      var ix = random(buffer.length);
      for (var j = 0; j < 100; ++j) {
        buffer.insert(ix + j, true);
      }
    }
  }
};

exports.compareCount = 1;

require('bench').runMain();