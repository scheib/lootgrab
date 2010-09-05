tdl.provide('skeleton');
tdl.require('lootgrab.actor');

function Skeleton(w, def) {
  Actor.call(this, w, def);
  this.heading = Vec2.UP;
}
tdl.base.inherit(Skeleton, Actor);

Skeleton.prototype.onCollide = function(other) {
  other.isAlive = false;
}

