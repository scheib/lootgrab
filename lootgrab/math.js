tdl.provide("math");

function Vec2() {
  this.x = 0.0;
  this.y = 0.0;
}

function Vec2(x,y) {
  this.x = x;
  this.y = y;
}

Vec2.prototype.toString = function() {
  return "(" + this.x.toString() + ", " + this.y.toString() + ")";
}

Vec2.prototype.add = function(v) {
  var result = new Vec2(this.x + v.x, this.y + v.y);
  return result;
}

Vec2.prototype.sub = function(v) {
  var result = new Vec2(this.x - v.x, this.y - v.y);
  return result;
}

Vec2.prototype.negate = function(v) {
  var result = new Vec2(-this.x, -this.y);
  return result;
}

Vec2.prototype.dot = function(v) {
  var result = this.x * v.x;
  result += this.y * v.y;
  return result;
}

Vec2.prototype.mul = function(s) {
  var result = new Vec2(this.x * s, this.y *s);
  return result;
}

Vec2.prototype.len = function() {
  return Math.sqrt(this.dot(this));
}


Vec2.LEFT = new Vec2(-1,0);
Vec2.RIGHT = new Vec2(1,0);
Vec2.UP = new Vec2(0,-1);
Vec2.DOWN = new Vec2(0,1);
Vec2.CENTER = new Vec2(0,0);