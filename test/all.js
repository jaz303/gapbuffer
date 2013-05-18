var test = require('tape');
var GapBuffer = require('../').GapBuffer;

test('insert', function(assert) {
  
  var buffer = new GapBuffer(4);
  buffer.insert(0, 'a');
  buffer.insert(1, 'b');
  buffer.insert(2, 'c');
  buffer.insert(3, 'd');
  buffer.insert(4, 'e');
  buffer.insert(5, 'f');
  buffer.insert(6, 'g');
  buffer.insert(7, 'h');
  
  assert.ok(buffer.length === 8);
  assert.deepEqual(buffer.asArray(), ['a','b','c','d','e','f','g','h']);
  
  assert.end();

});