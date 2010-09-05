tdl.provide('lootgrab.loot');
tdl.require('lootgrab.actor');

tdl.require('tdl.log');

function Loot(w, def) {
  this.loot = true;
  Actor.call(this, w, def);
};
tdl.base.inherit(Loot, Actor);

Loot.prototype.onCollide = function(other) {
  // get "picked up"
  if (other == this.world.hero) {
    this.loot = false;
    this.kill();
  }
};

function Key(w, def) {
  Loot.call(this, w, def);
  this.key = true;
};
tdl.base.inherit(Key, Loot);

function Shield(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(Shield, Loot);

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
  this.sword = true;
};
tdl.base.inherit(Sword, Loot);

function Meat(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(Meat, Loot);
Meat.prototype.onCollide = function(other) {
  if (other == this.world.hero) {
    other.setTempSpeed(0.075, 50);
  }
  Loot.prototype.onCollide.call(this, other);
};

function GoldChest(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(GoldChest, Loot);

function GoldBars(w, def) {
  Loot.call(this, w, def);
};
tdl.base.inherit(GoldChest, Loot);
