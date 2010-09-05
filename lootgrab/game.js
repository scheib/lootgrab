tdl.provide("game");
tdl.require("lootgrab.actor");
tdl.require("lootgrab.exit");
tdl.require("lootgrab.hero");
tdl.require("lootgrab.loot");
tdl.require("lootgrab.skeleton");
tdl.require("lootgrab.grimreaper");
tdl.require("lootgrab.world");

/**
 *
 * @param {World} w
 */
function Game(w) {
  this.world = w;
  this.world.game = this;
}

Game.WIN = "win";
Game.LOSS = "loss";
Game.RUNNING = "running";

Game.prototype.status = Game.RUNNING;

Game.prototype.reset = function() {
  this.status = Game.RUNNING;
}

/**
 * Update loop for the game
 * @param tick
 */
Game.prototype.update = function(tick, elapsed) {
  if (this.status == Game.LOSS || this.status == Game.WIN)
    return;

  var freshlyDead = [];

  for (var aIdx in this.world.actors) {
    var a = this.world.actors[aIdx];
    a.update(this.world, tick, elapsed);
  }

  this.resolveCollisions();
  for (var i = 0, actor; actor = this.world.actors[i]; i++) {
    if (actor.deathState == Actor.DYING) {
      freshlyDead.push(actor);
    }
  }

  for (var i = 0, corpse; corpse = freshlyDead[i]; i++) {
    if (corpse == this.world.hero) {
      this.lose();
    }
    corpse.killed();
  }
}

Game.prototype.resolveCollisions = function() {
  for (i = 0; i < this.world.actors.length - 1; ++i) {
    for (j = i + 1; j < this.world.actors.length; ++j) {
      var a = this.world.actors[i];
      var b = this.world.actors[j];

      if (a.isDead() || b.isDead() || j == i)
        continue;

      var minContact = a.radius + b.radius;
      if (a.position.sub(b.position).len() < minContact) {
        a.onCollide(b);
        b.onCollide(a);
      }
    }
  }
}

Game.prototype.lose = function() {
  this.world.showMessage("You lose", "deathmessage");
  this.status = Game.LOSS;
}

Game.prototype.win = function() {
  this.world.showMessage("You won", "winmessage");
  this.status = Game.WIN;
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
        c.x_ * xscale,
        c.y_ * yscale,
        xscale,
        yscale);x
    ctx.strokeText(c.ground_ent.id, c.x_ * xscale, (c.y_ + .5) * yscale, xscale);

  }

  for(var aIdx in this.world.actors) {
    var a = this.world.actors[aIdx];
    ctx.beginPath();
    ctx.arc(
        a.position.x_ * xscale,
        a.position.y_ * yscale,
        a.radius,
        0,
        2 * Math.PI);
  }
}
