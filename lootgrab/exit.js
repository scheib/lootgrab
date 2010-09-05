tdl.provide("exit");
tdl.require("lootgrab.actor");

function Exit(w, entDef) {
  Actor.call(this, w, entDef);
  
}

tdl.base.inherit(Exit,Actor);

Exit.prototype.onCollide = function(other) {
  if (other == this.world.hero) {
    this.world.game.win();
  }
}