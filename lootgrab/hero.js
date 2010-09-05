tdl.provide('hero');
tdl.require('lootgrab.actor');
tdl.require('lootgrab.route');

function Hero(w, def) {
  Actor.call(this, w, def);
  w.setHero(this);
}
tdl.base.inherit(Hero, Actor);

/**
 * Update the actor at the beginning of the frame
 *
 * @param world
 * @param tick
 * @param elapsed
 */
Hero.prototype.update = function(world, tick, elapsed) {
  var nextpos = this.position.add(this.heading.mul(0.5))
  if (this.world.isBlocking(nextpos.x, nextpos.y)) {
    this.heading = this.heading.negate();
  }
  this.updatePosition();
}
