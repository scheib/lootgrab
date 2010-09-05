tdl.provide("tiles");

var getEntityDefs = function() {
  return {
    "HeroActor" : {
      type : "Hero",
      sprite : "spriteHero",
    },
    "SkeletonActor" : {
      type : "Skeleton",
      sprite : "spriteSkeletonWarrior",
    },
    
    // Level pieces
    "cellFloorA"          : { type: "Cell", sprite: "spriteFloorA"         , passable : true },
    "cellFloorB"          : { type: "Cell", sprite: "spriteFloorB"         , passable : true },
    "cellFloorC"          : { type: "Cell", sprite: "spriteFloorC"         , passable : true },
    "cellFloorRug"        : { type: "Cell", sprite: "spriteFloorRug"       , passable : true },
    "cellHole"            : { type: "Cell", sprite: "spriteHole"           , passable : true },
    "cellStairsDown"      : { type: "Cell", sprite: "spriteStairsDown"     , passable : true },
    "cellStairsUp"        : { type: "Cell", sprite: "spriteStairsUp"       , passable : true },
    "cellTrapdoorClosed"  : { type: "Cell", sprite: "spriteTrapdoorClosed" , passable : true },
    "cellTrapdoorOpen"    : { type: "Cell", sprite: "spriteTrapdoorOpen"   , passable : true },
    "cellWallH"           : { type: "Cell", sprite: "spriteWallH"          , passable : false },
    "cellWallHCrumbled"   : { type: "Cell", sprite: "spriteWallHCrumbled"  , passable : false },
    "cellWallHTorch"      : { type: "Cell", sprite: "spriteWallHTorch"     , passable : false },
    "cellWallV"           : { type: "Cell", sprite: "spriteWallV"          , passable : false },
   
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
    "KeyCell"             : { type : "Cell", sprite: "spriteKey"            },
    "ShieldCell"          : { type : "Cell", sprite: "spriteShield"         },
    "FireCell"            : { type : "Cell", sprite: "spriteFire"           },
    "WandCell"            : { type : "Cell", sprite: "spriteWand"           },
    "CrossCell"           : { type : "Cell", sprite: "spriteCross"          },
    "SwordCell"           : { type : "Cell", sprite: "spriteSword"          },
    "MeatCell"            : { type : "Cell", sprite: "spriteMeat"           },
    "GoldCell"            : { type : "Cell", sprite: "spriteGold"           },
   
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
    "spriteWallV"           : { type : "Sprite", tileset : "tileset_env", start_x:  4, start_y: 0, frames: 1 },
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
    "spriteSkeleton"        : { type : "Sprite", tileset : "tileset_char", start_x:  0, start_y:  6, frames: 1 },
    "spriteSkeletonWarrior" : { type : "Sprite", tileset : "tileset_char", start_x:  1, start_y:  6, frames: 1 },
    "spriteBat"             : { type : "Sprite", tileset : "tileset_char", start_x: 15, start_y: 12, frames: 1 },
    "spriteFlamingSkull"    : { type : "Sprite", tileset : "tileset_char", start_x:  5, start_y:  6, frames: 1 },
    "spriteMummy"           : { type : "Sprite", tileset : "tileset_char", start_x: 10, start_y:  6, frames: 1 },
    "spriteMummyKing"       : { type : "Sprite", tileset : "tileset_char", start_x: 11, start_y:  6, frames: 1 },
    "spriteDeath"           : { type : "Sprite", tileset : "tileset_char", start_x: 13, start_y:  6, frames: 1 },


    "tileset_obj" : {
      type : "tileset",
      image: "images/lofi_obj_a_4x.png",
      tile_width: 32,
      tile_height: 32,
    },
    "spriteKey" : { type : "Sprite", tileset : "tileset_obj", start_x: 2, start_y: 2, frames: 1 },
    "spriteShield" : { type : "Sprite", tileset : "tileset_obj", start_x: 4, start_y: 3, frames: 1 },
    "spriteFire" : { type : "Sprite", tileset : "tileset_obj", start_x: 9, start_y: 6, frames: 2 },
    "spriteWand" : { type : "Sprite", tileset : "tileset_obj", start_x: 14, start_y: 3, frames: 1 },
    "spriteCross" : { type : "Sprite", tileset : "tileset_obj", start_x: 4, start_y: 1, frames: 1 },
    "spriteSword" : { type : "Sprite", tileset : "tileset_obj", start_x: 6, start_y: 3, frames: 1 },
    "spriteMeat" : { type : "Sprite", tileset : "tileset_obj", start_x: 13, start_y: 1, frames: 1 },
    "spriteGold" : { type : "Sprite", tileset : "tileset_obj", start_x: 0, start_y: 0, frames: 1 },
  };
}
