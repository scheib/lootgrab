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

Cell.prototype.draw = function(ctx, x, y, w, h) {
  this.ground_ent.draw(ctx,x,y,w,h);
}

Cell.prototype.update = function(ts) {
}


///////////////////////////////////////////////////////////////////////////

function World(entityDefs, level) {
  this.width = level.width;
  this.height = level.height;
  this.hero = null;
  this.game = null;
  this.renderEnts = [];

  // entity defs are demand-initalized so that
  // entity defs can reference other entity defs during load
  this._entity_defs = entityDefs;
  this.levelData_ = level;
  this.init_(this.levelData_);
}

World.prototype.reset = function() {
  this.clearMessage();
  this.init_(this.levelData_);
  this.game.reset();
}

World.prototype.init_ = function() {
  // init the cell grid
  var level = this.levelData_;
  this.cells = [];
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
  e.entDefID = entDefID;
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
};

World.prototype.setCellAt = function(defName, x, y) {
  var def = this._entity_defs[defName];
  if(def.type != "Cell") {
    throw "non Cell type used in setCellAt";
  }
  this.cellAt(x, y).setType(def);
};

World.prototype.setLevelCellAt = function(defName, x, y) {
  var def = this._entity_defs[defName];
  if(def.type != "Cell") {
    throw "non Cell type used in setLevelCellAt";
  }

  this.levelData_.cells[y * this.width + x] = defName;
};

