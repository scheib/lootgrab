tdl.provide("actor")

tdl.require("lootgrab.math")

/**
 *
 * @param {World} w
 * @param entDef
 */
function Actor(w, entDef) {
  this.world = w;
  this.entityDef = entDef;

  this.position = ('position' in entDef) ? new Vec2(entDef.position.x,  entDef.position.y) : new Vec2(0,0);
  this.heading = Vec2.CENTER;
  this.speed = .1;
  this.radius = .25;

  this.isAlive = true;

  this.sprite = this.world.newEntity(entDef.sprite);
}


/**
 * Update the actor at the beginning of the frame
 *
 * @param tick
 * @param elapsed
 */
Actor.prototype.update = function(tick, elapsed) {
  this.updatePosition();
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

