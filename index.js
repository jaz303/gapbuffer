module.exports.GapBuffer = GapBuffer;

function GapBuffer(gapSize) {
  this.gapSize  = gapSize || 64;
  this.buffer   = new Array(this.gapSize);
  this.gapStart = 0;
  this.gapEnd   = this.gapSize;
}

Object.defineProperty(GapBuffer.prototype, 'length', {
  enumerable: true,
  get: function() {
    return this.gapStart + (this.buffer.length - this.gapEnd);
  },
});

GapBuffer.prototype.get = function(ix) {
  if (ix >= this.length)
    return undefined;
  if (ix >= this.gapStart)
    ix += (this.gapEnd - this.gapStart);
  return this.buffer[ix];
}

GapBuffer.prototype.insert = function(ix, value) {
  if (this.gapStart === this.gapEnd) {
    var newBufferSize = this.buffer.length + this
  } else {
    moveGap(this, ix);
  }
  this.buffer[this.gapStart++] = ix;
}

GapBuffer.prototype.deleteBefore = function(ix, len) {
  if (ix === 0 || ix > this.length) return;
  moveGap(this, ix);
  this.gapStart -= len;
  if (this.gapStart < 0)
    this.gapStart = 0;
}

GapBuffer.prototype.clear = function() {
  this.gapStart = 0;
  this.gapEnd = this.buffer.size;
}

GapBuffer.prototype.asArray = function() {
  return this.buffer.slice(0, this.gapStart).concat(this.buffer.slice(this.gapEnd));
}

function moveGap(self, ix) {
  if (ix < self.gapStart) {
    var remainBefore = (self.gapEnd - self.gapStart);
    var delta = self.gapStart - ix;
    
    self.gapStart -= delta;
    self.gapEnd -= delta;
  } else if (ix > self.gapStart) {
    var remainBefore = (self.gapEnd - self.gapStart);
    var delta = ix - self.gapStart;
    
    self.gapStart += delta;
    self.gapEnd += delta;
  }
}

var buffer = new GapBuffer;
console.log(buffer.asArray());