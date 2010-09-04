tdl.provide("actor")

tdl.require("math")

function Actor(entDef) {
  this.def = entDef;

}

Actor.prototype.position = newVec2();
Actor.prototype.heading = Vec2.CENTER;
Actor.prototype.speed = .1;
Actor.prototype.radius = .25;

Actor.prototype.update = function(tick, elapsed) {
  
}



