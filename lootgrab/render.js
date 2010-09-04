tdl.provide('render');
tdl.require('world');

//////////////////////////////////////////////////
function ImageEntity(world,entID) {
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
function TileEntity(world,entID) {
  var tile_def = world.getDef(entID)
  if(tile_def === undefine)
    throw "Tile def could not be found!"
  
  var tileset_def = world.getDef(tile_def.tileset)
  if(tilset_def === undefined)
    throw "Tileset could not be found"
}
TileEntity.prototype.draw = function(ctx, x,y,w,h) {
  ctx.drawImage(this.img, x,y,w,h);
}


//////////////////////////////////////////////////
function Cell(world,id,x,y,json) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.ground_ent = world.newEntity(json.ground_id)
  if(this.ground_ent === undefined)
    throw "Could not instantiate " + json.ground_id
}

Cell.prototype.draw = function(ctx,x,y,w,h) {
  this.ground_ent.draw(ctx,x,y,w,h);
}

///////////////////////////////////////////////////////////////////////////

function Render(world) {
  this.world = world;;
}

Render.prototype.draw = function(ctx) {
  cell_width = ctx.canvas.width / this.world.width;
  cell_height = ctx.canvas.height / this.world.height;
  var w = this.world;
/*  for (x = 0; x < w.width; ++x) {
    for (y = 0; y < w.height; ++y) {
      if ( (x + y) % 2 == 1) {
        ctx.fillStyle = "rgb(0,0,0)";
      } else {
        ctx.fillStyle = "rgb(255,255,255)";
      }
      xx = x * cell_width;
      yy = y * cell_height;
      
      ctx.fillRect( xx, yy, cellWidth, cellHeight);
    }
  }*/
  for(var i = 0; i < w.cells.length; ++i) {
    var cell = w.cells[i];
    x = cell.x * cell_width;
    y = cell.y * cell_height;
    w.cells[i].draw(ctx,x,y,cell_width,cell_height);
  }
}