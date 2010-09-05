tdl.provide('fire');
tdl.require('lootgrab.actor')

function Fire(w, def) {
  Actor.call(this, w, def);
  this.spawnInterval = (def.spawn !== undefined) ? def.spawn : 20;
  this.spawnCounter = 0;
  this.spawnPoint = this.position.clone();
};
tdl.base.inherit(Fire, Actor);

Fire.prototype.init = function(instanceDef) {
  Actor.prototype.init.call(this, instanceDef);
  this.spawnPoint = this.position;
}

Fire.prototype.update = function(tick, elapsed) {
  if (this.spawnCounter == 0) {
    Actor.prototype.update.call(this, tick, elapsed);
    var nextpos = this.position.add(this.heading.mul(1));
    if (this.world.isBlocking(nextpos.x, nextpos.y, this)) {
      this.respawn();
    }
  } else {
    this.spawnCounter--;
  }
}


Fire.prototype.onCollide = function(other) {
  other.kill();
  this.respawn();
}

Fire.prototype.draw = function(ctx, cw, ch) {
  if (this.spawnCounter == 0) {
    Actor.prototype.draw.call(this, ctx, cw, ch);
  }
}

Fire.prototype.respawn = function() {
  this.spawnCounter = this.spawnInterval;
  this.position = this.spawnPoint.clone();
}