tdl.provide("game");
tdl.require("lootgrab.actor");
tdl.require("lootgrab.world");

function Game(w) {
  this.world = w;
}

Game.prototype.update = function(tick) {
  
}

/**
 *
 * @param {CanvasContext} ctx
 * @param {Number} scale
 */
Game.prototype.debug_draw = function(ctx, scale) {

  for (var cIdx in this.world.cells) {
    var c = this.world.cells[cIdx];
    ctx.strokeRect(
        c.x * scale,
        c.y * scale,
        scale,
        scale);

  }

  for(var aIdx in this.world.actors) {
    var a = this.world.actors[aIdx];
    ctx.beginPath();
    ctx.arc(
        a.position.x * scale,
        a.position.y * scale,
        a.radius,
        );
  }
}
