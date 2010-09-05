tdl.provide('render');
tdl.require('world');

//////////////////////////////////////////////////
function ImageEntity(world, entID) {
  var def = world.getDef(entID);
  var that = this;
  this.img = new Image();
  this.img.src = def.img;
  this.img.onload = function() { 
    tdl.log(that.img.src + " loaded");
  };
  this.img.onerror = function() { 
    tdl.log(that.img.src + " **FAILED**"); 
  };
}

ImageEntity.prototype.draw = function(ctx, x,y,w,h) {
  ctx.drawImage(this.img, x,y,w,h);
}

//////////////////////////////////////////////////
function TileEntity(world, entID) {
  var tile_def = world.getDef(entID);
  if(tile_def === undefine)
    throw "Tile def could not be found!"
  
  var tileset_def = world.getDef(tile_def.tileset)
  if(tilset_def === undefined)
    throw "Tileset could not be found"
}
TileEntity.prototype.draw = function(ctx, x,y,w,h) {
  ctx.drawImage(this.img, x,y,w,h);
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