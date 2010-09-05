tdl.provide('skeleton');
tdl.require('lootgrab.actor');

function Skeleton(w, def) {
  this.world = w;
  Actor.call(this, w, def);
}
tdl.base.inherit(Skeleton, Actor);

Skeleton.prototype.onCollide = function(other) {
  if (this.world.hero == other) {
    other.kill();
  }
}
