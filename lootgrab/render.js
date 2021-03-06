tdl.provide('lootgrab.render');
tdl.require('lootgrab.world');
tdl.require('lootgrab.smartsprite');

//////////////////////////////////////////////////
g_imageDB = {};

function ImageEntity(world, def) {
  var that = this;
  var img = g_imageDB[def.image];
  if(!img) {
    img = new Image();
    img.src = def.image;
    img.onload = function() {
      tdl.log(that.img.src + " loaded");
    };
    img.onerror = function() {
      tdl.log(that.img.src + " **FAILED**");
    };
    g_imageDB[def.img] = img;
  }
  this.img = img;
}

ImageEntity.prototype.draw = function(ctx, x,y,w,h) {
  ctx.drawImage(this.img, x, y, w, h);
}

//////////////////////////////////////////////////
function Sprite(world, tile_def) {
  world.renderEnts.push(this)

  var that = this;
  if(tile_def === undefined)
    throw "Tile def could not be found!";

  var tileset_def = world.getDef(tile_def.tileset);
  if(tileset_def === undefined)
    throw "Tileset could not be found";

  this.tileset_def = tileset_def;
  this.tile_def = tile_def;
  var img = g_imageDB[tileset_def.image];
  if(!img) {
    img = new Image();
    img.src = tileset_def.image;
    img.onload = function() {
      tdl.log(that.img.src + " loaded");
    };
    img.onerror = function() {
      tdl.log(that.img.src + " **FAILED**");
      that.img = undefined;
    };
    g_imageDB[tileset_def.image] = img;
  }
  this.img = img;
  this._cur_frame = 0;
  this._anim_length = tile_def.length === undefined ? 0.2 * this.tile_def.frames : tile_def.length;
  this._time_start = Math.random();
}

Sprite.prototype.update = function(ts) {
  if(this.tile_def.frames > 1) {
    var cur_time = (ts+this._time_start) % this._anim_length;
    var percent_complete = cur_time / this._anim_length;
    this._cur_frame = Math.floor(percent_complete * this.tile_def.frames);
  } else {
    this._cur_frame = 0;
  }
}

Sprite.prototype.draw = function(ctx, x,y,w,h) {
  if(this.img === undefined) {
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.fillRect(x,y,w,h);
    ctx.fillString("Error", x+3,y+3);
    return;
  }

  var tileWidth = this.tileset_def.tile_width;
  var tileHeight = this.tileset_def.tile_height;
  var tx = tileWidth * this.tile_def.start_x;
  var ty = tileHeight * this.tile_def.start_y;
  tx += this._cur_frame * tileWidth;
  try {
    ctx.drawImage(this.img,
                  tx, ty,
                  tileWidth,
                  tileHeight,
                  x,y,w,h);
  } catch(e) {
    if(this.error_printed===undefined) {
      tdl.log("problem with image " + this.entDefID);
      this.error_printed = true;
      tdl.log("img.src = ", this.img.src);
      tdl.log("srcx, srcy = ", tx, ty);
      tdl.log("img.width, img.height ", this.img.width, this.img.height);
    }
  }
}


///////////////////////////////////////////////////////////////////////////

function Render(world,ctx) {
  this.ctx = ctx;
  this.world = world;;
}

Render.prototype.update = function(ts) {
  var w = this.world;
  for(var i = 0; i < w.renderEnts.length; ++i) {
    w.renderEnts[i].update(ts);
  }
}

Render.prototype.draw = function() {
  var ctx = this.ctx;
  var w = this.world;
  ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);

  cellWidth = 32;
  cellHeight = 32;

  for(var i = 0; i < w.cells.length; ++i) {
    var cell = w.cells[i];
    x = cell.x_ * cellWidth;
    y = cell.y_ * cellHeight;
    w.cells[i].draw(ctx, x, y, cellWidth, cellHeight);
  }

  // Render background actors first.
  for(var i = 0, actor; actor = w.actors[i]; ++i) {
    if (!actor.isDead() && actor.renderBackground)
      actor.draw(ctx, cellWidth, cellHeight);
  }

  // draw the hero's path
  w.hero.drawPath(ctx, cellWidth, cellHeight);

  // Render foreground actors.
  for(var i = 0, actor; actor = w.actors[i]; ++i) {
    if (!actor.isDead() && !actor.renderBackground)
      actor.draw(ctx, cellWidth, cellHeight);
  }

  if(DEBUG)
    w.draw_dbg(ctx);
}
