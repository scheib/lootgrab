tdl.provide('lootgrab.trap');
tdl.require('lootgrab.actor');

tdl.require('tdl.log');

function Trap(w, def) {
  Actor.call(this, w, def);
};
tdl.base.inherit(Trap, Actor);

Loot.prototype.onCollide = function(other) {
  
};

function Trapdoor(w, def) {
  Trap.call(this, w, def);
};
tdl.base.inherit(Trapdoor, Trap);
