tdl.provide('lootgrab.loot');
tdl.require('lootgrab.actor');

tdl.require('tdl.log');

function Loot(w, def) {
  this.loot = true;
  Actor.call(this, w, def);
};
tdl.base.inherit(Loot, Actor);

Loot.prototype.onCollide = function(other) {
  // FIXME: put in inventory
};

function Key(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(Key, Loot);

function Shield(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(Shield, Loot);

function Fire(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(Fire, Loot);

function Wand(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(Wand, Loot);

function Cross(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(Cross, Loot);

function Sword(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(Sword, Loot);

function Meat(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(Meat, Loot);

function Gold(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(Gold, Loot);
