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
      && other.hasItem("key")) {
    return true;
  } else {
    return Actor.prototype.canPass.call(this, other);
  }
}

/**
 *
 * @param {Actor} other
 */
Door.prototype.onCollide = function(other) {
  if (other == this.world.hero) {
    this.kill();
  }
}
