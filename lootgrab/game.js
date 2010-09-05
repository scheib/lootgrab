tdl.provide("game");
tdl.require("lootgrab.actor");
tdl.require("lootgrab.hero");
tdl.require("lootgrab.world");

/**
 *
 * @param {World} w
 */
function Game(w) {
  this.world = w;

  this.hero = null;
}

Game.WIN = "win";
Game.LOSS = "loss";
Game.RUNNING = "running";

Game.prototype.status = Game.RUNNING;

/**
 * Update loop for the game
 * @param tick
 */
Game.prototype.update = function(tick, elapsed) {
  var dead = {};

  for (var aIdx in this.world.actors) {
    var a = this.world.actors[aIdx];
    a.update(tick, elapsed);
  }

  this.resolveCollisions();

  for (var corpseId in dead) {
    if (this.world.actors[dead[corpseId]] == this.hero) {
      this.status = Game.LOSS;
    }
    delete this.world.actors[dead[corpseId]];
  }
}

Game.prototype.resolveCollisions = function() {
  for (i = 0; i < this.world.actors.length - 1; ++i) {
    for (j = i + 1; j < this.world.actors.length; ++j) {
      var a = this.world.actors[i];
      var b = this.world.actors[j];
      var minContact = a.radius + b.radius;

      if ((a.position - b.position).len() < minContact) {
        a.onCollide(b);
        b.onCollide(a);
      }
    }
  }
}

/**
 *
 * @param {CanvasContext} ctx
 * @param {Number} scale
 */
Game.prototype.debug_draw = function(ctx) {
  var xscale = this.world.tileVisualWidth(ctx);
  var yscale = this.world.tileVisualHeight(ctx);

  for (var cIdx in this.world.cells) {
    var c = this.world.cells[cIdx];
    ctx.strokeRect(
        c.x * xscale,
        c.y * yscale,
        xscale,
        yscale);x
    ctx.strokeText(c.ground_ent.id, c.x * xscale, (c.y + .5) * yscale, xscale);

  }

  for(var aIdx in this.world.actors) {
    var a = this.world.actors[aIdx];
    ctx.beginPath();
    ctx.arc(
        a.position.x * xscale,
        a.position.y * yscale,
        a.radius,
        0,
        2 * Math.PI);
  }
}
