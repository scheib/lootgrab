tdl.provide('skeleton');
tdl.require('lootgrab.actor');

function Skeleton(w, def) {
  Actor.call(this, w, def);
}
tdl.base.inherit(Skeleton, Actor);

Skeleton.prototype.update = function() {
  // Dumb routing. Need to deal with walls.
  var dir = this.world.hero.position.sub(this.position);
  var horizontal = (Math.abs(dir.y) - Math.abs(dir.x) < 0);

  if (dir.x < 0 && horizontal) {
    this.heading = Vec2.LEFT;
  } else if (dir.x > 0 && horizontal) {
    this.heading = Vec2.RIGHT;
  } else if (dir.y > 0) {
    this.heading = Vec2.DOWN;
  } else {
    this.heading = Vec2.UP;
  }
  
  Actor.prototype.update.call(this);
}

Skeleton.prototype.onCollide = function(other) {
  other.isAlive = false;
}
