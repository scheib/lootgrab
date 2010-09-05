tdl.provide('world')

//////////////////////////////////////////////////
function Cell(world,def,x,y) {
  this.world = world;
  this.x_ = x;
  this.y_ = y;
  this.setType(def);
}

Cell.prototype.setType = function(def) {
  this.ground_ent = this.world.newEntity(def.sprite)
  if(this.ground_ent === undefined)
    throw "Cell.setType() could instantiate a ground_ent by using:" + def.sprite
  this.passable = 'passable' in def ? def.passable : true;
}

Cell.prototype.draw = function(ctx,x,y,w,h) {
  this.ground_ent.draw(ctx,x,y,w,h);
}


///////////////////////////////////////////////////////////////////////////

function World(entityDefs, level) {
  this.width = level.width;
  this.height = level.height;
  this.hero = null;

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
  for(var actorID in level.actors) {
    instanceDef = level.actors[actorID];
    var a = this.newEntity(instanceDef.actor_def);
    a.init(instanceDef);

    this.actors.push(a);
  }
}

World.prototype.newEntity = function(entDefID) {
  def = this.getDef(entDefID);
  if(def === undefined)
    throw "World.newEntity() could not instantiate from entDefID: " + entDefID;

  var e = eval("new "+def.type+"(this, def)");
  return e;
}

World.prototype.getDef = function(entDefID) {
  if(this._entity_defs[entDefID] === undefined)
    tdl.log("World.getDef(" + entDefID + ") is returning 'undefined'!")
  return this._entity_defs[entDefID];
}

/**
 *
 * @param x {Number}
 * @param y {Number}
 * @return {Cell}
 */
World.prototype.cellAt = function(x,y) {
  idx = Math.floor(y) * this.width + Math.floor(x);
  return this.cells[idx];
}

World.prototype.defAt = function(x, y) {
  return this.getDef(this.cellAt(x, y).id);
}

// Convenience function for whether or not a given cell is not passable.
World.prototype.isBlocking = function(x, y) {
  var cell = this.cellAt(x, y);
  return cell ? !cell.passable : false;
}

// Convenience function for whether or not a given cell has something the
// player wants to run towards.
World.prototype.isDesirable = function(x, y) {
  return false;
}

World.prototype.draw_dbg = function (ctx) {
  cell_width = this.tileVisualWidth();
  cell_height = tile.tileVisualHeight();
  for(var i = 0; i < this.cells.length; ++i) {
    var cell =this.cells[i];
    ctx.strokeStyle = "rgb(255,255,0)";
    ctx.strokeRect(cell_width * cell.x_,
                   cell_height * cell.y_,
                   cell_width, cell_height);
  }
}

World.prototype.actors = [];

World.prototype.tileVisualWidth = function(ctx) {
  return 32; //ctx.canvas.clientWidth / this.width;
};

World.prototype.tileVisualHeight = function(ctx) {
  return 32; //ctx.canvas.clientHeight / this.width;
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
World.prototype.setCellDef = function(x, y, def) {
  tdl.log("setCell: ", x, y, ": ", def.type);
  if(def.type != "Cell")
    throw def.type + "is not a cell!";
  this.cellAt(x,y).setType(def);
};

/**
 * Gets the possible typs of cell defs
 */
World.prototype.getCellDefs = function() {
  var cellDefs = []
  for(var defName in this._entity_defs) {
    var def = this._entity_defs[defName];;
    if(def.type == "Cell")
      cellDefs.push(def);
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

/**
 * Sets a hero
 */
World.prototype.setHero = function(actor) {
  this.hero = actor;
}
