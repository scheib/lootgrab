//////////////////////////////////////////////////
function SmartSprite(world, tile_def) {
  this.world  = world;
  world.renderEnts.push(this)

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
      that.img = undefined;
    };
    g_imageDB[tileset_def.image] = img;
  }
  this.img = img;
}

SmartSprite.prototype.update = function(ts) {
  this.ts = ts;
  return;
}

SmartSprite.prototype.draw = function(ctx, x,y,w,h) {
  var that = this;
  if(this.img === undefined) {
    ctx.fillStyle = "rgb(255,0,255)";
    ctx.fillRect(x,y,w,h);
    ctx.fillString("Error", x+3,y+3);
    return;
  }

  // deterine the world cell from the coordinate [eew huge hack!]
  var cellX = x / this.world.tileVisualWidth();
  var cellY = y / this.world.tileVisualHeight();
  function isSame(oX,oY) {
    if(oX < 0 || oX >= that.world.width ||
       oY < 0 || oY >= that.world.height)
      return true;
    else {
      var oSprite = that.world.cellAt(oX,oY).ground_ent;
      if(oSprite === undefined) throw "Couldn't find sprite";
      return oSprite.entDefID == that.entDefID;
    }
  }
  var state = [isSame(cellX,cellY-1),
               isSame(cellX+1,cellY),  
               isSame(cellX,cellY+1),
               isSame(cellX-1,cellY)];
  var cases = [
    { state: [ false, false, false, false ], tile: 0, rot: 0 },

    { state: [ true,  false, false, false ], tile: 1, rot: 0 },
    { state: [ false, true,  false, false ], tile: 1, rot: 90 },
    { state: [ false, false, true,  false ], tile: 1, rot: 180 },
    { state: [ false, false, false, true ],  tile: 1, rot: 270 },

    { state: [ true, true, false, false ],  tile: 2, rot: 0 },
    { state: [ false, true, true, false ],  tile: 2, rot: 90 },
    { state: [ false, false, true, true ],  tile: 2, rot: 180 },
    { state: [ true, false, false, true ],  tile: 2, rot: 270 },
    
    { state: [ true, true, true, false ],   tile: 3, rot: 0 },
    { state: [ false, true, true, true ],   tile: 3, rot: 90 },
    { state: [ true, false, true, true ],   tile: 3, rot: 180 },
    { state: [ true, true, false, true ],   tile: 3, rot: 270 },

    { state: [ true, true, true, true ],    tile: 4, rot: 0, corners: true },

    { state: [ true, false, true, false ],    tile: 5, rot: 90 },
    { state: [ false, true, false, true ],    tile: 5, rot: 0 },
  ];

  // find the correct case
  var curCase = undefined;
  for(var i = 0; i< cases.length; ++i) {
    var m = true;
    for(var j=  0; j < 4; ++j) {
      m &= cases[i].state[j] == state[j];
    }
    if(m) {
      curCase = cases[i];
    }
  }
  if(curCase === undefined)
    throw "Case not found in rules: " + state;
  
  // find the correct corner variant
  if(curCase.corners) {
/*    var cstate = [isSame(cellX,cellY-1),
                  isSame(cellX+1,cellY),  
                  isSame(cellX,cellY+1),
                  isSame(cellX-1,cellY)];
  */  
  }

  // we're rendering tile 
  var tileWidth = this.tileset_def.tile_width;
  var tileHeight = this.tileset_def.tile_height;
  var htw = w * 0.5;
  var hth = h * 0.5;
  var curTile = this.tile_def.cases[curCase.tile];
  if(curTile === undefined) {
    throw "Tile case " + curCase.tile + " not found in SmartSpriteDef.";
  }
  var tx = tileWidth *  curTile.x;
  var ty = tileHeight * curTile.y;
  try {
    var rotRad = (curCase.rot/ 180.0) * Math.PI;
    ctx.translate(x+htw,y+hth);
    ctx.rotate(rotRad);// + (this.ts % 1));
    ctx.fillStyle = "rgb(190,127,127)";
    ctx.fillRect(-htw,-hth,w,h);
    ctx.drawImage(this.img,
                  tx, ty,
                  tileWidth,
                  tileHeight,
                  -htw,-hth,w,h);
    ctx.setTransform(1,0,0,1,0,0);
    if(DEBUG) {
      ctx.textBaseline = "top";
      ctx.textAlign = "left";
      ctx.fillStyle = "rgb(255,255,255,1)";
      t = ""
      for(var i = 0; i< 4;++i)
        t += state[i]?"T":"0";
      ctx.fillText(t,x+4,y);
      ctx.fillText("r=" + curCase.rot,x+4,y+12);
    }
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
