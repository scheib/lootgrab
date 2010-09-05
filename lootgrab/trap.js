tdl.provide('lootgrab.trap');
tdl.require('lootgrab.actor');

tdl.require('tdl.log');

function Trap(w, def) {
  Actor.call(this, w, def);
};
tdl.base.inherit(Trap, Actor);

function Trapdoor(w, def) {
  Trap.call(this, w, def);
  this.open = false;
  this.openSprite = def.openSprite;
};
tdl.base.inherit(Trapdoor, Trap);

var minTrapDistance = 0.1;

Trapdoor.prototype.onCollide = function(other) {
  if (other.position.sub(this.position).len() < minTrapDistance) {
    this.open = true;
    this.sprite = this.world.newEntity(this.openSprite);
    if (other.killable)
      other.kill();
  }
};
