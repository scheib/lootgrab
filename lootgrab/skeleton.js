tdl.provide('skeleton');
tdl.require('lootgrab.actor');
tdl.require('lootgrab.audio');

function Skeleton(w, def) {
  this.world = w;
  Actor.call(this, w, def);
}
tdl.base.inherit(Skeleton, Actor);

Skeleton.prototype.onCollide = function(other) {
  if (this.world.hero == other) {
    if (other.hasItem("sword")) {
      lootgrab.audio.play_sound("kill");
      this.kill();
    } else {
      other.kill();
    }
  }
}
