tdl.provide("math");

function Vec2(x,y) {
  this.x_ = x;
  this.y_ = y;

  this.__defineGetter__("x", function() { return this.x_; });
  this.__defineGetter__("y", function() { return this.y_; });
}

Vec2.fromJson = function(json) {
  return new Vec2(
      json.x_,
      json.y_);
}

Vec2.LEFT = new Vec2(-1,0);
Vec2.RIGHT = new Vec2(1,0);
Vec2.UP = new Vec2(0,-1);
Vec2.DOWN = new Vec2(0,1);
Vec2.CENTER = new Vec2(0,0);

Vec2.prototype.toString = function() {
  return "(" + this.x_.toString() + ", " + this.y_.toString() + ")";
}

Vec2.prototype.add = function(v) {
  var result = new Vec2(this.x_ + v.x_, this.y_ + v.y_);
  return result;
}

Vec2.prototype.sub = function(v) {
  var result = new Vec2(this.x_ - v.x_, this.y_ - v.y_);
  return result;
}

Vec2.prototype.negate = function(v) {
  var result = new Vec2(-this.x_, -this.y_);
  return result;
}

Vec2.prototype.dot = function(v) {
  var result = this.x_ * v.x_;
  result += this.y_ * v.y_;
  return result;
}

Vec2.prototype.mul = function(s) {
  var result = new Vec2(this.x_ * s, this.y_ * s);
  return result;
}

Vec2.prototype.len = function() {
  return Math.sqrt(this.dot(this));
}


