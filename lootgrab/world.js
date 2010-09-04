tdl.provide('world')

function ImageEntity(world,entID) {
  var def = world.get_def(entID);
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

function TileEntity(world,entID) {
  var tile_def = world.get_def(entID)
  if(tile_def === undefine)
    throw "Tile def could not be found!"
  
  var tileset_def = world.get_def(tile_def.tileset)
  if(tilset_def === undefined)
    throw "Tileset could not be found"
}
TileEntity.prototype.draw = function(ctx, x,y,w,h) {
  ctx.drawImage(this.img, x,y,w,h);
}

///////////////////////////////////////////////////////////////////////////

function Cell(world,id,x,y,json) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.ground_ent = world.newEntity(json.ground_id)
  if(this.ground_ent === undefined)
    throw "Could not instantiate " + json.ground_id
}

Cell.prototype.draw = function(ctx,x,y,w,h) {
  ctx.strokeStyle = "rgb(255,255,0)";
  ctx.strokeRect(x,y,w,h);
  this.ground_ent.draw(ctx,x,y,w,h);
}

function World(json) {
  this.width = json.world.width;
  this.height = json.world.height;
  
  // entity defs are demand-initalized so that
  // entity defs can reference other entity defs during load
  this._entity_defs = json.entities;
  
  // init the cell grid
  this.cells = []
  var i = 0
  for(var i = 0; i < json.world.cells.length; ++i) {
    var cellID = json.world.cells[i]
    cx = i % this.width
    cy = Math.floor(i / this.width);
    var cell = new Cell(this,cellID, cx, cy,json.cells[cellID])
    this.cells.push(cell)
  }
}

World.prototype.get_def = function(entID) {
  return this._entity_defs[entID];
}

World.prototype.newEntity = function(entID) {
  that = this;
  def = this.get_def(entID);
  if(def === undefined)
    throw "No entity def found for " + entID;
  
  if(def.type == "image") {
    e = new ImageEntity(this,entID)
  } else if(def.type == "tile") {
    e = new TileEntity(this,entID);
  } else {
    throw "Un instantiable ent type: " + def.type
  }
  this.id = entID;
  return e;
}

World.prototype.draw_dbg = function (ctx) {
  cell_width = ctx.canvas.width / this.width;
  cell_height = ctx.canvas.height / this.height;
  for(var i = 0; i < this.cells.length; ++i) {
    var cell =this.cells[i];
    cell.draw(ctx,
            cell_width * cell.x,
            cell_height * cell.y,
            cell_width, cell_height);
  }
}
