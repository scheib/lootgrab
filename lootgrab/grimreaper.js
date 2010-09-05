tdl.provide('grimreaper');
tdl.require('lootgrab.actor');

function GrimReaper(w, def) {
  Actor.call(this, w, def);
}
tdl.base.inherit(GrimReaper, Actor);

GrimReaper.prototype.update = function() {
  if (this.isDead()) return;
  
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
  
  // Stop trying to run into walls.
  var nextpos = this.position.add(this.heading.mul(0.5))
  if (this.world.isBlocking(nextpos.x, nextpos.y)) {
    this.heading = Vec2.CENTER;
  }
  
  Actor.prototype.update.call(this);
}

GrimReaper.prototype.onCollide = function(other) {
  other.kill();
}
