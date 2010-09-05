tdl.provide("actor")

tdl.require("math")

function Actor(entDef) {
  this.def = entDef;

}

Actor.prototype.position = new Vec2();
Actor.prototype.heading = Vec2.CENTER;
Actor.prototype.speed = .1;
Actor.prototype.radius = .25;

Actor.prototype.isAlive = true;

/**
 * Update the actor at the beginning of the frame
 *
 * @param tick
 * @param elapsed
 */
Actor.prototype.update = function(tick, elapsed) {
  
}

Actor.prototype.onCollide = function(other) {
  
}



