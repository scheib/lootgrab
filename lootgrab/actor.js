tdl.provide("actor")

function Actor(entDef) {
  this.def = entDef;

  //
  // defaults
  //
  this.heading = Vec2.CENTER;
  this.speed = .1;
}

Actor.prototype.update = function(tick, elapsed) {
  
}

