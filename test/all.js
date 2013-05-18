var test = require('tape');
var GapBuffer = require('../').GapBuffer;

test('initial .length', function(assert) {
  var buffer = new GapBuffer;
  assert.ok(buffer.length === 0);
  assert.end();
});

test('initial asArray()', function(assert) {
  var buffer = new GapBuffer;
  assert.deepEqual([], buffer.asArray());
  assert.end();
});

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
  
  assert.ok(buffer.get(0) === 'a')
  assert.ok(buffer.get(1) === 'b')
  assert.ok(buffer.get(2) === 'c')
  assert.ok(buffer.get(3) === 'd')
  assert.ok(buffer.get(4) === 'e')
  assert.ok(buffer.get(5) === 'f')
  assert.ok(buffer.get(6) === 'g')
  assert.ok(buffer.get(7) === 'h')
  
  
  assert.deepEqual(buffer.asArray(), ['a','b','c','d','e','f','g','h']);
  
  assert.end();

});

test('insert before', function(assert) {
  
  var buffer = new GapBuffer(3);
  buffer.insert(0, 1);
  buffer.insert(0, 2);
  buffer.insert(0, 3);
  buffer.insert(0, 4);
  buffer.insert(0, 5);
  buffer.insert(0, 6);
  
  assert.deepEqual(buffer.asArray(), [6,5,4,3,2,1]);
  assert.end();
  
});

test('insert random', function(assert) {
  
  var buffer = new GapBuffer(3);
  
  buffer.insert(0, 1);
  buffer.insert(0, 2);
  buffer.insert(0, 3);
  buffer.insert(2, 4);
  buffer.insert(3, 5);
  buffer.insert(4, 6);
  buffer.insert(5, 7);
  buffer.insert(0, 8);
  buffer.insert(1, 9);
  buffer.insert(2, 10);
  buffer.insert(10, 11);
  buffer.insert(11, 12);
  buffer.insert(12, 13);
  buffer.insert(13, 14);
  
  assert.ok(buffer.length === 14);
  assert.deepEqual(buffer.asArray(), [8, 9, 10, 3, 2, 4, 5, 6, 7, 1, 11, 12, 13, 14]);
  assert.end();
  
});