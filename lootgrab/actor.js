tdl.provide("actor")

tdl.require("lootgrab.math")

/**
 *
 * @param {World} w
 * @param entDef
 */
function Actor(w, entDef) {
  this.world = w;
  this.entityDef = entDef;

  this.position = ('position' in entDef)
      ? new Vec2(entDef.position.x + .5,  entDef.position.y + .5)
      : new Vec2(1.5,1.5);
  this.heading = Vec2.RIGHT;
  this.speed = .025;
  this.radius = .25;

  this.isAlive = true;

  this.sprite = this.world.newEntity(entDef.render_tile);

  this.loot = 'loot' in entDef ? entDef.loot : false;
  this.passable = 'passable' in entDef ? entDef.passable : true;
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