World.prototype.serializeLevel = function(gfx) {
  var canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 96;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(gfx.tileCtx.canvas, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(gfx.entityCtx.canvas, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(gfx.effectCtx.canvas, 0, 0, canvas.width, canvas.height);
  try {
    this.levelData_.img = canvas.toDataURL();
  } catch (e) {
    tdl.log("Could not make screenshot:", e);
    this.levelData_.img = ""; // TODO: put generic URL.
  }
  return JSON.stringify(this.levelData_);
}

World.prototype.addActor = function(defName, x, y) {
  var a = this.newEntity(defName);
  a.init({
    position: {x: x, y: y},
  });
  this.actors.push(a);
};

World.prototype.removeActor = function(actor) {
  for (var ii = 0; ii < this.actors.length; ++ii) {
    if (this.actors[ii] === actor) {
      this.actors.splice(ii, 1);
      break;
    }
  }
};

World.prototype.deleteActorsInCell = function(x, y) {
  var actors = this.actorsInCell(x, y);
  for (var ii = 0; ii < actors.length; ++ii) {
    this.removeActor(actors[ii]);
  }
};

// Deletes the actors from the level definition.
World.prototype.deleteActorsInLevelData = function(x, y) {
  var ii = 0;
  while (ii < this.levelData_.actors.length) {
    var actor = this.levelData_.actors[ii];
    if (actor.position.x == x && actor.position.y == y) {
      this.levelData_.actors.splice(ii, 1);
    } else {
      ++ii;
    }
  }
};

// Adds an actor to the level definition
World.prototype.addActorToLevelData = function(defName, x, y) {
  this.levelData_.actors.push({
    actor_def: defName,
    position: { x: x, y: y }
  });
};


World.prototype.defAt = function(x, y) {
  return this.getDef(this.cellAt(x, y).id);
};

// Convenience function for whether or not a given cell is not passable.
World.prototype.isBlocking = function(x, y, testActor) {
  var cell = this.cellAt(x, y);
  var actors = this.actorsInCell(x,y);
  var result = cell.passable;

  for (var i = 0; result && ( i < actors.length); ++i) {
    result = result && actors[i].canPass(testActor);
  }

  return !result;
};

// Convenience function for whether or not a given cell has something the
// player wants to run towards.
World.prototype.isDesirable = function(x, y) {
  var actors = this.actorsInCell(x, y);
  for (var j = 0; j < actors.length; ++j) {
    var actor = actors[j];
    if (actor.loot)
      return true;
  }
  return false;
}

World.prototype.actorsInCell = function(x, y) {
  var result = [];
  x = Math.floor(x);
  y = Math.floor(y);
  for (var j = 0; j < this.actors.length; ++j) {
    var actor = this.actors[j];
    if (Math.floor(actor.position.x) != x ||
        Math.floor(actor.position.y) != y) {
      continue;
    }
    result.push(actor);
  }
  return result;
}

World.prototype.lineOfSight = function(x,y,heading) {
  
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
 * Sets a hero
 */
World.prototype.setHero = function(actor) {
  this.hero = actor;
}

/**
 * Find an actor
 */
World.prototype.findActorIndex = function(x,y,a_radius) {
  var a_position = new Vec2(x,y);
  for (var j = 0; j < this.actors.length; ++j) {
    var b = this.actors[j];
    var minContact = a_radius + b.radius;
    if (a_position.sub(b.position).len() < minContact) {
      return j;
    }
  }
  return undefined;
};

/**
 * Gets the possible LEVEL EDITING typs of actions within the editor
 */
World.prototype.getEditorActions = function() {
  var that = this;
  var actions = [];

  // Delete actor actions
  actions.push({
    type: "click",
    uiName: "Delete actor",
    sprite: this.newEntity("spriteCancel"),
    apply: function(x,y) {
      that.deleteActorsInCell(x, y);
      that.deleteActorsInLevelData(x, y);
    }
  });

  // Cell setting...
  for(var defName in this._entity_defs) {
    (function() {
      var def = that._entity_defs[defName];
      var name = defName;
      if(def.type == "Cell"){
        actions.push({
          type: "paint",
          uiName: (def.uiName) ? def.uiName : ("Add uiName to: " + defName),
          sprite: that.newEntity(def.sprite),
          apply: function(x,y) {
            that.setCellAt(name, x, y);
            that.setLevelCellAt(name, x, y);
          }
        });
      }
    })();
  }

  // Add actor actions
  for(var _defName in this._entity_defs) {
    (function() {
      var defName = _defName;
      var def = that._entity_defs[defName];
      if(defName.match(/^actor/)) {
        actions.push({
          type: "click",
          uiName: (def.uiName) ? def.uiName : ("Add uiName to: " + defName),
          sprite: that.newEntity(def.sprite),
          apply: function(x,y) {
            that.deleteActorsInCell(x, y);
            that.deleteActorsInLevelData(x, y);
            that.addActor(defName, x, y);
            that.addActorToLevelData(defName, x, y);
          }
        });
      }
    })();
  }
  return actions;
}

/**
 * Gets the possible PLAYTIME typs of actions within the editor
 */
World.prototype.getPlaytimeEditorActions = function() {
  var world = this;
  var actions = [];

  // Add actor actions
  for(var i = 0; i < this.levelData_.placeables.length; ++i) {
    (function() {
      var defName = world.levelData_.placeables[i];
      var def = world._entity_defs[defName];
      actions.push({
        type: "click",
        uiName: (def.uiName) ? def.uiName : ("Add uiName to: " + defName),
        sprite: world.newEntity(def.sprite),
        apply: function(x,y) {
          // Check that we can place the item
          if (world.actorsInCell(x,y).length)
            return;
          var cell = world.cellAt(x, y);
          if (!cell.passable)
            return;

          // Place it
          world.deleteActorsInCell(x, y);
          world.addActor(defName, x, y);
          // If we are placing the item, remove it from inventory
          // Disable this action
          this.disabled = true;
        }
      });
    })();
  }
  return actions;
}


World.prototype.clearMessage = function() {
  if (this.message_node_) {
    document.body.removeChild(this.message_node_);
    delete this.message_node_;
  }
}

World.prototype.showMessage = function(text, className) {
  this.clearMessage();

  var msg_node = document.createElement('div');
  this.message_node_ = msg_node;
  this.message_node_.className = "message " + className;
  this.message_node_.appendChild(document.createTextNode(text));
  document.body.appendChild(this.message_node_);
  setTimeout(function() {msg_node.className = className + ' message done';}, 1);
}
