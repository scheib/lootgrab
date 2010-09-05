tdl.provide("tiles");

var getEntityDefs = function() {
  return {
    "HeroActor" : {
      type : "Hero",
      sprite : "spriteHero",
    },
    
    // Level pieces
    "dirtCell" : {
        type: "Cell",
        sprite: "spriteFloorA",
    },
    "rugCell" : {
        type : "Cell",
        sprite: "spriteFloorRug",
    },
    "wallCell" : {
        type : "Cell",
        sprite: "spriteWallH",
        passable : false
    },
    
    // Actors
    //  (just debuging as Cell for now?)
    "HeroCell"            : { type : "Cell", sprite: "spriteHero"           },
    "SkeletonCell"        : { type : "Cell", sprite: "spriteSkeleton"       },
    "SkeletonWarriorCell" : { type : "Cell", sprite: "spriteSkeletonWarrior"},
    "BatCell"             : { type : "Cell", sprite: "spriteBat"            },
    "FlamingSkullCell"    : { type : "Cell", sprite: "spriteFlamingSkull"   },
    "MummyCell"           : { type : "Cell", sprite: "spriteMummy"          },
    "MummyKingCell"       : { type : "Cell", sprite: "spriteMummyKing"      },
    "DeathCell"           : { type : "Cell", sprite: "spriteDeath"          },    
    
    // Sprite Definitions --------------------------------
    
    "tileset_env" : {
      type : "tileset",
      image: "images/lofi_environment_a_4x.png",
      tile_width: 32,
      tile_height: 32,
    },
    "spriteWallH"           : { type : "Sprite", tileset : "tileset_env", start_x:  0, start_y: 0, frames: 1 },
    "spriteWallHTorch"      : { type : "Sprite", tileset : "tileset_env", start_x:  1, start_y: 0, frames: 2 },
    "spriteWallHCrumbled"   : { type : "Sprite", tileset : "tileset_env", start_x:  3, start_y: 0, frames: 1 },
    "spriteWallH"           : { type : "Sprite", tileset : "tileset_env", start_x:  4, start_y: 0, frames: 1 },
    "spriteFloorA"          : { type : "Sprite", tileset : "tileset_env", start_x:  5, start_y: 0, frames: 1 },
    "spriteFloorB"          : { type : "Sprite", tileset : "tileset_env", start_x:  6, start_y: 0, frames: 1 },
    "spriteStairsUp"        : { type : "Sprite", tileset : "tileset_env", start_x:  7, start_y: 0, frames: 1 },
    "spriteStairsDown"      : { type : "Sprite", tileset : "tileset_env", start_x:  8, start_y: 0, frames: 1 },
    "spriteHole"            : { type : "Sprite", tileset : "tileset_env", start_x:  9, start_y: 0, frames: 1 },
    "spriteTrapdoorClosed"  : { type : "Sprite", tileset : "tileset_env", start_x: 10, start_y: 0, frames: 1 },
    "spriteTrapdoorOpen"    : { type : "Sprite", tileset : "tileset_env", start_x: 11, start_y: 0, frames: 1 },
    "spriteFloorC"          : { type : "Sprite", tileset : "tileset_env", start_x: 12, start_y: 0, frames: 1 },
    "spriteFloorRug"        : { type : "Sprite", tileset : "tileset_env", start_x: 13, start_y: 0, frames: 1 },


    "tileset_char" : {
      type : "tileset",
      image: "images/lofi_char_a_4x.png",
      tile_width: 32,
      tile_height: 32,
    },
    "spriteHero"            : { type : "Sprite", tileset : "tileset_char", start_x: 12, start_y: 30, frames: 4 },
    "spriteHero"            : { type : "Sprite", tileset : "tileset_char", start_x: 12, start_y: 30, frames: 4 },
    "spriteSkeleton"        : { type : "Sprite", tileset : "tileset_char", start_x:  0, start_y:  6, frames: 1 },
    "spriteSkeletonWarrior" : { type : "Sprite", tileset : "tileset_char", start_x:  1, start_y:  6, frames: 1 },
    "spriteBat"             : { type : "Sprite", tileset : "tileset_char", start_x: 15, start_y: 12, frames: 1 },
    "spriteFlamingSkull"    : { type : "Sprite", tileset : "tileset_char", start_x:  5, start_y:  6, frames: 1 },
    "spriteMummy"           : { type : "Sprite", tileset : "tileset_char", start_x: 10, start_y:  6, frames: 1 },
    "spriteMummyKing"       : { type : "Sprite", tileset : "tileset_char", start_x: 11, start_y:  6, frames: 1 },
    "spriteDeath"           : { type : "Sprite", tileset : "tileset_char", start_x: 13, start_y:  6, frames: 1 },

  }
}
