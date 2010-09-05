tdl.provide('hero');
tdl.require('lootgrab.actor');
tdl.require('lootgrab.route');

function Hero(w, def) {
  Actor.call(this, w, def);
  w.setHero(this);
  this.nextCell = null;
  this.lastCell = null;
}
tdl.base.inherit(Hero, Actor);

/**
 * Update the actor at the beginning of the frame
 *
 * @param world
 * @param tick
 * @param elapsed
 */
Hero.prototype.update = function(world, tick, elapsed) {

  var updateRoute = false;
  if (this.nextCell == null) {
    updateRoute = true;
  } else {
    updateRoute = this.moveToClampedCell(tick, elapsed, this.nextcell);
  }

  if (updateRoute) {
    var pos = [
      Math.floor(this.position.x - this.heading.x * 0.5),
      Math.floor(this.position.y - this.heading.y * 0.5)
    ];

    var path = lootgrab.route.findRoute(world, pos);
    if (path.length) {
      this.lastCell = this.nextCell;
      this.nextCell = new Vec2(path[0][0] + 0.5, path[0][1] + 0.5);

      if (this.lastCell == null) {
        var step = new Vec2(path[0][0], path[0][1]);
        if (step.x > pos[0])
          this.heading = Vec2.RIGHT;
        else if (step.x < pos[0])
          this.heading = Vec2.LEFT;
        else if (step.y < pos[1])
          this.heading = Vec2.UP;
        else if (step.y > pos[1])
          this.heading = Vec2.DOWN;
        else
          this.heading = Vec2.CENTER;
      } else {
        this.heading = this.nextCell.sub(this.lastCell);
      }
    }
  }

  this.updatePosition();
}

Hero.prototype.onCollide = function(other) {
  if (other.loot) {
    other.loot = false;
    other.kill()
  }
}
