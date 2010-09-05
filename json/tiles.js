tdl.provide("tiles");

var getEntityDefs = function() {
  return {
    "Hero" : {
      type : "Hero",
      render_tile : "HeroTile",
      position : { x : 2, y : 2}
    },
    
    "dirtCell" : {
        type: "Cell",
        render_tile: "FloorA",
    },
    "rugCell" : {
        type : "Cell",
        render_tile: "FloorRug",
    },
    "wallCell" : {
        type : "Cell",
        render_tile: "WallH",
        passable : false
    },
    "tileset_env" : {
      type : "tileset",
      image: "images/lofi_environment_a_4x.png",
      tile_width: 32,
      tile_height: 32,
    },
    "WallH"           : { type : "TileEntity", tileset : "tileset_env", start_x:  0, start_y: 0, frames: 1 },
    "WallHTorch"      : { type : "TileEntity", tileset : "tileset_env", start_x:  1, start_y: 0, frames: 2 },
    "WallHCrumbled"   : { type : "TileEntity", tileset : "tileset_env", start_x:  3, start_y: 0, frames: 1 },
    "WallH"           : { type : "TileEntity", tileset : "tileset_env", start_x:  4, start_y: 0, frames: 1 },
    "FloorA"          : { type : "TileEntity", tileset : "tileset_env", start_x:  5, start_y: 0, frames: 1 },
    "FloorB"          : { type : "TileEntity", tileset : "tileset_env", start_x:  6, start_y: 0, frames: 1 },
    "StairsUp"        : { type : "TileEntity", tileset : "tileset_env", start_x:  7, start_y: 0, frames: 1 },
    "StairsDown"      : { type : "TileEntity", tileset : "tileset_env", start_x:  8, start_y: 0, frames: 1 },
    "Hole"            : { type : "TileEntity", tileset : "tileset_env", start_x:  9, start_y: 0, frames: 1 },
    "TrapdoorClosed"  : { type : "TileEntity", tileset : "tileset_env", start_x: 10, start_y: 0, frames: 1 },
    "TrapdoorOpen"    : { type : "TileEntity", tileset : "tileset_env", start_x: 11, start_y: 0, frames: 1 },
    "FloorC"          : { type : "TileEntity", tileset : "tileset_env", start_x: 12, start_y: 0, frames: 1 },
    "FloorRug"        : { type : "TileEntity", tileset : "tileset_env", start_x: 13, start_y: 0, frames: 1 },

    "tileset_char" : {
      type : "tileset",
      image: "images/lofi_char_a_4x.png",
      tile_width: 32,
      tile_height: 32,
    },
    "HeroTile"        : { type : "TileEntity", tileset : "tileset_char", start_x: 12, start_y: 30, frames: 4 },
    "Skeleton"        : { type : "TileEntity", tileset : "tileset_char", start_x:  0, start_y:  6, frames: 1 },
    "SkeletonWarrior" : { type : "TileEntity", tileset : "tileset_char", start_x:  1, start_y:  6, frames: 1 },
    "Bat"             : { type : "TileEntity", tileset : "tileset_char", start_x: 15, start_y: 12, frames: 1 },
    "FlamingSkull"    : { type : "TileEntity", tileset : "tileset_char", start_x:  5, start_y:  6, frames: 1 },
    "Mummy"           : { type : "TileEntity", tileset : "tileset_char", start_x: 10, start_y:  6, frames: 1 },
    "MummyKing"       : { type : "TileEntity", tileset : "tileset_char", start_x: 11, start_y:  6, frames: 1 },
    "Death"           : { type : "TileEntity", tileset : "tileset_char", start_x: 13, start_y:  6, frames: 1 },
  }
}
