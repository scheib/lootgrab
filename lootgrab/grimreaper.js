tdl.provide('grimreaper');
tdl.require('lootgrab.actor');

function GrimReaper(w, def) {
  Actor.call(this, w, def);

  // To ease our pathfinding, decide what cell should be next - 
  // this allows us to only make pathing decisions when we reach that
  // cell, rather than causing wiggling between cells. 
  this.nextCell = null;
}
tdl.base.inherit(GrimReaper, Actor);

GrimReaper.prototype.update = function(world, tick, elapsed) {
  if (this.isDead()) return;

  // If we're going to reach nextCell in this update, decide on a new path.
  var updateRoute = false;
  if (this.nextCell == null) {
    updateRoute = true;
  } else {
    var nextpos = this.position.add(this.heading.mul(this.speed * elapsed));
    var nextlen = this.nextCell.sub(nextpos).len();
    var thislen = this.nextCell.sub(this.position).len();
    if (nextlen > thislen || thislen < this.speed * elapsed) {
      // Round off position to current cell.
      // TODO: correct for elapsed so that motion is smooth across
      // multiple cells.
      this.position = new Vec2(
        this.nextCell.x,
        this.nextCell.y
      );
      updateRoute = true;
    }
  }

  if (updateRoute) {
    // Dumb routing.
    var dir = this.world.hero.position.sub(this.position);
    var horizontal = (Math.abs(dir.y) - Math.abs(dir.x) < 0);

    if (dir.x < 0 && horizontal) {
      this.heading = Vec2.LEFT;
    } else if (dir.x > 0 && horizontal) {
      this.heading = Vec2.RIGHT;
    } else if (dir.y > 0) {
      this.heading = Vec2.DOWN;
    } else {
      this.heading = Vec2.UP;
    }

    // Stop trying to run into walls.
    var nextpos = this.position.add(this.heading.mul(1));

    if (this.world.isBlocking(nextpos.x, nextpos.y)) {
      this.heading = Vec2.CENTER;
      nextpos = new Vec2(
        this.position.x,
        this.position.y
      )
    }

    this.nextCell = new Vec2(
      Math.floor(nextpos.x) + 0.5,
      Math.floor(nextpos.y) + 0.5
    );
  }

  Actor.prototype.update.call(this, world, tick, elapsed);
}

GrimReaper.prototype.onCollide = function(other) {
  other.kill();
}
