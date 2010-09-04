tdl.provide('world')

///////////////////////////////////////////////////////////////////////////

function World(json) {
  this.width = json.world.width;
  this.height = json.world.height;

  // entity defs are demand-initalized so that
  // entity defs can reference other entity defs during load
  this._entity_defs = json.entities;

  // init the cell grid
  this.cells = []
  var i = 0;
  for(var i = 0; i < json.world.cells.length; ++i) {
    var cellID = json.world.cells[i]
    cx = i % this.width
    cy = Math.floor(i / this.width);
    var cell = new Cell(this,cellID, cx, cy,json.cells[cellID])
    this.cells.push(cell)
  }

  this.actors = {};
  for(var actorID in json.actors) {

  }
}

World.prototype.newEntity = function(entDefID) {
  that = this;
  def = this.getDef(entDefID);
  if(def === undefined)
    throw "No entity def found for " + entDefID;

  if(def.type == "image") {
    e = new ImageEntity(this,entDefID)
  } else if(def.type == "tile") {
    e = new TileEntity(this,entDefID);
  } else {
    throw "Un instantiable ent type: " + def.type
  }
  this.id = entDefID;
  return e;
}

World.prototype.getDef = function(entDefID) {
  return this._entity_defs[entDefID];
}

 /**
 *
 * @param x {Number}
 * @param y {Number}
 * @return {Cell}
 */
World.prototype.cellAt = function(x,y) {
  idx = x * this.width + y;
  return this.cells[Math.Floor(idx)];
}

World.prototype.defAt = function(x, y) {
  return this.getDef(this.cellAt(x, y).id);
}

World.prototype.draw_dbg = function (ctx) {
  cell_width = ctx.canvas.width / this.width;
  cell_height = ctx.canvas.height / this.height;
  for(var i = 0; i < this.cells.length; ++i) {
    var cell =this.cells[i];
    ctx.strokeStyle = "rgb(255,255,0)";
    ctx.strokeRect(cell_width * cell.x,
                   cell_height * cell.y,
                   cell_width, cell_height);
  }
}

World.prototype.actors = {};

World.prototype.tileVisualWidth = function(ctx) {
  return ctx.canvas.clientWidth / this.width;
};

World.prototype.tileVisualHeight = function(ctx) {
  return ctx.canvas.clientHeight / this.width;
};


