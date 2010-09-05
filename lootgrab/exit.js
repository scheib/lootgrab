tdl.provide("exit");
tdl.require("lootgrab.actor");

function Exit(w, entDef) {
  Actor.call(this, w, entDef);
  this.exit = true;
}

tdl.base.inherit(Exit,Actor);

Exit.prototype.onCollide = function(other) {
  if (other == this.world.hero) {
    other.useItem("exit");
    this.world.game.win();
  }
}