tdl.provide('door');
tdl.require('lootgrab.actor');

function Door(w, def) {
  this.Door = true;
  Actor.call(this, w, def);
};
tdl.base.inherit(Door, Actor);

/**
 *
 * @param {Actor} other
 */
Door.prototype.canPass = function(other) {
  if (other == this.world.hero
      && other.hasKey()) {
    return true;
  } else {
    return Actor.canPass();
  }
}

/**
 *
 * @param {Actor} other
 */
Door.prototype.onCollide = function(other) {
  if (other == this.world.hero) {
    other.useKey();
    this.kill();
  }
}