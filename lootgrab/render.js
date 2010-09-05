tdl.provide('lootgrab.render');
tdl.require('lootgrab.world');

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
  ctx.drawImage(this.img, x,y,w,h);
}

//////////////////////////////////////////////////
function Sprite(world, tile_def) {
  window.console.log(tile_def);
  var that = this;
  if(tile_def === undefined)
    throw "Tile def could not be found!"

  var tileset_def = world.getDef(tile_def.tileset)
  if(tileset_def === undefined)
    throw "Tileset could not be found"

  this.tileset_def = tileset_def;
  this.tile_def = tile_def
  var img = g_imageDB[tileset_def.image];
  if(!img) {
    img = new Image();
    img.src = tileset_def.image;
    img.onload = function() {
      tdl.log(that.img.src + " loaded");
    };
    img.onerror = function() {
      tdl.log(that.img.src + " **FAILED**");
    };
    g_imageDB[tileset_def.image] = img;
  }
  this.img = img;

}
Sprite.prototype.draw = function(ctx, x,y,w,h) {
  var tx = this.tileset_def.tile_width * this.tile_def.start_x;
  var ty = this.tileset_def.tile_height * this.tile_def.start_y;
  ctx.drawImage(this.img, 
    tx, ty, 
    this.tileset_def.tile_width,
    this.tileset_def.tile_height,
    x,y,w,h);
}


///////////////////////////////////////////////////////////////////////////

function Render(world,ctx) {
  this.ctx = ctx;
  this.world = world;;
}

Render.prototype.draw = function() {
  var ctx = this.ctx;
  var w = this.world;
  ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);

  cell_width = ctx.canvas.width / w.width;
  cell_height = ctx.canvas.height / w.height;

  for(var i = 0; i < w.cells.length; ++i) {
    var cell = w.cells[i];
    x = cell.x * cell_width;
    y = cell.y * cell_height;
    w.cells[i].draw(ctx,x,y,cell_width,cell_height);
  }
  if(DEBUG)
    w.draw_dbg(ctx);

}