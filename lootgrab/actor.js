tdl.provide("actor")

tdl.require("lootgrab.math")

/**
 *
 * @param {World} w
 * @param entDef
 */
function Actor(w, entDef) {
  try {
    if (entDef === undefined)
      console.error("Undefined entity def.");
    this.world = w;
    this.entityDef = entDef;

    this.position = entDef.postition
        ? new Vec2(entDef.position.x + .5,  entDef.position.y + .5)
        : new Vec2(1.5,1.5);
    this.heading = entDef.heading
        ? eval("Vec2." + entDef.heading)
        : Vec2.CENTER;
    this.speed = entDef.speed || 0;
    this.radius = entDef.radius || Math.sqrt(2) / 4;

    this.deathState = Actor.ALIVE;
    this.sprite = this.world.newEntity(entDef.sprite);

    this.loot = entDef.loot || false;
    this.passable = entDef.passable || true;
    this.key = entDef.key || false;
    this.killable = entDef.killable || false;
  } catch (err) {
    alert("Couldn't create Actor: " + err.toString());
  }
}

Actor.ALIVE = 0;
Actor.DYING = 1;
Actor.DEAD = 2;

Actor.prototype.init = function(instanceDef) {
  try {
    if ('position' in instanceDef) {
      var pos = new Vec2(instanceDef.position.x + .5, instanceDef.position.y + .5);
      this.position = pos;
    }
  } catch (err) {
    alert("Couldn't initialize Actor: " + err.toString());
  }
}

Actor.prototype.getWorld = function() {
  return this.world;
}

Actor.prototype.draw = function(ctx, cw, ch) {
  // Actor position is center of cell, so subtract
  // 0.5 so that we draw it in the right position.
  this.sprite.draw(ctx,
      (this.position.x - 0.5) * cw,
      (this.position.y - 0.5) * ch,
      cw, ch);
}

/**
 * Update the actor at the beginning of the frame
 *
 * @param world
 * @param tick
 * @param elapsed
 */
Actor.prototype.update = function(world, tick, elapsed) {
  if (this.isDead()) return;

  var nextpos = this.position.add(this.heading.mul(0.5))
  if (this.world.isBlocking(nextpos.x, nextpos.y)) {
    this.heading = this.heading.negate();
  }
  this.updatePosition();
}

/**
 * Inform the actor that it has collided with another actor
 *
 * @param {Actor} other
 */
Actor.prototype.onCollide = function(other) {

}

/**
 * Returns true if the other actor can pass this one
 *
 * @param {Actor} other
 * @return {Boolean}
 */
Actor.prototype.canPass = function(other) {
  return this.passable;
}

Actor.prototype.isDead = function() {
  return (this.deathState == Actor.DEAD);
}

Actor.prototype.kill = function() {
  this.deathState = Actor.DYING;
}

Actor.prototype.killed = function() {
  lootgrab.audio.play_sound("death");
  this.deathState = Actor.DEAD;
  this.speed = 0;
  this.heading = Vec2.CENTER;
  // FIX this.sprite.img = new Image();
}

Actor.prototype.updatePosition = function(elapsed) {
  this.position = this.position.add(
      this.heading.mul(this.speed));
}

/**
 * If an actor is moving towards nextcell and it would get there
 * this tick, move the actor there (clamped) and return true.
 * Otherwise, return false.
 */
Actor.prototype.moveToClampedCell = function(tick, elapsed, nextcell) {
  var nextpos = this.position.add(this.heading.mul(this.speed));
  var nextlen = this.nextCell.sub(nextpos).len();
  var thislen = this.nextCell.sub(this.position).len();
  if (nextlen > thislen || thislen < this.speed) {
    // Round off position to current cell.
    // TODO: correct for elapsed so that motion is smooth across
    // multiple cells.
    this.position = new Vec2(
      this.nextCell.x,
      this.nextCell.y
    );
    return true;
  }
  return false;
}
