module.exports.GapBuffer = GapBuffer;

var splice = Array.prototype.splice;

function GapBuffer(gapSize) {
  
  this.gapSize = parseInt(gapSize || 64);
  if (this.gapSize <= 0)
    throw new RangeError("gapSize must be > 0");
  
  this.buffer     = new Array(this.gapSize);
  this.gapStart   = 0;
  this.gapEnd     = this.gapSize;
  this.spliceArgs = new Array(this.gapSize + 2);

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
  if (ix < 0)
    throw new RangeError("insert index must be >= 0");
  if (ix > this.length)
    throw new RangeError("insert index must be <= length (for now)");
  
  if (this.gapStart === this.gapEnd) {
    
    this.spliceArgs[0] = ix;
    this.spliceArgs[1] = 0;
    
    splice.apply(this.buffer, this.spliceArgs);
    
    this.gapStart = ix;
    this.gapEnd = ix + this.gapSize;
    
  } else {
    
    moveGap(this, ix);
  
  }
  
  this.buffer[this.gapStart++] = value;
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
    
    var gapSize = (self.gapEnd - self.gapStart);
    var delta = self.gapStart - ix;
        
    for (var i = 0; i < delta; ++i) {
      self.buffer[self.gapEnd - delta + i] = self.buffer[ix + i];
    }
    
    self.gapStart -= delta;
    self.gapEnd -= delta;
  
  } else if (ix > self.gapStart) {
    
    var gapSize = (self.gapEnd - self.gapStart);
    var delta = ix - self.gapStart;
    
    for (var i = 0; i < delta; ++i) {
      self.buffer[self.gapStart + i] = self.buffer[self.gapEnd + i];
    }
    
    self.gapStart += delta;
    self.gapEnd += delta;
  
  }
}
