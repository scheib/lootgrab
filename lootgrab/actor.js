tdl.provide("actor")

tdl.require("lootgrab.math")

/**
 *
 * @param {World} w
 * @param entDef
 */
function Actor(w, entDef) {
  if (entDef === undefined)
    console.error("Undefined entity def.");
  this.world = w;
  this.entityDef = entDef;

  this.position = ('position' in entDef)
      ? new Vec2(entDef.position.x + .5,  entDef.position.y + .5)
      : new Vec2(1.5,1.5);
  this.heading = Vec2.CENTER;
  this.speed = .025;
  this.radius = .25;

  this.isAlive = true;

  this.sprite = this.world.newEntity(entDef.sprite);

  this.loot = 'loot' in entDef ? entDef.loot : false;
  this.passable = 'passable' in entDef ? entDef.passable : true;
}

Actor.prototype.init = function(instanceDef) {
  if ('position' in instanceDef) {
    var pos = new Vec2(instanceDef.position.x + .5, instanceDef.position.y + .5);
    this.position = pos;
  }
  if ('heading' in instanceDef) {
    this.heading = eval("Vec2." + instanceDef.heading)
  }
}

Actor.prototype.draw = function(ctx, cw, ch) {
  // Actor position is center of cell, so subtract
  // 0.5 so that we draw it in the right position
  this.sprite.draw(ctx, 
      (this.position.x - 0.5) * cw, 
      (this.position.y - 0.5) * ch,
      cw, ch);
}

/**
 * Update the actor at the beginning of the frame
 *
 * @param tick
 * @param elapsed
 */
Actor.prototype.update = function(tick, elapsed) {
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

Actor.prototype.updatePosition = function(elapsed) {
  this.position = this.position.add(
      this.heading.mul(this.speed));
}

