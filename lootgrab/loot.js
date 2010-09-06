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
  this.target = null;
  this.meat = true;
  this.ticks = 75;
  this.inventoryHide = true;
};
tdl.base.inherit(Meat, Loot);
Meat.prototype.onCollide = function(other) {
  if (other == this.world.hero) {
    this.target = other;
    this.position = new Vec2(-100,-100);
  }
};

Meat.prototype.update = function(ticks, elapsed) {
  if (this.target) {
    if(this.ticks > 0) {
      this.target.setTempSpeed(0.085, 2);
      this.ticks--;
    } else {
      this.target.useItem("meat");
      this.kill()
    }
  }
}

function GoldChest(w, def) {
  Loot.call(this, w, def);
  this.inventoryHide = true;
};
tdl.base.inherit(GoldChest, Loot);

function GoldBars(w, def) {
  Loot.call(this, w, def);
  this.inventoryHide = true;
};
tdl.base.inherit(GoldBars, Loot);
