tdl.provide('world')

//////////////////////////////////////////////////
function Cell(world,def,x,y) {
  this.world = world;
  this.x = x;
  this.y = y;
  this.setType(def);
  this.passable = 'passable' in def ? def.passable : true;
}

Cell.prototype.setType = function(def) {
  this.ground_ent = this.world.newEntity(def.render_tile)
  if(this.ground_ent === undefined)
    throw "Could not instantiate " + json.ground_id
}

Cell.prototype.draw = function(ctx,x,y,w,h) {
  this.ground_ent.draw(ctx,x,y,w,h);
}


///////////////////////////////////////////////////////////////////////////

function World(entityDefs, level) {
  this.width = level.width;
  this.height = level.height;

  // entity defs are demand-initalized so that
  // entity defs can reference other entity defs during load
  this._entity_defs = entityDefs;

  // init the cell grid
  this.cells = []
  var i = 0;
  for(var i = 0; i < level.cells.length; ++i) {
    var cellType = level.cells[i]
    cx = i % this.width
    cy = Math.floor(i / this.width);
    var cell = new Cell(this, this.getDef(cellType), cx, cy)
    this.cells.push(cell)
  }

  this.actors = [];
  i = 0;
  for(var actorID in level.actors) {
    var a = this.newEntity(level.actors[actorID]);
    this.actors[i] = a;
  }
}

World.prototype.newEntity = function(entDefID) {
  def = this.getDef(entDefID);
  if(def === undefined)
    throw "No entity def found for " + entDefID;

  var e = eval("new "+def.type+"(this, def)");
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

World.prototype.actors = [];

World.prototype.tileVisualWidth = function(ctx) {
  return ctx.canvas.clientWidth / this.width;
};

World.prototype.tileVisualHeight = function(ctx) {
  return ctx.canvas.clientHeight / this.width;
};

/**
 * Returns true if cell x,y can be set to a particular cell def.
 */
World.prototype.canSetCellDef = function(x, y, type) {
  return true;
};

/**
 * Sets cell x,y to particular cell def
 */
World.prototype.setCellDef = function(x, y, type) {
  tdl.log("setCell: ", x, y, ": ", type);
  var def = this.getDef(type);
  if(def.type != "Cell")
    throw type + "is not a cell!";
  this.cellAt(x,y).setType(type);
};
 
/**
 * Gets the possible typs of cell defs
 */
World.prototype.getCellDefs = function(x, y, type) {
  var cellDefs = []
  for(var defName in this._entity_defs) {
    var def = this._entity_defs[defName];;
    if(def.type == "Cell")
      cellDefs.add(def);
  }
  return cellDefs;
}

/**
 * Returns true of can set an actor in cell x,y
 * NOTE: This function should either ways return
 * false while the game is running (vs editing)
 * or else the editor should know not to place
 * actors while the game is running.
 */
World.prototype.canSetActor = function(x, y, actor) {
  return true;
};

/**
 * Sets a actor
 */
World.prototype.setActor = function(x, y, actor) {
  tdl.log("setActor: ", x, y, ": ", actor);
};
