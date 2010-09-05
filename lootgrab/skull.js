tdl.provide('lootgrab.skull');
tdl.require('lootgrab.actor');

tdl.require('tdl.log');

function FSkull(w, def) {
  Actor.call(this, w, def);
};
tdl.base.inherit(FSkull, Actor);

FSkull.prototype.update = function(world, tick, elapsed) {
  if (this.isDead()) return;
  if (this.tempSpeedTicksLeft > 0) this.tempSpeedTicksLeft--;

  var nextpos = this.position.add(this.heading.mul(0.5))
  if (this.world.isBlocking(nextpos.x, nextpos.y, this)) {
    // Roomba!
    this.heading = new Vec2(-this.heading.y, this.heading.x)
  }
  this.updatePosition();
}

FSkull.prototype.onCollide = function(other) {
  if (this.world.hero == other)
    other.kill();
}
