tdl.provide('hero');
tdl.require('lootgrab.actor');
tdl.require('lootgrab.route');
tdl.require('lootgrab.audio');

function Hero(w, def) {
  Actor.call(this, w, def);
  w.setHero(this);
  this.nextCell = null;
  this.lastCell = null;
  this.ticks = 0;
  this.inventory = [];
}
tdl.base.inherit(Hero, Actor);

/**
 *
 * @param {CanvasContext} ctx
 * @param {Number} cw
 * @param {Number} ch
 */
Hero.prototype.draw = function(ctx, cw, ch) {
  // Actor position is center of cell, so subtract
  // 0.5 so that we draw it in the right position.
  this.sprite.draw(ctx,
      (this.position.x - 0.5) * cw,
      (this.position.y - 0.5) * ch,
      cw, ch);

  if (this.inventory.length > 0) {
    var idx = Math.floor(this.ticks / 20) % this.inventory.length;
    this.inventory[idx].sprite.draw(ctx,
      (this.position.x) * cw,
      (this.position.y) * ch,
      cw/1.5, ch/1.5);
  }

}

/**
 * Update the actor at the beginning of the frame
 *
 * @param world
 * @param tick
 * @param elapsed
 */
Hero.prototype.update = function(world, tick, elapsed) {
  this.ticks = tick;
  if (this.tempSpeedTicksLeft > 0) this.tempSpeedTicksLeft--;

  var pos = null;
  if (this.nextCell != null) {
    pos = [
      Math.floor(this.nextCell.x),
      Math.floor(this.nextCell.y)
    ];
  } else {
    pos = [
      Math.floor(this.position.x - this.heading.x * 0.5),
      Math.floor(this.position.y - this.heading.y * 0.5)
    ];
  }

  var path = lootgrab.route.findRoute(world, pos);
  this.currentPath = path;

  var updateRoute = false;
  if (this.nextCell == null) {
    updateRoute = true;
  } else {
    updateRoute = this.moveToClampedCell(tick, elapsed, this.nextCell);
  }

  if (updateRoute) {
    this.lastCell = this.nextCell;

    if (path.length) {
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
    this.currentPath = path;
  }

  this.updatePosition();
}

Hero.prototype.hasItem = function(name) {
  for (var i = 0; i < this.inventory.length; ++i) {
    if (this.inventory[i][name]) return true;
  }
  return false;
}

Hero.prototype.useItem = function(itemName) {
  for (var i = 0; i < this.inventory.length; ++i) {
    if (this.inventory[i][itemName]) {
      this.inventory.splice(i, 1);
      return;
    }
  }
}

Hero.prototype.onCollide = function(other) {
  if (other.loot) {
    lootgrab.audio.play_sound("treasure");
    other.loot = false;
    this.inventory.push(other);
  }
}

Hero.prototype.drawPath = function(ctx, cw, ch) {
  if (this.isDead()) return;
  if (this.currentPath && this.currentPath.length) {
    ctx.beginPath();
    ctx.moveTo(this.position.x * cw, this.position.y * ch);
    if (this.nextCell)
      ctx.lineTo(this.nextCell.x * cw, this.nextCell.y * ch);
    for(var i = 0; i < this.currentPath.length; ++i) {
      ctx.lineTo((this.currentPath[i][0]+0.5) * cw, (this.currentPath[i][1]+0.5)* ch);
    }
    ctx.strokeStyle = "rgba(235,169,28,0.5)";
    ctx.lineWidth = 4;
    ctx.stroke();
  }
}
