tdl.provide('lootgrab.wall');
tdl.require('lootgrab.actor');

tdl.require('tdl.log');

var timedWallTicks = 150;

function TimedWall(w, def) {
  Actor.call(this, w, def);
  this.ticksRemaining = timedWallTicks;
};
tdl.base.inherit(TimedWall, Actor);

TimedWall.prototype.update = function(world, tick, elapsed) {
  if (this.ticksRemaining > 0) {
    this.ticksRemaining--;
    if (!this.ticksRemaining)
      this.kill();
  }
};
