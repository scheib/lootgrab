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

var minTrapdoorDistance = 0.1;


Trapdoor.prototype.onCollide = function(other) {
  if (this.open) // one time trap, once open people avoid it.
    return;
  if (other.position.sub(this.position).len() < minTrapdoorDistance) {
    if (other.killable) {
      other.kill();
      this.open = true;
      this.sprite = this.world.newEntity(this.openSprite);
    }
  }
};

function Hole(w, def) {
  Trap.call(this, w, def);
}
tdl.base.inherit(Hole, Trap);

var minHoleDistance = 0.3;
Hole.prototype.onCollide = function(other) {
  if (other.position.sub(this.position).len() < minHoleDistance) {
    if (other.killable)
      other.kill();
  }
};
