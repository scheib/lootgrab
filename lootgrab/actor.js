tdl.provide("actor")

tdl.require("lootgrab.math")

function Actor(w, entDef) {
  this.entityDef = entDef;

  this.position = new Vec2();
  this.heading = Vec2.CENTER;
  this.speed = .1;
  this.radius = .25;

  this.isAlive = true;
}


/**
 * Update the actor at the beginning of the frame
 *
 * @param tick
 * @param elapsed
 */
Actor.prototype.update = function(tick, elapsed) {
  updatePosition();
}

/**
 * Inform the actor that it has collided with another actor
 *
 * @param {Actor} other
 */
Actor.prototype.onCollide = function(other) {
  
}

Actor.prototype.updatePosition = function(elapsed) {
  this.position = this.position.add (
      this.heading.mul(this.speed));
}

